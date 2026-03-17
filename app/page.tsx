"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  title: string;
  badge: string;
  skills: string[];
  bullets: { text: string; tone: "sky" | "emerald" | "amber" | "violet" }[];
};

const sections = [
  { id: "summary", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const skillCategories = [
    {
      title: "Languages & Frameworks",
      description: "",
      icon: "code",
      skills: ["Python", "Java", "JavaScript", "PHP", "React", "Next.js", "TypeScript", "HTML/CSS"]
    },
    {
      title: "Backend & APIs",
      description: "",
      icon: "server",
      skills: ["REST API", "Node.js", "phpMyAdmin", "Supabase", "MySQL", "Oracle"]
    },
    {
      title: "Tools & Workflow",
      description: "",
      icon: "workflow",
      skills: ["Git/GitHub", "Agile", "OOP", "TDD", "SOLID", "Trello", "Figma"]
    }
  ] as const;

  const projects: Project[] = [
    {
      title:
        "Tradie Coaching Platform (Team Project - CakePHP) | Full Stack Developer & Team Lead",
      badge: "University Project",
      skills: ["CakePHP", "PHP", "phpMyAdmin", "Agile", "Git"],
      bullets: [
        {
          tone: "sky",
          text: "A web platform that transforms a business coaching book into an interactive online system — built for tradie business owners to complete assignments and track their progress."
        },
        {
          tone: "violet",
          text: "Led full-stack development of assignment submission, user profiles, and admin tracking features"
        },
        {
          tone: "violet",
          text: "Collaborated with BA to evaluate feature feasibility and negotiate scope within timeline"
        },
        {
          tone: "violet",
          text: "Managed evolving client requirements using Agile practices and continuous delivery"
        },
        {
          tone: "violet",
          text: "Directed technical design and guided team implementation as lead developer"
        }
      ]
    },
    {
      title:
        "E-Commerce Website (Team Project - CakePHP) | Main Developer & Team Lead",
      badge: "University Project",
      skills: ["CakePHP", "PHP", "API Integration", "OOP", "Git"],
      bullets: [
        {
          tone: "sky",
          text: "A full-featured e-commerce site with a focus on backend architecture, security, and real-world shipping integration."
        },
        {
          tone: "violet",
          text: "Designed core backend modules: authentication, session security, and database schema"
        },
        {
          tone: "violet",
          text: "Integrated Australia Post API to automate international shipping cost calculations"
        },
        {
          tone: "violet",
          text: "Reduced request latency by simplifying server-side logic and restructuring data flow"
        },
        {
          tone: "violet",
          text: "Led Agile sprints using GitHub workflows, code reviews, and task planning"
        }
      ]
    },
    {
      title:
        "Project Collaborate Platform (React, Supabase) | Full Stack Developer",
      badge: "Hackathon",
      skills: ["React", "Supabase", "Auth", "API"],
      bullets: [
        {
          tone: "sky",
          text: "A 48-hour hackathon prototype that connects students to project collaboration opportunities — judges highlighted its usability and scalability."
        },
        {
          tone: "violet",
          text: "Built user authentication and data persistence using Supabase and JSON APIs"
        },
        {
          tone: "violet",
          text: "Delivered a working prototype end-to-end within the hackathon timeframe"
        }
      ]
    },
    {
      title: "Digital Santorini Board Game (Java, OOP) | Main Developer",
      badge: "University Project",
      skills: ["Java", "OOP", "AI Player Logic"],
      bullets: [
        {
          tone: "sky",
          text: "A fully playable digital version of the Santorini board game, featuring AI opponent logic and a clean, maintainable codebase."
        },
        {
          tone: "violet",
          text: "Implemented MiniMax-based AI player and modular state management"
        },
        {
          tone: "violet",
          text: "Wrote tests for core gameplay logic and refactored for SOLID principles and performance"
        }
      ]
    }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("scrollBehavior" in document.documentElement.style)) return;
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="page-scale min-h-screen bg-slate-950 text-slate-50">
      <header className="fixed top-0 z-20 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold tracking-tight">
            Inseong<span className="text-sky-400">.</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-xs text-slate-200 sm:hidden"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
            <div className="hidden items-center gap-4 sm:flex">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleScroll(section.id)}
                  className="rounded-full px-3 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-800/80 hover:text-white"
                >
                  {section.label}
                </button>
              ))}
            </div>
            <Link
              href="/blog"
              className="rounded-full border border-sky-500/70 px-3 py-1 text-xs font-semibold text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition hover:bg-sky-500 hover:text-slate-950"
            >
              Blog
            </Link>
          </div>
        </nav>
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-slate-950/60 sm:hidden"
              aria-hidden
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-4 top-full z-40 mt-2 w-48 rounded-xl border border-slate-700 bg-slate-900 shadow-xl sm:hidden">
              <div className="flex flex-col p-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleScroll(section.id)}
                    className="rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-slate-800/80 hover:text-white"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </header>

      <main className="mx-auto flex max-w-4xl flex-col gap-20 px-4 pt-16 py-10 sm:py-16">
        <section id="summary" className="scroll-mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            Portfolio
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi, I&apos;m Inseong.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            This website is my personal portfolio where I organise my work,
            experience, and ideas I want to explore. Scroll down to see my
            projects, skills, education, and experience. You can also visit the
            Blog page to read about what I&apos;m learning and researching.
          </p>
        </section>

        <section id="projects" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Projects
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Here are my projects I&apos;ve worked on.
          </p>
          <div className="mt-6 grid gap-4">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
              >
                <div className="project-cardHead">
                  <span className="project-badge">{project.badge}</span>
                </div>
                <h3 className="text-sm font-semibold">{project.title}</h3>

                <ul className="project-bullets mt-2 text-xs text-slate-300">
                  {project.bullets.map((bullet, idx) => (
                    <li
                      key={`${project.title}-b-${idx}`}
                      className={`project-bulletRow ${
                        bullet.tone === "sky" ? "project-bulletRow--lead" : ""
                      }`}
                    >
                      <span
                        className={`project-bulletIcon project-bulletIcon--${bullet.tone}`}
                        aria-hidden
                      />
                      <span className="project-bulletText">{bullet.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="project-skills mt-3">
                  {project.skills.map((skill) => (
                    <span key={`${project.title}-s-${skill}`} className="project-skillChip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Education
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-medium">Monash University / Software Development</p>
              <p className="mt-1 text-xs text-slate-400">2023 - 2025 · Bachelor of Information Technology</p>
            </li>
          </ul>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-medium">Tech University of Korea</p>
              <p className="mt-1 text-xs text-slate-400">2018 - 2019 · Bachelor of Electrical Engineering</p>
            </li>
          </ul>
        </section>

        <section id="skills" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Skills
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Focus on listing the tools and technologies you feel confident using
            in real projects.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="skill-card">
                <div className="skill-icon" aria-hidden>
                  {cat.icon === "code" && (
                    <svg
                      className="skill-iconSvg"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L3 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 6L21 12L15 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {cat.icon === "server" && (
                    <svg
                      className="skill-iconSvg"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6.5C6 5.11929 8.68629 4 12 4C15.3137 4 18 5.11929 18 6.5C18 7.88071 15.3137 9 12 9C8.68629 9 6 7.88071 6 6.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M6 6.5V12.5C6 13.8807 8.68629 15 12 15C15.3137 15 18 13.8807 18 12.5V6.5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M6 12.5V17.5C6 18.8807 8.68629 20 12 20C15.3137 20 18 18.8807 18 17.5V12.5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                  {cat.icon === "workflow" && (
                    <svg
                      className="skill-iconSvg"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 7H11V11H7V7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M13 13H17V17H13V13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M11 9H14C15.6569 9 17 10.3431 17 12V13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>

                <p className="skill-title">{cat.title}</p>
                <p className="skill-desc">{cat.description}</p>

                <div className="skill-chips">
                  {cat.skills.map((skill) => (
                    <span key={`${cat.title}-${skill}`} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Experience
          </h2>
          <div className="mt-4 space-y-4 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-medium">Life4Cuts - Melbourne, Australia</p>
              <p className="mt-1 text-xs text-slate-400">Sep 2024 - current · Staff</p>
              <ul className="project-bullets mt-2 text-xs text-slate-300">
                <li className="project-bulletRow">
                  <span className="project-bulletIcon project-bulletIcon--violet" aria-hidden />
                  <span className="project-bulletText">
                    Managed daily customer workflow in a fast-paced environment, prioritising tasks and resolving issues quickly.
                  </span>
                </li>
                <li className="project-bulletRow">
                  <span className="project-bulletIcon project-bulletIcon--violet" aria-hidden />
                  <span className="project-bulletText">
                    Analysed customer response trends to improve service efficiency
                  </span>
                </li>
                <li className="project-bulletRow">
                  <span className="project-bulletIcon project-bulletIcon--violet" aria-hidden />
                  <span className="project-bulletText">
                    Communicated and collaborated effectively within a small team
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 space-y-4 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="font-medium">Hwayo Dining Bar - Melbourne, Australia</p>
              <p className="mt-1 text-xs text-slate-400">Feb 2022 - Jun 2024 · FOH</p>
              <ul className="project-bullets mt-2 text-xs text-slate-300">
                <li className="project-bulletRow">
                  <span className="project-bulletIcon project-bulletIcon--violet" aria-hidden />
                  <span className="project-bulletText">
                    Resolved customer issues in real time under pressure
                  </span>
                </li>
                <li className="project-bulletRow">
                  <span className="project-bulletIcon project-bulletIcon--violet" aria-hidden />
                  <span className="project-bulletText">
                    Identified bottlenecks in team workflow and proposed practical improvements
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Contact
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Based in Melbourne, open to move to other cities in Australia.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-slate-200">
              Email:{" "}
              <a
                href="is8159750@gmail.com"
                className="text-sky-300 underline-offset-2 hover:underline"
              >
                is8159750@gmail.com
              </a>
            </p>
            <p className="text-slate-200">
              GitHub:{" "}
              <a
                href="https://github.com/your-id"
                target="_blank"
                rel="noreferrer"
                className="text-sky-300 underline-offset-2 hover:underline"
              >
                @Inseong-Hwang-dev
              </a>
            </p>
            <p className="text-slate-200">
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/inseong-hwang-b888872b7/"
                className="text-sky-300 underline-offset-2 hover:underline"
              >
                Inseong Hwang
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} Inseong. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

