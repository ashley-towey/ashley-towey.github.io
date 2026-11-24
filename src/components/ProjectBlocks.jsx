import { Fragment, useCallback, useState } from 'react';
import { BracketBox } from './ButtonLink';
import Clip, { clipRatio } from './Clip';
import ExperimentModal from './ExperimentModal';
import Lightbox from './Lightbox';
import Picture, { imageRatio } from './Picture';
import RegistrationLine from './RegistrationLine';
import { projectHero } from '../data/projects';

// Renders a project's content blocks (see the schema in data/projects.js).
// Each block sits under its own registration line. The page's previous / next
// line closes the frame, so no block draws a bottom rule of its own.
// The hero image is shown in the intro, so it's dropped from the blocks.
export default function ProjectBlocks({ project }) {
  const hero = projectHero(project).src;
  const blocks = project.blocks
    .map((block) => (block.type === 'images' ? { ...block, images: block.images.filter((image) => image.src !== hero) } : block))
    .filter((block) => block.type !== 'images' || block.images.length > 0);

  return blocks.map((block, index) => {
    const Block = BLOCKS[block.type];
    return (
      <Fragment key={`${block.type}-${index}`}>
        <RegistrationLine>{block.label ?? block.heading}</RegistrationLine>
        <Block block={block} project={project} frame="frame-sides" eager={index === 0} />
      </Fragment>
    );
  });
}

