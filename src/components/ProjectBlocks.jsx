import { Fragment } from 'react';
import Picture, { imageRatio } from './Picture';
import RegistrationLine from './RegistrationLine';

// Renders a project's content blocks (see the schema in data/projects.js).
// Each block sits under its own registration line; the last one closes the
// frame with a bottom rule.
export default function ProjectBlocks({ project }) {
  return project.blocks.map((block, index) => {
    const Block = BLOCKS[block.type];
    const frame = index === project.blocks.length - 1 ? 'frame-box' : 'frame-sides';
    return (
      <Fragment key={`${block.type}-${index}`}>
        <RegistrationLine>{block.label ?? block.heading}</RegistrationLine>
        <Block block={block} project={project} frame={frame} eager={index === 0} />
      </Fragment>
    );
  });
}

function ImagesBlock({ block, project, frame, eager }) {
  const columns = block.columns ?? 2;
  const sizes = `(max-width: 500px) ${block.square ? 46 : 92}vw, ${Math.round(92 / Math.min(columns, 2))}vw`;
  const largeSizes = columns > 2 ? `(max-width: 500px) 46vw, (max-width: 780px) 46vw, ${Math.round(92 / columns)}vw` : sizes;

  return (
    <section
      className={`project-gallery ${frame}${block.square ? ' project-gallery--square' : ''}`}
      style={{ '--columns': columns }}
      aria-label={`${project.title}: ${block.label}`}
    >
      {block.images.map((image, i) => (
        <figure className={image.wide ? 'gallery-image gallery-image--wide' : 'gallery-image'} key={image.src}>
          <div className="gallery-image__frame" style={image.wide ? { '--ratio': imageRatio(image.src) } : undefined}>
            <Picture
              src={image.src}
              alt={image.alt}
              loading={eager && i < 2 ? 'eager' : 'lazy'}
              sizes={image.wide ? '92vw' : largeSizes}
            />
          </div>
          {image.caption && <figcaption className="caption-2">{image.caption}</figcaption>}
        </figure>
      ))}
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
          {block.videos.length > 1 && <figcaption className="caption-2">{video.title}</figcaption>}
        </figure>
      ))}
    </section>
  );
}

const BLOCKS = { images: ImagesBlock, text: TextBlock, quote: QuoteBlock, video: VideoBlock };
