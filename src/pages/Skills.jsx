import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsRef = collection(db, "skills")
        const skillsQuery = query(skillsRef, orderBy("sortOrder", "asc"))
        const snapshot = await getDocs(skillsQuery)

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))

        setSkills(data)
      } catch (error) {
        console.error("Gagal mengambil skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Group skills dynamically by category
  const categories = skills.reduce((acc, skill) => {
    const cat = skill.category?.trim() || "General & Core"
    if (!acc[cat]) {
      acc[cat] = []
    }
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <section
      id="skills"
      className="scroll-mt-24 px-6 py-20 sm:px-8 lg:py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="editorial-rule mb-16" />

        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
              02 // EXPERTISE
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Technical Stack & Capabilities
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
            Kumpulan teknologi, framework, dan peralatan yang saya gunakan secara aktif dalam merancang dan mengembangkan solusi digital modern.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
            Memuat daftar keahlian...
          </div>
        )}

        {/* Empty State */}
        {!loading && skills.length === 0 && (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Belum ada keahlian yang ditambahkan.
            </p>
          </div>
        )}

        {/* Grouped Skills Display */}
        {!loading && skills.length > 0 && (
          <div className="space-y-12">
            {Object.entries(categories).map(([categoryName, items]) => (
              <div key={categoryName} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--text-secondary)]">
                    {categoryName}
                  </span>
                  <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    {items.length} {items.length === 1 ? "skill" : "skills"}
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((skill) => {
                    const isIconUrl =
                      typeof skill.icon === "string" &&
                      (skill.icon.startsWith("http://") ||
                        skill.icon.startsWith("https://") ||
                        skill.icon.startsWith("/"))

                    return (
                      <div
                        key={skill.id}
                        className="group relative flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 p-4 transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-secondary)]"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Icon Container */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-sm font-mono font-bold text-[var(--text-primary)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] overflow-hidden">
                            {isIconUrl ? (
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="h-6 w-6 object-contain"
                              />
                            ) : (
                              <span className="truncate px-1 text-xs">
                                {skill.icon ? skill.icon.slice(0, 3).toUpperCase() : "DEV"}
                              </span>
                            )}
                          </div>

                          {/* Name & Category info */}
                          <div className="min-w-0">
                            <h3 className="font-sans text-sm font-semibold text-[var(--text-primary)] truncate">
                              {skill.name}
                            </h3>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] truncate">
                              {skill.category || "Core"}
                            </p>
                          </div>
                        </div>

                        {/* Level Presentation (Refined, no artificial progress bar) */}
                        {typeof skill.level === "number" && (
                          <div className="shrink-0 flex items-center gap-2 pl-3">
                            <span className="font-mono text-[11px] font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                              {skill.level}%
                            </span>
                            {/* Discrete indicator pill */}
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-70 group-hover:opacity-100" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}