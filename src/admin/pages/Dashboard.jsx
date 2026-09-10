import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    messages: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        const [
          projectsSnapshot,
          skillsSnapshot,
          experiencesSnapshot,
          messagesSnapshot,
        ] = await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "skills")),
          getDocs(collection(db, "experiences")),
          getDocs(collection(db, "messages")),
        ])

        setStats({
          projects: projectsSnapshot.size,
          skills: skillsSnapshot.size,
          experiences: experiencesSnapshot.size,
          messages: messagesSnapshot.size,
        })
      } catch (error) {
        console.error("Gagal mengambil statistik:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Projects",
      value: stats.projects,
      description: "Total project portfolio",
      icon: "📁",
      link: "/admin/projects",
    },
    {
      title: "Skills",
      value: stats.skills,
      description: "Total skill",
      icon: "⚡",
      link: "/admin/skills",
    },
    {
      title: "Experience",
      value: stats.experiences,
      description: "Total pengalaman",
      icon: "💼",
      link: "/admin/experience",
    },
    {
      title: "Messages",
      value: stats.messages,
      description: "Pesan dari pengunjung",
      icon: "💬",
      link: "/admin/messages",
    },
  ]

  const quickActions = [
    {
      title: "Profile",
      description: "Kelola informasi profile",
      icon: "👤",
      link: "/admin/profile",
    },
    {
      title: "Skills",
      description: "Kelola skill",
      icon: "⚡",
      link: "/admin/skills",
    },
    {
      title: "Experience",
      description: "Kelola pengalaman",
      icon: "💼",
      link: "/admin/experience",
    },
    {
      title: "Projects",
      description: "Kelola project",
      icon: "📁",
      link: "/admin/projects",
    },
    {
      title: "CV",
      description: "Kelola CV",
      icon: "📄",
      link: "/admin/cv",
    },
    {
      title: "Messages",
      description: "Lihat pesan pengunjung",
      icon: "💬",
      link: "/admin/messages",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ringkasan data portfolio Anda.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {loading ? "..." : card.value}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {card.description}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl transition group-hover:scale-110 dark:bg-gray-800">
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Kelola Portfolio
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Akses cepat untuk mengelola konten portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl dark:bg-gray-800">
                  {action.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Welcome */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Selamat Datang di Admin Dashboard
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Kelola seluruh informasi portfolio Anda melalui menu yang
          tersedia. Data yang ditambahkan melalui dashboard akan
          tersimpan di Firebase Firestore.
        </p>
      </div>
    </div>
  )
}