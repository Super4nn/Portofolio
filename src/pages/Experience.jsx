import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experiencesRef = collection(db, "experiences")
        const experiencesQuery = query(
          experiencesRef,
          orderBy("sortOrder", "asc")
        )

        const snapshot = await getDocs(experiencesQuery)

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))

        setExperiences(data)
      } catch (error) {
        console.error("Gagal mengambil experience:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return (
    <section
      id="experience"
      className="scroll-mt-24 px-6 py-20 sm:px-8 lg:py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="editorial-rule mb-16" />

        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
              03 // TIMELINE
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Work & Academic Journey
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
            Rekam jejak pendidikan, peran profesional, dan pengalaman dalam rekayasa perangkat lunak.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
            Memuat riwayat pengalaman...
          </div>
        )}

        {/* Empty State */}
        {!loading && experiences.length === 0 && (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Belum ada riwayat pengalaman yang ditambahkan.
            </p>
          </div>
        )}

        {/* Experience Editorial Timeline */}
        {!loading && experiences.length > 0 && (
          <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
            {experiences.map((experience) => {
              const periodText = `${experience.startDate || "-"} — ${
                experience.isCurrent ? "Sekarang" : experience.endDate || "-"
              }`

              return (
                <article
                  key={experience.id}
                  className="group py-8 transition-colors duration-200 sm:py-10 hover:bg-[var(--bg-secondary)]/30 px-3 -mx-3 rounded-xl"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                    {/* Column 1: Date & Metadata (Mono) */}
                    <div className="md:col-span-4 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs tracking-wider uppercase font-semibold text-[var(--text-primary)]">
                          {periodText}
                        </span>

                        {experience.isCurrent && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>Aktif</span>
                          </span>
                        )}
                      </div>

                      {experience.location && (
                        <p className="font-mono text-[11px] text-[var(--text-muted)]">
                          {experience.location}
                        </p>
                      )}
                    </div>

                    {/* Column 2: Role, Company & Narrative Description */}
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {experience.position || "Posisi"}
                        </h3>

                        <p className="font-sans text-base font-medium text-[var(--text-secondary)] mt-0.5">
                          {experience.company || "Institusi / Perusahaan"}
                        </p>
                      </div>

                      {experience.description && (
                        <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)] whitespace-pre-line pt-2">
                          {experience.description}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}