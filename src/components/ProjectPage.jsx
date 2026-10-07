import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import projects from "../constants/projects";

Modal.setAppElement("#root");

const categoryLabels = { web: "Web", "ai-tools": "AI & Tools", games: "Games" };
const buttonStyle = "inline-block rounded-lg border border-accent px-5 py-3 text-white font-medium hover:bg-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find(item => item.id === projectId);
  const [imageIndex, setImageIndex] = useState(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const images = project ? Object.keys(project)
    .filter(key => /^image\d*$/.test(key) && project[key])
    .sort((first, second) => Number(first.slice(5)) - Number(second.slice(5)))
    .map(key => project[key]) : [];
  const imageCount = images.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    setImageIndex(null);
    setVideoVisible(false);
  }, [projectId]);

  useEffect(() => {
    if (imageIndex === null || imageCount === 0) return;
    const navigateGallery = event => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setImageIndex(index => (index + 1) % imageCount);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setImageIndex(index => (index + imageCount - 1) % imageCount);
      }
    };
    document.addEventListener("keydown", navigateGallery);
    return () => document.removeEventListener("keydown", navigateGallery);
  }, [imageIndex, imageCount]);

  if (!project) return (
    <section className="max-w-[1200px] mx-auto px-6 pt-28 pb-16">
      <h1 className="text-white text-4xl font-bold mb-6">Project not found.</h1>
      <Link className={buttonStyle} to="/#projects">Return to projects</Link>
    </section>
  );

  return (
    <article className="project-detail-page max-w-[1200px] mx-auto px-6 pt-28 pb-16 text-secondary">
      <Link to="/#projects" className="inline-block mb-6 underline underline-offset-4 hover:text-accent">← All projects</Link>
      <p className="text-accent uppercase tracking-wider text-sm mb-3">{categoryLabels[project.category]} · {project.status}</p>
      <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-5">{project.name}</h1>
      <p className="max-w-[800px] text-lg leading-8">{project.summary}</p>
      <ul className="flex flex-wrap gap-2 mt-6" aria-label="Technologies">
        {project.tags.map(tag => <li key={tag.name} className="bg-tertiary text-white-100 text-sm rounded-md px-3 py-2">{tag.name}</li>)}
      </ul>
      <div className="flex flex-wrap gap-4 mt-6">
        {project.live_url && <a className={`${buttonStyle} bg-accent hover:bg-accent/90`} href={project.live_url} target="_blank" rel="noopener noreferrer">Visit website<span className="sr-only"> (opens in a new tab)</span></a>}
        {project.source_code_link && project.source_code_link !== "None" && <a className={buttonStyle} href={project.source_code_link} target="_blank" rel="noopener noreferrer">View source<span className="sr-only"> (opens in a new tab)</span></a>}
      </div>
      <section className="my-10">
        <h2 className="text-white text-2xl font-semibold mb-4">My contribution</h2>
        <ul className="list-disc pl-6 space-y-3 leading-8">{project.contributions.map(point => <li key={point}>{point}</li>)}</ul>
      </section>
      <section className="my-10">
        <h2 className="text-white text-2xl font-semibold mb-4">Technical approach</h2>
        <ul className="list-disc pl-6 space-y-3 leading-8">{project.decisions.map(point => <li key={point}>{point}</li>)}</ul>
      </section>
      <section className="my-10">
        <h2 className="text-white text-2xl font-semibold mb-4">Project status</h2>
        <p className="leading-8">{project.statusNote}</p>
      </section>
      {(project.video || project.demo_video) && (
        <section className="my-10">
          <h2 className="text-white text-2xl font-semibold mb-4">Demonstration</h2>
          {videoVisible ? project.demo_video ? (
            <video src={project.demo_video} poster={project.image} controls playsInline preload="metadata" aria-label={`${project.name} demo`} className="w-full aspect-video object-contain rounded-xl bg-black" />
          ) : (
            <iframe className="w-full aspect-video border-0 rounded-xl" src={project.video} title={project.video_title || `${project.name} demonstration`} allow="encrypted-media; picture-in-picture" allowFullScreen />
          ) : <button className={buttonStyle} onClick={() => setVideoVisible(true)}>Load demonstration video</button>}
        </section>
      )}
      {imageCount > 0 && (
        <section className="my-10">
          <h2 className="text-white text-2xl font-semibold mb-4">Screenshots</h2>
          {project.media_note && <p className="leading-7 mb-5 text-sm">{project.media_note}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <button key={image} className="rounded-xl self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" onClick={() => setImageIndex(index)} aria-label={`Enlarge ${project.name} screenshot ${index + 1}`}>
                <img src={image} alt={`${project.name} screenshot ${index + 1}`} className="w-full h-auto rounded-xl" loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}
      <Modal isOpen={imageIndex !== null} onRequestClose={() => setImageIndex(null)} contentLabel={`${project.name} screenshot viewer`} className="max-w-[95vw] max-h-[95vh] overflow-auto text-center text-white outline-none" overlayClassName="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4">
        <div className="flex flex-wrap justify-center gap-3 p-4">
          <button className={buttonStyle} onClick={() => setImageIndex(null)}>Close</button>
          {imageCount > 1 && <>
            <button className={buttonStyle} onClick={() => setImageIndex(index => (index + imageCount - 1) % imageCount)}>Previous image</button>
            <button className={buttonStyle} onClick={() => setImageIndex(index => (index + 1) % imageCount)}>Next image</button>
          </>}
        </div>
        {imageIndex !== null && <img src={images[imageIndex]} alt={`${project.name} screenshot ${imageIndex + 1}`} className="max-h-[75vh] max-w-full object-contain mx-auto" />}
        <p aria-live="polite" className="mt-4">{imageIndex !== null ? `Image ${imageIndex + 1} of ${imageCount}` : ""}</p>
      </Modal>
    </article>
  );
}
