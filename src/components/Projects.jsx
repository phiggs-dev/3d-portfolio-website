import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Modal from "react-modal";

import { styles } from "../styles";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

Modal.setAppElement("#root");

const ProjectCard = ({ project, index }) => {
  // Modal state for gallery images (must be at the top, before any return)
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Debug: log the project data
  if (!project || !project.id || !project.name) {
    return (
      <div className="w-full min-h-[200px] bg-red-100 text-red-700 flex items-center justify-center rounded-2xl mb-5">
        <span>Invalid project data: {JSON.stringify(project)}</span>
      </div>
    );
  }
  const hasVideo = !!(project.video || project.demo_video);
  // Dynamically collect image1, image2, ... into a gallery array
  const galleryImages = Object.keys(project)
    .filter((key) => /^image\d+$/.test(key) && project[key])
    .sort((a, b) => {
      // Sort numerically by the number after 'image'
      const numA = parseInt(a.replace("image", ""), 10);
      const numB = parseInt(b.replace("image", ""), 10);
      return numA - numB;
    })
    .map((key) => project[key])
    .slice(0, 6);

  // Determine if there are gallery images
  const hasGalleryImages = galleryImages && galleryImages.length > 0;

  // If there are no images, show video left and description right
  if (!hasGalleryImages) {
    return (
      <motion.div
        variants={fadeIn("up", "spring", index * 0.2, 0.75)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col md:flex-row bg-tertiary rounded-2xl shadow-lg overflow-hidden hover:scale-[1.01] transition-transform p-4 min-h-[200px]"
      >
        {/* Left: Video (iframe embed like ProjectPage) */}
        <div className="flex items-center justify-center w-full p-2 bg-black md:w-1/2 aspect-video rounded-xl">
          {project.video && (
            <div
              className="relative w-full h-0"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                width="100%"
                height="100%"
                src={project.video}
                title={project.video_title || project.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              />
            </div>
          )}
        </div>
        {/* Right: Description */}
        <div className="flex flex-col items-start w-full gap-4 p-2 md:w-1/2">
          <h3 className="mb-2 text-2xl font-bold text-white">
            <Link
              to={`/projects/${project.id}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              {project.name}
            </Link>
          </h3>
          <div
            className="text-base text-secondary"
            dangerouslySetInnerHTML={{
              __html: project.description || "No description available.",
            }}
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags && project.tags.length > 0 ? (
              project.tags.map((tag) => (
                <span key={tag.name} className={`text-sm ${tag.color}`}>
                  #{tag.name}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">No tags</span>
            )}
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="inline-block px-4 py-2 mt-4 text-white transition-colors rounded-lg shadow bg-primary hover:bg-secondary"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </Link>
        </div>
      </motion.div>
    );
  }

  const openModal = (idx) => {
    setCurrentImageIndex(idx);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrentImageIndex(0);
  };
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.2, 0.75)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col md:flex-row bg-tertiary rounded-2xl shadow-lg overflow-hidden hover:scale-[1.01] transition-transform p-4 min-h-[200px]"
      >
        <div className="flex flex-col w-full gap-4 md:flex-row">
          {/* Left: Video or Main Image + Description */}
          <div className="flex flex-col items-start w-full gap-4 md:w-1/2">
            <div className="flex items-center justify-center w-full p-2 bg-black aspect-video rounded-xl">
              {project.demo_video ? (
                <video
                  src={project.demo_video}
                  poster={project.image}
                  controls
                  playsInline
                  preload="none"
                  aria-label={`${project.name} demo`}
                  className="w-full aspect-video object-contain rounded-lg"
                />
              ) : hasVideo ? (
                <div
                  className="relative w-full h-0"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.video}
                    title={project.video_title || project.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                  />
                </div>
              ) : project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="object-cover w-full h-full rounded-lg"
                  style={{ objectFit: project.image_fit || "cover" }}
                  loading="lazy"
                  width="400"
                  height="225"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-800 rounded-lg">
                  <span>No image</span>
                </div>
              )}
            </div>
            <div className="w-full p-2">
              <h3 className="mb-2 text-2xl font-bold text-white">
                <Link
                  to={`/projects/${project.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline"
                >
                  {project.name}
                </Link>
              </h3>
              <div
                className="text-base text-secondary"
                dangerouslySetInnerHTML={{
                  __html: project.description || "No description available.",
                }}
              />
              {project.media_note && (
                <p className="text-sm text-secondary mt-3">{project.media_note}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags && project.tags.length > 0 ? (
                  project.tags.map((tag) => (
                    <span key={tag.name} className={`text-sm ${tag.color}`}>
                      #{tag.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">No tags</span>
                )}
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="inline-block px-4 py-2 mt-4 text-white transition-colors rounded-lg shadow bg-primary hover:bg-secondary"
                onClick={(e) => e.stopPropagation()}
              >
                View Details
              </Link>
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-block ml-4 text-accent underline underline-offset-4">
                  Visit website<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
          {/* Right: Gallery Images */}
          <div className="grid items-center justify-center w-full h-full grid-cols-2 grid-rows-3 gap-2 p-2 md:w-1/2 md:items-end">
            {galleryImages && galleryImages.length > 0 ? (
              galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`gallery-${i}`}
                  className="object-cover w-full h-full min-w-0 min-h-0 transition-opacity bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:opacity-80"
                  style={{ aspectRatio: "4/3" }}
                  loading="lazy"
                  width="400"
                  height="300"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(i);
                  }}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full col-span-2 row-span-3 text-gray-400 bg-gray-800 rounded-lg">
                <span>No gallery images</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {/* Modal for gallery images */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="modal-overlay"
        style={{
          overlay: { backgroundColor: "rgb(5 8 22 / var(--tw-bg-opacity))" },
          content: {
            inset: "auto",
            padding: 0,
            border: "none",
            background: "none",
          },
        }}
      >
        <div className="modal-content">
          {/* Close Modal Button */}
          <button onClick={closeModal} className="close-button">
            &times;
          </button>
          {/* Left Arrow (previous image) Button */}
          <button onClick={goToPreviousImage} className="left-arrow">
            &#9664;
          </button>
          {/* Display Current Image */}
          <img
            src={galleryImages[currentImageIndex]}
            alt="Full Screen View"
            className="modal-image"
          />
          {/* Right Arrow (next image) Button */}
          <button onClick={goToNextImage} className="right-arrow">
            &#9654;
          </button>
        </div>
      </Modal>
    </>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
    image: PropTypes.string.isRequired,
    image_fit: PropTypes.oneOf(["cover", "contain"]),
    video: PropTypes.string,
    demo_video: PropTypes.string,
    media_note: PropTypes.string,
    live_url: PropTypes.string,
    video_title: PropTypes.string, // Add this for lint
    gallery: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

ProjectCard.displayName = "ProjectCard";

const PROJECTS_PER_BATCH = 2;
const projectFilters = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "ai-tools", label: "AI & Tools" },
  { value: "games", label: "Games" },
];

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_BATCH);
  // Defensive: ensure projects is a real array
  const allProjects = Array.isArray(projects) ? projects : [];
  const filteredProjects = selectedFilter === "all"
    ? allProjects
    : allProjects.filter((project) => project.category === selectedFilter);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
    setVisibleCount(PROJECTS_PER_BATCH);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} !text-accent`}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>
      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 mb-12 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          A selection of my work in web applications, AI integrations, tools, and
          games. Explore the demos, screenshots, and project details to see what
          I built and how it works.
        </motion.p>
      </div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-3 mb-6">
        {projectFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={selectedFilter === filter.value}
            aria-controls="project-results"
            onClick={() => selectFilter(filter.value)}
            className={`px-5 py-2 rounded-lg border font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${selectedFilter === filter.value ? "bg-accent border-accent text-white" : "bg-tertiary border-accent/40 text-secondary hover:text-white hover:border-accent"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p role="status" className="text-secondary text-sm mb-6">
        {filteredProjects.length === 0
          ? "No projects in this category yet."
          : `Showing ${visibleProjects.length} of ${filteredProjects.length} projects`}
      </p>
      <div id="project-results" className="flex flex-col w-full">
        {/* Projects List: Single column, full width */}
        <div className="flex flex-col w-full max-w-screen-xl gap-8 mx-auto">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        {/* Show More Button */}
        {hasMore && (
          <button
            type="button"
            onClick={() => setVisibleCount((previousCount) => previousCount + PROJECTS_PER_BATCH)}
            aria-controls="project-results"
            className="self-center px-6 py-3 mt-8 text-lg font-semibold text-white transition-colors rounded-lg shadow-md bg-accent hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Show more projects
          </button>
        )}
      </div>
    </>
  );
};

Projects.displayName = "Projects";

const ProjectsSection = SectionWrapper(Projects, "projects");
export default ProjectsSection;
