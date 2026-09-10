import { useEffect, useState } from "react"
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, "projects")

        const projectsQuery = query(
          projectsRef,
          orderBy("sortOrder", "asc")
        )

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

  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-gray-50 px-6 py-24 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Projects
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Project Saya
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            Beberapa project yang telah saya kerjakan menggunakan
            berbagai teknologi.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Memuat projects...
          </p>
        )}

        {/* Empty */}
        {!loading && projects.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-950">
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada project yang ditambahkan.
            </p>
          </div>
        )}

        {/* Projects */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-950"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title || "Project"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      Tidak ada gambar
                    </div>
                  )}

                  {/* Featured */}
                  {project.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {project.description}
                    </p>
                  )}

                  {/* Technologies */}
                  {project.technologies &&
                    project.technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* Links */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      >
                        Live Demo
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}