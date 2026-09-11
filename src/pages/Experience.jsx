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
      className="
        scroll-mt-24
        bg-[var(--bg-primary)]
        px-6
        py-20
        text-[var(--text-primary)]
        transition-colors
        duration-300
        sm:px-8
        lg:py-24
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* =========================================================
            SECTION DIVIDER
        ========================================================== */}
        <hr className="editorial-rule mb-16" />

        {/* =========================================================
            SECTION HEADER
        ========================================================== */}
        <div
          className="
            mb-14
            flex
            flex-col
            justify-between
            gap-6
            md:flex-row
            md:items-end
          "
        >
          {/* LEFT */}
          <div>
            <p
              className="
                mb-2
                font-mono
                text-xs
                uppercase
                tracking-[0.2em]
                text-[var(--accent)]
              "
            >
              03 TIMELINE
            </p>

            <h2
              className="
                font-display
                text-3xl
                font-bold
                tracking-tight
                text-[var(--text-primary)]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Work & Academic Journey
            </h2>
          </div>

          {/* RIGHT */}
          <p
            className="
              max-w-md
              font-sans
              text-sm
              leading-relaxed
              text-[var(--text-secondary)]
              text-justify
            "
          >
            Rekam jejak pendidikan, peran profesional, dan pengalaman
            dalam rekayasa perangkat lunak.
          </p>
        </div>

        {/* =========================================================
            LOADING STATE
        ========================================================== */}
        {loading && (
          <div
            className="
              py-12
              font-mono
              text-xs
              uppercase
              tracking-wider
              text-[var(--text-muted)]
            "
          >
            Memuat riwayat pengalaman...
          </div>
        )}

        {/* =========================================================
            EMPTY STATE
        ========================================================== */}
        {!loading && experiences.length === 0 && (
          <div
            className="
              rounded-xl
              border
              border-[var(--border-subtle)]
              bg-[var(--bg-secondary)]/30
              p-8
              text-center
            "
          >
            <p
              className="
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-[var(--text-muted)]
              "
            >
              Belum ada riwayat pengalaman yang ditambahkan.
            </p>
          </div>
        )}

        {/* =========================================================
            EXPERIENCE TIMELINE
        ========================================================== */}
        {!loading && experiences.length > 0 && (
          <div
            className="
              divide-y
              divide-[var(--border-subtle)]
              border-b
              border-t
              border-[var(--border-subtle)]
            "
          >
            {experiences.map((experience) => {
              const periodText = `${experience.startDate || "-"} — ${
                experience.isCurrent
                  ? "Sekarang"
                  : experience.endDate || "-"
              }`

              return (
                <article
                  key={experience.id}
                  className="
                    group
                    -mx-3
                    rounded-xl
                    px-3
                    py-8
                    transition-colors
                    duration-200
                    hover:bg-[var(--bg-secondary)]/30
                    sm:py-10
                  "
                >
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-6
                      md:grid-cols-12
                      md:gap-10
                    "
                  >

                    {/* =================================================
                        LEFT COLUMN
                        DATE + LOCATION
                    ================================================== */}
                    <div
                      className="
                        space-y-2
                        md:col-span-4
                      "
                    >
                      {/* DATE + STATUS */}
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className="
                            font-mono
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-[var(--text-primary)]
                          "
                        >
                          {periodText}
                        </span>

                        {/* ACTIVE STATUS */}
                        {experience.isCurrent && (
                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-full
                              border
                              border-emerald-500/30
                              bg-emerald-500/10
                              px-2
                              py-0.5
                              font-mono
                              text-[10px]
                              text-emerald-600
                              dark:text-emerald-400
                            "
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-emerald-500
                              "
                            />

                            <span>
                              Aktif
                            </span>
                          </span>
                        )}
                      </div>

                      {/* LOCATION */}
                      {experience.location && (
                        <p
                          className="
                            font-mono
                            text-[11px]
                            text-[var(--text-muted)]
                          "
                        >
                          {experience.location}
                        </p>
                      )}
                    </div>

                    {/* =================================================
                        RIGHT COLUMN
                        POSITION + COMPANY + DESCRIPTION
                    ================================================== */}
                    <div
                      className="
                        space-y-3
                        md:col-span-8
                      "
                    >
                      {/* POSITION + COMPANY */}
                      <div>
                        <h3
                          className="
                            font-display
                            text-xl
                            font-bold
                            tracking-tight
                            text-[var(--text-primary)]
                            transition-colors
                            sm:text-2xl
                            group-hover:text-[var(--accent)]
                          "
                        >
                          {experience.position || "Posisi"}
                        </h3>

                        <p
                          className="
                            mt-0.5
                            font-sans
                            text-base
                            font-medium
                            text-[var(--text-secondary)]
                          "
                        >
                          {experience.company ||
                            "Institusi / Perusahaan"}
                        </p>
                      </div>

                      {/* DESCRIPTION */}
                      {experience.description && (
                        <p
                          className="
                            whitespace-pre-line
                            pt-2
                            font-sans
                            text-sm
                            leading-relaxed
                            text-[var(--text-secondary)]
                            text-justify
                          "
                        >
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