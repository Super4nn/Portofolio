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
      className="scroll-mt-24 bg-white px-6 py-24 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Pengalaman
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            Pengalaman pendidikan, pekerjaan, organisasi, maupun
            kegiatan lainnya.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Memuat experience...
          </p>
        )}

        {/* Empty */}
        {!loading && experiences.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada experience yang ditambahkan.
            </p>
          </div>
        )}

        {/* Timeline */}
        {!loading && experiences.length > 0 && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-3 top-0 hidden h-full w-px bg-gray-200 dark:bg-gray-800 md:block" />

            <div className="space-y-10">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="relative md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 hidden h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-gray-900 dark:border-gray-950 dark:bg-white md:flex" />

                  {/* Card */}
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {experience.position || "Position"}
                        </h3>

                        <p className="mt-1 font-medium text-gray-600 dark:text-gray-400">
                          {experience.company || "Company"}
                        </p>

                        {experience.location && (
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                            {experience.location}
                          </p>
                        )}
                      </div>

                      {/* Period */}
                      <div className="shrink-0">
                        <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:ring-gray-700">
                          {experience.startDate || "-"}
                          {" — "}
                          {experience.isCurrent
                            ? "Sekarang"
                            : experience.endDate || "-"}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {experience.description && (
                      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-400">
                        {experience.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}