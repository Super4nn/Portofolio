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
        const skillsQuery = query(
          skillsRef,
          orderBy("sortOrder", "asc")
        )

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

        {/* Section Divider */}
        <hr className="editorial-rule mb-16" />

        {/* =========================================================
            SECTION HEADER
        ========================================================== */}
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">

          {/* LEFT - TITLE */}
          <div className="md:col-span-7">
            <p className="mb-2 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)]">
              02 EXPERTISE
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Technical Stack & Capabilities
            </h2>
          </div>

          {/* RIGHT - DESCRIPTION */}
          <div className="md:col-span-5 md:pl-4 lg:pl-8 md:pt-6 lg:pt-8">
            <p className="max-w-lg font-sans text-sm leading-relaxed text-[var(--text-secondary)] text-justify">
              Kumpulan teknologi, framework, dan peralatan yang saya gunakan
              secara aktif dalam merancang dan mengembangkan solusi digital
              modern.
            </p>
          </div>

        </div>

        {/* =========================================================
            LOADING STATE
        ========================================================== */}
        {loading && (
          <div className="py-12 font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
            Memuat daftar keahlian...
          </div>
        )}

        {/* =========================================================
            EMPTY STATE
        ========================================================== */}
        {!loading && skills.length === 0 && (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Belum ada keahlian yang ditambahkan.
            </p>
          </div>
        )}

        {/* =========================================================
            GROUPED SKILLS DISPLAY
        ========================================================== */}
        {!loading && skills.length > 0 && (
          <div className="space-y-12">

            {Object.entries(categories).map(
              ([categoryName, items]) => (
                <div
                  key={categoryName}
                  className="space-y-4"
                >

                  {/* =================================================
                      CATEGORY HEADER
                  ================================================== */}
                  <div className="flex items-center gap-3">

                    <span className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--text-secondary)]">
                      {categoryName}
                    </span>

                    <div className="h-px flex-1 bg-[var(--border-subtle)]" />

                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      {items.length}{" "}
                      {items.length === 1 ? "skill" : "skills"}
                    </span>

                  </div>

                  {/* =================================================
                      SKILLS GRID
                  ================================================== */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {items.map((skill) => {
                      const isIconUrl =
                        typeof skill.icon === "string" &&
                        (
                          skill.icon.startsWith("http://") ||
                          skill.icon.startsWith("https://") ||
                          skill.icon.startsWith("/")
                        )

                      return (
                        <div
                          key={skill.id}
                          className="group relative flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 p-4 transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-secondary)]"
                        >

                          {/* =================================================
                              SKILL INFO
                          ================================================== */}
                          <div className="flex min-w-0 items-center gap-3.5">

                            {/* Icon Container */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-sm font-mono font-bold text-[var(--text-primary)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">

                              {isIconUrl ? (
                                <img
                                  src={skill.icon}
                                  alt={skill.name}
                                  className="h-6 w-6 object-contain"
                                />
                              ) : (
                                <span className="truncate px-1 text-xs">
                                  {skill.icon
                                    ? skill.icon
                                      .slice(0, 3)
                                      .toUpperCase()
                                    : "DEV"}
                                </span>
                              )}

                            </div>

                            {/* Name & Category */}
                            <div className="min-w-0">

                              <h3 className="truncate font-sans text-sm font-semibold text-[var(--text-primary)]">
                                {skill.name}
                              </h3>

                              <p className="truncate font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                {skill.category || "Core"}
                              </p>

                            </div>

                          </div>

                          {/* =================================================
                              LEVEL
                          ================================================== */}
                          {typeof skill.level === "number" && (
                            <div className="flex shrink-0 items-center gap-2 pl-3">

                              <span className="font-mono text-[11px] font-medium text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-primary)]">
                                {skill.level}%
                              </span>

                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-70 group-hover:opacity-100" />

                            </div>
                          )}

                        </div>
                      )
                    })}

                  </div>
                </div>
              )
            )}

          </div>
        )}

      </div>
    </section>
  )
}