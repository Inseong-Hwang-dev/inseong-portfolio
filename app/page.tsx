"use client";

import BackgroundShader from "@/components/BackgroundShader";
import ThreeDecoration from "@/components/ThreeDecoration";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Bullet = { text: string; tone: "sky" | "emerald" | "amber" | "violet" };

type Project = {
  title: string;
  badge: string;
  skills: string[];
  bullets: Bullet[];
  image?: string;
  link?: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  badge: string;
  image?: string;
  imageLayout?: "banner" | "portrait-side";
  link?: string;
  bullets: Bullet[];
  skills: string[];
};

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" }
];

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida/AP1WRLvBLc6onh8xWyYXftmBv34o0fM5ZhX2t_83OASwScVoaThlENkR2nZ-MnYvWXiBWL9bFFypbDMLV-FVmm0XNAmE22ine9hvMUrUQ5VxT8-laRJF1XMUZ6LQoG_dkKfEgpIeF84Ru90TQB1YPSxa55V09L3AFRi1JCOEj-4qIVmU6LBL6Ez5M0DDLcXJuuAD3kUFWB-bfy2GCz4iwXEk2sCzNYBMGprrqFdcL5Hs8tiitXCx-AzPEeBxWYnQ";

function badgeClass(badge: string) {
  if (badge === "Hackathon") {
    return "bg-secondary-container/20 text-secondary border-secondary/20";
  }
  if (badge === "Ongoing Project") {
    return "bg-accent-neon-cyan/10 text-accent-neon-cyan border-accent-neon-cyan/20";
  }
  return "bg-primary/10 text-primary border-primary/20";
}

function ExternalLink({
  href,
  children,
  className = "",
  variant = "inline",
  showIcon = true
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "inline" | "cta";
  showIcon?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`external-link group inline-flex items-center ${variant === "cta" ? "external-link--cta" : ""} ${className}`}
    >
      <span className="external-link__text">{children}</span>
      {showIcon && (
        <span
          className="material-symbols-outlined external-link__icon shrink-0 text-[1.125rem]"
          aria-hidden
        >
          {variant === "cta" ? "arrow_outward" : "open_in_new"}
        </span>
      )}
    </a>
  );
}

function GlassCard({
  children,
  className = "",
  cardRef
}: {
  children: React.ReactNode;
  className?: string;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      className={`glass-card glass-card--fade glass-card--hidden rounded-xl ${className}`}
    >
      {children}
    </article>
  );
}

