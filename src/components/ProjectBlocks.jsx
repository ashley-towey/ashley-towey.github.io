import { Fragment, useState } from 'react';
import Clip, { clipRatio } from './Clip';
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
  const stills = block.images.filter((image) => image.src);
  const Frame = block.lightbox ? 'button' : 'div';

  const figures = block.images.map((image, i) => (
        <figure className={image.wide ? 'gallery-image gallery-image--wide' : 'gallery-image'} key={image.src ?? image.clip}>
          <Frame
            className={`gallery-image__frame${block.lightbox ? ' gallery-image__frame--zoom' : ''}`}
            style={image.wide || block.masonry ? { '--ratio': image.clip ? clipRatio(image.clip) : imageRatio(image.src) } : undefined}
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

  // With a heading or body, the text sits beside the images, like the intro.
  if (block.heading || block.body || block.credits) {
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
        </div>
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