function ImagesBlock({ block, project, frame, eager }) {
  const columns = block.columns ?? 2;
  const sizes = `(max-width: 500px) ${block.square ? 46 : 92}vw, ${Math.round(92 / Math.min(columns, 2))}vw`;
  const largeSizes = columns > 2 ? `(max-width: 500px) 46vw, (max-width: 780px) 46vw, ${Math.round(92 / columns)}vw` : sizes;
  // With `lightbox`, clicking a still image opens it full screen.
  const [open, setOpen] = useState(null);
  // With `tryIt`, a button under the text opens a live sketch in the
  // experiments page's pop-up.
  const [trying, setTrying] = useState(false);
  const closeTry = useCallback(() => setTrying(false), []);
  const stills = block.images.filter((image) => image.src);
  const Frame = block.lightbox ? 'button' : 'div';

  const figures = block.images.map((image, i) => (
        <figure className={image.wide ? 'gallery-image gallery-image--wide' : 'gallery-image'} key={image.src ?? image.clip}>
          <Frame
            className={`gallery-image__frame${block.lightbox ? ' gallery-image__frame--zoom' : ''}`}
            style={image.wide || block.masonry || block.rows ? { '--ratio': image.clip ? clipRatio(image.clip) : imageRatio(image.src) } : undefined}
            {...(block.lightbox && { type: 'button', 'aria-label': `View full screen: ${image.alt}`, onClick: () => setOpen(stills.indexOf(image)) })}
          >
            {image.clip ? (
              <Clip src={image.clip} alt={image.alt} />
            ) : (
              <Picture
                src={image.src}
                alt={image.alt}
                loading={eager && i < 2 ? 'eager' : 'lazy'}
                sizes={image.wide ? '92vw' : largeSizes}
              />
            )}
          </Frame>
          {image.caption && <figcaption className="caption-2">{image.caption}</figcaption>}
        </figure>
  ));
  const lightbox = open !== null && <Lightbox images={stills} index={open} onChange={setOpen} onClose={() => setOpen(null)} />;

  // With `rows`, images are laid out in rows. Each row is a list of image
  // indexes; a nested list stacks those images in one column. Widths follow
  // each image's shape, so everything in a row comes out the same height.
  if (block.rows) {
    const ratioOf = (image) => (image.clip ? clipRatio(image.clip) : imageRatio(image.src));
    return (
      <section className={`project-gallery project-gallery--rows ${frame}`} aria-label={`${project.title}: ${block.label}`}>
        {block.rows.map((row, r) => (
          <div className="project-gallery__row" key={r}>
            {row.map((cell, _, cells) => {
              const stack = [].concat(cell);
              const ratio = 1 / stack.reduce((sum, i) => sum + 1 / ratioOf(block.images[i]), 0);
              // A stack's gaps add to its height, so the other cells get a head
              // start in width that keeps every cell in the row the same height.
              const gaps = Math.max(...cells.map((c) => [].concat(c).length)) - stack.length;
              return (
                <div
                  className="project-gallery__cell"
                  style={{ '--grow': ratio, '--basis': `calc(var(--gap) * ${ratio * gaps})` }}
                  key={stack.join('-')}
                >
                  {stack.map((i) => figures[i])}
                </div>
              );
            })}
          </div>
        ))}
        {lightbox}
      </section>
    );
  }

  // With a heading or body, the text sits beside the images, like the intro.
  if (block.heading || block.body || block.credits || block.tryIt) {
    return (
      <section className={`project-gallery project-gallery--with-text ${frame}`} aria-label={`${project.title}: ${block.label}`}>
        <div className="project-gallery__text">
          {block.heading && <h2 className="project-text__heading">{block.heading}</h2>}
          {block.body && (
            <div className="type-body">
              {block.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
          {block.credits && (
            <p className="project-credits type-body"><span className="eyebrow caption-2">In collaboration with</span>{block.credits}</p>
          )}
          {block.tryIt && (
            <div>
              <button type="button" className="bracket-button caption-2" onClick={() => setTrying(true)}>
                {block.tryIt.label ?? 'Try it'}<BracketBox />
              </button>
            </div>
          )}
        </div>
        {trying && <ExperimentModal title={block.tryIt.title ?? block.heading} src={block.tryIt.src} onClose={closeTry} />}
        <div className="project-gallery__images" style={{ '--columns': block.columns ?? 1 }}>{figures}</div>
        {lightbox}
      </section>
    );
  }

  return (
    <section
      className={`project-gallery ${frame}${block.square ? ' project-gallery--square' : ''}${block.masonry ? ' project-gallery--masonry' : ''}`}
      style={{ '--columns': columns }}
      aria-label={`${project.title}: ${block.label}`}
    >
      {figures}
      {lightbox}
    </section>
  );
}

// A large image on the left; on the right, a smaller image above a stat
// (a big dot-matrix number with a line of text under it).
function FeatureBlock({ block, project, frame }) {
  const { main, side, stat } = block;
  return (
    <section className={`project-feature ${frame}`} aria-label={`${project.title}: ${block.label}`}>
      <figure className="gallery-image project-feature__main">
        <div className="gallery-image__frame" style={{ aspectRatio: imageRatio(main.src) }}>
          <Picture src={main.src} alt={main.alt} loading="lazy" sizes="(max-width: 780px) 92vw, 60vw" />
        </div>
      </figure>
      <div className="project-feature__side">
        {side && (
          <figure className="gallery-image">
            <div className="gallery-image__frame" style={{ aspectRatio: imageRatio(side.src) }}>
              <Picture src={side.src} alt={side.alt} loading="lazy" sizes="(max-width: 780px) 92vw, 34vw" />
            </div>
          </figure>
        )}
        {stat && (
          <p className="project-stat">
            <span className="type-h1 type-numerical">{stat.value}</span>
            <span className="project-stat__text type-body">{stat.text}</span>
          </p>
        )}
      </div>
    </section>
  );
}

function TextBlock({ block, frame }) {
  return (
    <section className={`project-text ${frame}`}>
      <h2 className="project-text__heading">{block.heading}</h2>
      <div className="project-text__body type-body">
        {block.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {block.list && <ul>{block.list.map((item) => <li key={item}>{item}</li>)}</ul>}
      </div>
    </section>
  );
}

function QuoteBlock({ block, frame }) {
  return (
    <section className={`project-text ${frame}`}>
      <figure className="project-quote">
        <blockquote>{block.quote.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
        <figcaption className="eyebrow caption-2">{block.cite}</figcaption>
      </figure>
    </section>
  );
}

function VideoBlock({ block, frame }) {
  return (
    <section className={`project-gallery ${frame}`} style={{ '--columns': block.columns ?? Math.min(block.videos.length, 2) }}>
      {block.videos.map((video) => (
        <figure className={block.videos.length === 1 ? 'gallery-image gallery-image--wide' : 'gallery-image'} key={video.vimeo}>
          <div className="gallery-image__frame gallery-image__frame--video" style={{ '--ratio': video.ratio }}>
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeo}?dnt=1&badge=0&byline=0&portrait=0&title=0`}
              title={video.title}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          {(block.videos.length > 1 || video.credits) && (
            <figcaption className="caption-2">
              {block.videos.length > 1 && video.title}
              {video.credits && (
                <span className="video-credits">
                  {video.credits.map((credit) => (
                    <span className="video-credits__line" key={credit.role}>
                      <span className="video-credits__role caption-2">{credit.role}:</span>{' '}
                      <span className="video-credits__names caption-1">{credit.names}</span>
                    </span>
                  ))}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </section>
  );
}

const BLOCKS = { images: ImagesBlock, text: TextBlock, quote: QuoteBlock, video: VideoBlock, feature: FeatureBlock };