function ProjectCard({
  project,
  cardRef
}: {
  project: Project;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  const lead = project.bullets.find((b) => b.tone === "sky");
  const details = project.bullets.filter((b) => b.tone !== "sky").slice(0, 2);

  const title = project.link ? (
    <ExternalLink href={project.link} className="text-white">
      {project.title}
    </ExternalLink>
  ) : (
    project.title
  );

  return (
    <GlassCard cardRef={cardRef} className="flex h-full flex-col p-stack-lg">
      {project.image &&
        (project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${project.title}`}
            className="card-media-link mb-stack-md block overflow-hidden rounded-lg border border-border-subtle bg-white/95 p-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="mx-auto h-36 w-full object-contain"
            />
          </a>
        ) : (
          <div className="mb-stack-md overflow-hidden rounded-lg border border-border-subtle bg-white/95 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="mx-auto h-36 w-full object-contain"
            />
          </div>
        ))}
      <div className="mb-stack-md">
        <span
          className={`rounded-full border px-3 py-1 font-mono text-caption ${badgeClass(project.badge)}`}
        >
          {project.badge}
        </span>
      </div>
      <h3 className="mb-stack-md font-[family-name:var(--font-display)] text-headline-md leading-[2.5rem] text-white">
        {title}
      </h3>
      <ul className="mb-8 space-y-3 text-on-surface-variant">
        {[lead, ...details].filter(Boolean).map((bullet, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-1 text-primary">•</span>
            {bullet!.text}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-2">
        {project.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="skill-chip rounded px-3 py-1 font-mono text-caption"
          >
            {skill}
          </span>
        ))}
        {project.link && (
          <ExternalLink href={project.link} variant="cta" className="ml-auto">
            Visit project
          </ExternalLink>
        )}
      </div>
    </GlassCard>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cardRefs = useRef<Set<HTMLElement>>(new Set());

  const registerCard = (el: HTMLElement | null) => {
    if (el) cardRefs.current.add(el);
  };

  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: "code",
      accent: "border-l-primary",
      iconColor: "text-primary",
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "PHP",
        "React",
        "Next.js",
        "TypeScript",
        "HTML/CSS"
      ]
    },
    {
      title: "Backend & APIs",
      icon: "database",
      accent: "border-l-secondary",
      iconColor: "text-secondary",
      skills: ["REST API", "Node.js", "phpMyAdmin", "Supabase", "MySQL", "Oracle"]
    },
    {
      title: "Tools & Workflow",
      icon: "terminal",
      accent: "border-l-accent-neon-cyan",
      iconColor: "text-accent-neon-cyan",
      skills: ["Git/GitHub", "Agile", "OOP", "TDD", "SOLID", "Trello", "Figma"]
    }
  ] as const;

  const experiences: ExperienceItem[] = [
    {
      company: "TradieCoach",
      role: "Software Developer & Team Lead",
      period: "Jul 2025 – Nov 2025",
      badge: "Industry Client Project",
      image: "/images/tradiecoach-cover.png",
      bullets: [
        {
          tone: "sky",
          text: "Business coaching platform that helps tradies manage and grow their businesses."
        },
        {
          tone: "violet",
          text: "Led backend and admin system development in a 5-person team using CakePHP, PHP, and MySQL."
        },
        {
          tone: "violet",
          text: "Designed MySQL database structure for users, learning modules, assignments, and progress tracking across 30+ chapters."
        }
      ],
      skills: ["CakePHP", "PHP", "MySQL", "cPanel"]
    },
    {
      company: "Pupfish",
      role: "Software Developer",
      period: "May 2025 – Present",
      badge: "Ongoing Project",
      image: "/images/pupfish-cover.png",
      imageLayout: "portrait-side",
      link: "https://github.com/Inseong-Hwang-dev/pupfish_prototype_1",
      bullets: [
        {
          tone: "sky",
          text: "Social dining platform with restaurant matching and course map sharing."
        },
        {
          tone: "violet",
          text: "Working in a 4-person team with a project manager, data scientist, and UI/UX designer using Next.js, React, and Supabase."
        },
        {
          tone: "violet",
          text: "Helped define the technical stack, database structure, development guidelines, and main feature workflows before implementation."
        }
      ],
      skills: ["Next.js", "React", "Supabase", "TypeScript"]
    }
  ];

  const projects: Project[] = [
    {
      title: "ParkingSpace | Software Developer",
      badge: "Personal Project",
      image: "/images/parkingspace-cover.png",
      link: "https://parking-rent.vercel.app/",
      skills: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL"],
      bullets: [
        {
          tone: "sky",
          text: "Car park rental marketplace - users rent out unused parking spaces directly to others."
        },
        {
          tone: "violet",
          text: "Independently developing a full stack parking marketplace using Next.js, TypeScript, Supabase, and PostgreSQL."
        }
      ]
    },
    {
      title: "DivineVines | Main Software Developer & Team Lead",
      badge: "University Project",
      image: "/images/divinevines-cover.png",
      link: "https://github.com/Inseong-Hwang-dev/divinewines",
      skills: ["CakePHP", "PHP", "MySQL", "Stripe", "Australia Post API"],
      bullets: [
        {
          tone: "sky",
          text: "E-commerce platform for an Australian wine business selling products internationally."
        },
        {
          tone: "violet",
          text: "Led backend development in a 5-person team using CakePHP, PHP, and MySQL."
        }
      ]
    },
    {
      title: "CollabLab | Software Developer",
      badge: "Hackathon",
      image: "/images/collablab-cover.png",
      link: "https://github.com/Inseong-Hwang-dev/collab-lab-hackathon",
      skills: ["React", "Supabase", "OpenAI API"],
      bullets: [
        {
          tone: "sky",
          text: "Project collaboration platform designed to help students find teammates and build project teams more efficiently."
        },
        {
          tone: "violet",
          text: "Built a working MVP in a 3-person team within 48 hours, covering authentication, user profiles, and project posting features."
        }
      ]
    },
    {
      title: "iOS & macOS Applications | Developer",
      badge: "University Project",
      image: "/images/swift-apps-cover.png",
      skills: ["Swift", "SwiftUI", "OpenAI API"],
      bullets: [
        {
          tone: "sky",
          text: "Collection of iOS and macOS apps built with Swift, SwiftUI, and OpenAI API integration."
        },
        {
          tone: "violet",
          text: "Developed iOS apps for expense tracking, currency exchange comparison, Nasdaq stock lookup, and global interest rate comparison."
        }
      ]
    },
    {
      title: "Santorini [Digital Board Game] | Main Developer",
      badge: "University Project",
      image: "/images/santorini-cover.png",
      link: "https://github.com/Inseong-Hwang-dev/santorini",
      skills: ["Java", "OOP", "AI Player Logic"],
      bullets: [
        {
          tone: "sky",
          text: "Digital version of the Santorini board game featuring an AI opponent."
        },
        {
          tone: "violet",
          text: "Developed core gameplay logic in Java, including turn management, board state validation, win-condition checks, and AI opponent behaviour."
        }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("glass-card--visible");
            entry.target.classList.remove("glass-card--hidden");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-on-surface">
      <BackgroundShader />

      <nav className="fixed top-0 z-50 h-16 w-full border-b border-border-subtle bg-surface-glass shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[var(--spacing-container-max)] items-center justify-between px-margin-mobile md:px-gutter">
          <button
            type="button"
            onClick={() => handleScroll("about")}
            className="flex items-center gap-2 transition hover:scale-105"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="Inseong Developer Logo"
              className="h-10 w-auto rounded-md"
            />
          </button>

          <div className="hidden items-center gap-stack-lg md:flex">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleScroll(section.id)}
                className="nav-link font-[family-name:var(--font-body)] text-body-md text-on-surface-variant transition-colors duration-300 hover:text-primary"
              >
                {section.label}
              </button>
            ))}
            <Link
              href="/blog"
              className="rounded-full bg-primary px-6 py-2 font-bold text-on-primary shadow-lg shadow-primary/20 transition hover:scale-105"
            >
              Blog
            </Link>
          </div>

          <button
            type="button"
            className="text-primary md:hidden"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="material-symbols-outlined text-[2rem]">menu</span>
          </button>
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-background-obsidian/60 md:hidden"
              aria-hidden
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-margin-mobile top-full z-50 mt-2 w-52 rounded-xl border border-border-subtle bg-surface-container p-2 shadow-xl md:hidden">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleScroll(section.id)}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-on-surface-variant transition hover:bg-surface-glass hover:text-primary"
                >
                  {section.label}
                </button>
              ))}
              <Link
                href="/blog"
                className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-bold text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </>
        )}
      </nav>

      <header
        id="about"
        className="relative flex min-h-screen items-center scroll-mt-24 pt-16"
      >
        <div className="relative z-10 mx-auto w-full max-w-[var(--spacing-container-max)] px-margin-mobile md:px-gutter">
          <div className="max-w-3xl">
            <p className="mb-stack-md font-mono text-label-mono uppercase tracking-widest text-primary">
              Portfolio
            </p>
            <h1 className="mb-stack-lg font-[family-name:var(--font-display)] text-display-xl-mobile font-extrabold tracking-[-0.02em] text-primary md:text-display-xl md:tracking-[-0.04em]">
              Hi, I&apos;m <span className="text-white">Inseong.</span>
            </h1>
            <p className="mb-stack-lg max-w-2xl font-[family-name:var(--font-body)] text-body-lg leading-relaxed text-on-surface-variant">
              This website is my personal portfolio where I organise my work,
              experience, and ideas I want to explore. Scroll down to see my
              projects, skills, education, and experience. You can also visit
              the Blog page to read about what I&apos;m learning and researching.
            </p>
            <div className="mt-10 flex flex-wrap gap-stack-md">
              <button
                type="button"
                onClick={() => handleScroll("projects")}
                className="group flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-bold text-on-primary transition hover:scale-105"
              >
                View Projects
                <span className="material-symbols-outlined transition group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleScroll("contact")}
                className="rounded-lg border border-border-subtle bg-surface-glass px-8 py-4 font-bold text-primary transition hover:border-primary/50"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="experience" className="scroll-mt-24 py-section-gap">
        <div className="mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-gutter">
          <h2 className="mb-12 font-[family-name:var(--font-display)] text-headline-lg text-primary">
            Experience
          </h2>
          <div className="relative space-y-10 before:absolute before:bottom-2 before:left-[0.6875rem] before:top-2 before:w-px before:bg-primary/20">
            {experiences.map((exp) => {
              const lead = exp.bullets.find((b) => b.tone === "sky");
              const details = exp.bullets.filter((b) => b.tone !== "sky").slice(0, 2);
              const isPortraitSide = exp.imageLayout === "portrait-side";

              const cardContent = (
                <>
                  <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-headline-md text-white">
                        {exp.link ? (
                          <ExternalLink href={exp.link}>{exp.company}</ExternalLink>
                        ) : (
                          exp.company
                        )}
                        {" - "}
                        {exp.role}
                      </h3>
                      <p className="font-bold text-primary">{exp.badge}</p>
                    </div>
                    <span className="font-mono text-on-surface-variant">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-3 text-on-surface-variant">
                    {[lead, ...details].filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-xl text-primary">▹</span>
                        {bullet!.text}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-chip rounded px-3 py-1 font-mono text-caption"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {exp.link && (
                    <div className="mt-4 border-t border-border-subtle pt-4">
                      <ExternalLink href={exp.link} variant="cta">
                        Visit project
                      </ExternalLink>
                    </div>
                  )}
                </>
              );

              return (
                <div key={exp.company} className="group relative pl-12">
                  <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-primary bg-background-obsidian transition-all duration-300 group-hover:scale-125 group-hover:bg-primary" />
                  <GlassCard cardRef={registerCard} className="overflow-hidden p-stack-lg">
                    {exp.image && isPortraitSide ? (
                      <div className="flex flex-col gap-stack-md sm:flex-row sm:items-start sm:gap-stack-lg">
                        <div className="min-w-0 flex-1">{cardContent}</div>
                        {exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Visit ${exp.company} project`}
                            className="card-media-link mx-auto shrink-0 overflow-hidden rounded-lg border border-border-subtle bg-white/95 p-2 sm:mx-0 sm:ml-auto"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={exp.image}
                              alt={`${exp.company} cover`}
                              className="h-52 w-auto max-w-[9.5rem] object-contain sm:h-64 sm:max-w-[10.5rem]"
                            />
                          </a>
                        ) : (
                          <div className="mx-auto shrink-0 overflow-hidden rounded-lg border border-border-subtle bg-white/95 p-2 sm:mx-0 sm:ml-auto">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={exp.image}
                              alt={`${exp.company} cover`}
                              className="h-52 w-auto max-w-[9.5rem] object-contain sm:h-64 sm:max-w-[10.5rem]"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {exp.image &&
                          (exp.link ? (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Visit ${exp.company} project`}
                              className="card-media-link mb-stack-md block overflow-hidden rounded-lg border border-border-subtle bg-white/95 p-3"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={exp.image}
                                alt={`${exp.company} cover`}
                                className="mx-auto h-36 w-full object-contain"
                              />
                            </a>
                          ) : (
                            <div className="mb-stack-md overflow-hidden rounded-lg border border-border-subtle bg-white/95 p-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={exp.image}
                                alt={`${exp.company} cover`}
                                className="mx-auto h-36 w-full object-contain"
                              />
                            </div>
                          ))}
                        {cardContent}
                      </>
                    )}
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 py-section-gap">
        <div className="mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-gutter">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="mb-stack-sm font-[family-name:var(--font-display)] text-headline-lg text-primary">
                Projects
              </h2>
              <p className="text-on-surface-variant">
                Here are my projects I&apos;ve worked on.
              </p>
            </div>
            <div className="mb-4 hidden h-px flex-grow bg-border-subtle md:mx-stack-lg md:block" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                cardRef={registerCard}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="scroll-mt-24 py-section-gap">
        <div className="mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-gutter">
          <h2 className="mb-12 flex items-center gap-4 font-[family-name:var(--font-display)] text-headline-lg text-primary">
            <span className="material-symbols-outlined text-4xl">school</span>
            Education
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <GlassCard
                cardRef={registerCard}
                className="flex flex-col justify-between gap-4 p-stack-lg md:flex-row md:items-center"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-headline-md text-white">
                    Monash University / Software Development
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-body-lg text-on-surface-variant">
                    Bachelor of Information Technology
                  </p>
                </div>
                <span className="font-mono text-lg text-primary">2023 - 2025</span>
              </GlassCard>
              <GlassCard
                cardRef={registerCard}
                className="flex flex-col justify-between gap-4 p-stack-lg md:flex-row md:items-center"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-headline-md text-white">
                    Tech University of Korea
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-body-lg text-on-surface-variant">
                    Bachelor of Electrical Engineering
                  </p>
                </div>
                <span className="font-mono text-lg text-primary">2018 - 2019</span>
              </GlassCard>
            </div>
            <ThreeDecoration />
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 py-section-gap">
        <div className="mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-gutter">
          <div className="mb-12">
            <h2 className="mb-stack-sm font-[family-name:var(--font-display)] text-headline-lg text-primary">
              Skills
            </h2>
            <p className="text-on-surface-variant">
              Focus on listing the tools and technologies you feel confident
              using in real projects.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {skillCategories.map((cat) => (
              <GlassCard
                key={cat.title}
                cardRef={registerCard}
                className={`border-l-4 p-stack-lg ${cat.accent}`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className={`material-symbols-outlined ${cat.iconColor}`}>
                    {cat.icon}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-white">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip rounded-lg px-3 py-1.5 font-mono text-caption"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 overflow-hidden py-section-gap">
        <div className="relative z-10 mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-gutter">
          <GlassCard
            cardRef={registerCard}
            className="border-t-2 border-t-primary/30 p-12 text-center md:p-20"
          >
            <h2 className="mb-6 font-[family-name:var(--font-display)] text-display-xl-mobile font-extrabold text-primary">
              Let&apos;s Connect
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-body-lg text-on-surface-variant">
              Based in Melbourne, open to move to other cities in Australia.
              Whether you have a project in mind or just want to say hi, my inbox
              is always open.
            </p>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              <a
                href="mailto:is8159750@gmail.com"
                className="flex flex-col items-center rounded-xl border border-primary/10 bg-primary/5 p-8 transition hover:border-primary/40 hover:bg-primary/10"
              >
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                  mail
                </span>
                <span className="mb-1 font-bold text-white">Email</span>
                <span className="text-caption text-on-surface-variant">
                  is8159750@gmail.com
                </span>
              </a>
              <a
                href="https://github.com/Inseong-Hwang-dev"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center rounded-xl border border-primary/10 bg-primary/5 p-8 transition hover:border-primary/40 hover:bg-primary/10"
              >
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                  terminal
                </span>
                <span className="mb-1 font-bold text-white">GitHub</span>
                <span className="text-caption text-on-surface-variant">
                  @Inseong-Hwang-dev
                </span>
              </a>
              <a
                href="https://linkedin.com/in/inseong-hwang-b888872b7/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center rounded-xl border border-primary/10 bg-primary/5 p-8 transition hover:border-primary/40 hover:bg-primary/10"
              >
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                  person
                </span>
                <span className="mb-1 font-bold text-white">LinkedIn</span>
                <span className="text-caption text-on-surface-variant">
                  Inseong Hwang
                </span>
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      <footer className="w-full border-t border-border-subtle bg-background-obsidian py-stack-lg">
        <div className="mx-auto flex max-w-[var(--spacing-container-max)] flex-col items-center justify-between gap-stack-md px-margin-mobile md:flex-row md:px-gutter">
          <div className="flex flex-col items-center md:items-start">
            <span className="mb-2 font-[family-name:var(--font-display)] text-headline-md text-primary">
              Inseong.
            </span>
            <p className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant opacity-80">
              © {new Date().getFullYear()} DevPortfolio. Built with precision.
            </p>
          </div>
          <div className="flex gap-8">
            <a
              href="https://github.com/Inseong-Hwang-dev"
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/inseong-hwang-b888872b7/"
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              LinkedIn
            </a>
            <a
              href="mailto:is8159750@gmail.com"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
