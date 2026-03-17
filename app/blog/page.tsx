import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="page-scale min-h-screen bg-slate-950 text-slate-50">
      <header className="fixed top-0 z-20 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold tracking-tight">
            Inseong<span className="text-sky-400">.</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/"
              className="rounded-full px-3 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-800/80 hover:text-white"
            >
              Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-16 py-10 sm:py-16">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            Blog
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Notes on learning & research
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            This is where I write down what I learn, how I approach problems, and
            the trade-offs I discover along the way. Over time, it becomes a
            personal growth log I can revisit and refine.
          </p>
        </section>

        <section className="mt-8 border-t border-slate-800 pt-6">
          <h2 className="text-sm font-semibold text-slate-200">
            Posts
          </h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-sky-300">
                N/A
              </p>
              <p className="mt-1 text-sm font-semibold">
                In Progress
              </p>
              <p className="mt-2 text-xs text-slate-300">
                Still being updated
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

