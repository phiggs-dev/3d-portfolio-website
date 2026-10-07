import { useEffect } from "react";
import { Link } from "react-router-dom";

import experiences from "../constants/experiences";
import projects from "../constants/projects";
import { styles } from "../styles";

const professionalExperience = experiences.filter(role => role.section !== "education");
const education = experiences.filter(role => role.section === "education");

export default function ResumePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className={`${styles.paddingX} max-w-7xl mx-auto pt-28 pb-20`}>
      <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
        <div>
          <p className={`${styles.sectionSubText} !text-accent`}>Resume</p>
          <h1 className={styles.sectionHeadText}>Scott N. Lopez</h1>
        </div>
        <a href="/ScottNLopez_Resume_Oct2026.pdf" download className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          Download PDF
        </a>
      </div>
      <div className="bg-black-100 border border-accent/20 rounded-2xl p-6 sm:p-10 space-y-10">
        <header className="space-y-4">
          <p className="text-white text-lg font-medium">Software Engineer | Applications, AI Integrations &amp; Interactive Systems</p>
          <p className="text-secondary">Orange County, California · <a className="underline underline-offset-4 hover:text-accent" href="mailto:scottnlopez60@gmail.com">scottnlopez60@gmail.com</a></p>
          <div className="flex flex-wrap gap-5 text-secondary">
            <a href="https://scottnlopez.com" className="underline underline-offset-4 hover:text-accent">Portfolio</a>
            <a href="https://www.linkedin.com/in/scott-lopez-622bb832/" className="underline underline-offset-4 hover:text-accent">LinkedIn</a>
            <a href="https://github.com/phiggs-dev" className="underline underline-offset-4 hover:text-accent">GitHub</a>
          </div>
        </header>
        <section className="space-y-4">
          <h2 className="text-white text-2xl font-bold">Summary</h2>
          <p className="text-secondary leading-7">Software engineer with paid contract experience delivering C++ and C# applications, independent web projects using React and TypeScript, and Python-based AI integrations. Takes ownership of requirements, implementation, technical investigation, and documented handoff.</p>
        </section>
        <section className="space-y-4">
          <h2 className="text-white text-2xl font-bold">Technical Skills</h2>
          <p className="text-secondary leading-7">C++, C#, Python, TypeScript, JavaScript, SQL · React, Next.js, FastAPI, REST APIs, PostgreSQL, Prisma, Sanity, Firebase · LLM integration, Ollama, Pipecat · Unreal Engine, Unity, Wwise, Git, Perforce</p>
        </section>
        <section className="space-y-8">
          <h2 className="text-white text-2xl font-bold">Engineering Experience</h2>
          {professionalExperience.slice(0, 5).map(role => (
            <section key={role.company_name} className="space-y-3">
              <h3 className="text-white text-lg font-semibold">{role.company_name} — {role.title}</h3>
              <p className="text-accent">{role.date}</p>
              <ul className="list-disc pl-5 text-secondary space-y-2 leading-7">{role.points.map(point => <li key={point}>{point}</li>)}</ul>
            </section>
          ))}
        </section>
        <section className="space-y-6">
          <h2 className="text-white text-2xl font-bold">Selected Independent Projects</h2>
          {projects.slice(0, 3).map(project => (
            <section key={project.id} className="space-y-3">
              <h3 className="text-white text-lg font-semibold"><Link className="hover:text-accent underline underline-offset-4" to={`/projects/${project.id}`}>{project.name}</Link></h3>
              <p className="text-accent">{project.tags.map(tag => tag.name).join(" · ")}</p>
              <p className="text-secondary leading-7">{project.description}</p>
            </section>
          ))}
        </section>
        <section className="space-y-6">
          <h2 className="text-white text-2xl font-bold">Additional Experience</h2>
          {professionalExperience.slice(5).map(role => (
            <section key={role.company_name} className="space-y-3">
              <h3 className="text-white text-lg font-semibold">{role.company_name} — {role.title}</h3>
              <p className="text-accent">{role.date}</p>
              <ul className="list-disc pl-5 text-secondary space-y-2 leading-7">{role.points.map(point => <li key={point}>{point}</li>)}</ul>
            </section>
          ))}
        </section>
        <section className="space-y-6">
          <h2 className="text-white text-2xl font-bold">Education</h2>
          {education.map(degree => (
            <section key={degree.company_name} className="space-y-3">
              <h3 className="text-white text-lg font-semibold">{degree.company_name} — {degree.title}</h3>
              <p className="text-accent">{degree.date}</p>
              <ul className="list-disc pl-5 text-secondary space-y-2 leading-7">{degree.points.map(point => <li key={point}>{point}</li>)}</ul>
            </section>
          ))}
        </section>
      </div>
    </article>
  );
}
