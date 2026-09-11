import { useEffect, useRef, useState } from "react"
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, "projects")
        const projectsQuery = query(projectsRef, orderBy("sortOrder", "asc"))
        const snapshot = await getDocs(projectsQuery)
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
        setProjects(data)
      } catch (error) {
        console.error("Gagal mengambil projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [projects])

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 480
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section
      id="projects"
      className="scroll-mt-24 px-6 py-20 sm:px-8 lg:py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="editorial-rule mb-16" />

        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
              04 SELECTED WORK
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Selected Work
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="max-w-md font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
              Karya pilihan dan aplikasi yang saya bangun. Geser ke samping untuk menjelajahi seluruh project.
            </p>

            {/* Navigation Arrows for Horizontal Flow */}
            {projects.length > 1 && (
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Scroll left"
                >
                  <span className="font-mono text-base">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Scroll right"
                >
                  <span className="font-mono text-base">→</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)] animate-pulse">
              Memuat karya pilihan...
            </span>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="rounded-[6px] border border-[var(--border)] bg-[var(--bg-secondary)]/50 p-12 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
              Belum ada project yang ditambahkan.
            </p>
          </div>
        )}

        {/* Horizontal Project Cards Flow */}
        {!loading && projects.length > 0 && (
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {projects.map((project) => (
              <article
                key={project.id}
                className="group flex-none w-[320px] sm:w-[420px] md:w-[480px] snap-start flex flex-col justify-between space-y-5 rounded-[6px] border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-5 sm:p-6 transition-all duration-300 hover:border-[var(--border-strong)]"
              >
                <div className="space-y-4">
                  {/* Restrained, Compact Image */}
                  <div className="relative aspect-[16/10] w-full max-h-[260px] overflow-hidden rounded-[4px] border border-[var(--border)] bg-[var(--bg-secondary)]">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title || "Project preview"}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[var(--text-tertiary)]">
                        <span className="font-mono text-xs uppercase tracking-wider">No Preview</span>
                      </div>
                    )}

                    {project.featured && (
                      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider uppercase bg-[var(--bg-primary)]/90 backdrop-blur-sm text-[var(--text-primary)] px-2 py-0.5 rounded-[4px] border border-[var(--border)]">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="pt-1">
                      <p className="font-mono text-xs text-[var(--text-tertiary)]">
                        {project.technologies
                          .map((tech) => tech.toLowerCase())
                          .join(" · ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-5 pt-3 border-t border-[var(--border)] font-mono text-xs">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-medium underline-offset-4 hover:underline"
                    >
                      Live Demo
                      <span aria-hidden="true">→</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline-offset-4 hover:underline"
                    >
                      Source Code
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}