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

  return (
    <section
      id="skills"
      className="scroll-mt-24 bg-gray-50 px-6 py-24 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Skills
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Keahlian Saya
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            Teknologi dan keahlian yang saya gunakan dalam
            pengembangan website dan aplikasi.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Memuat skills...
          </div>
        )}

        {/* Empty */}
        {!loading && skills.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-950">
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada skill yang ditambahkan.
            </p>
          </div>
        )}

        {/* Skills */}
        {!loading && skills.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-950"
              >
                {/* Icon + Name */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {skill.icon || "⚡"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>

                    {skill.category && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {skill.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Level */}
                {typeof skill.level === "number" && (
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Level
                      </span>

                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-gray-900 transition-all dark:bg-white"
                        style={{
                          width: `${Math.min(
                            Math.max(skill.level, 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}