function Dashboard() {
  const stats = [
    {
      title: "Projects",
      value: "1",
      description: "Total project",
    },
    {
      title: "Skills",
      value: "1",
      description: "Total skill",
    },
    {
      title: "Experience",
      value: "1",
      description: "Total experience",
    },
    {
      title: "Messages",
      value: "0",
      description: "Pesan belum dibaca",
    },
  ]

  const management = [
    {
      title: "Profile",
      description: "Kelola informasi profile dan sosial media.",
      path: "/admin/profile",
    },
    {
      title: "Skills",
      description: "Kelola daftar skill dan tingkat kemampuan.",
      path: "/admin/skills",
    },
    {
      title: "Experience",
      description: "Kelola pengalaman pendidikan dan pekerjaan.",
      path: "/admin/experience",
    },
    {
      title: "Projects",
      description: "Kelola project portfolio.",
      path: "/admin/projects",
    },
    {
      title: "CV",
      description: "Kelola file Curriculum Vitae.",
      path: "/admin/cv",
    },
    {
      title: "Messages",
      description: "Lihat pesan dari pengunjung.",
      path: "/admin/messages",
    },
  ]

  return (
    <div className="space-y-8">

      {/* Page Title */}
      <div>
        <p className="text-sm font-medium text-gray-500">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Selamat datang di dashboard portfolio Anda.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>

            <p className="mt-3 text-3xl font-bold">
              {stat.value}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}

      </div>

      {/* Management */}
      <div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Portfolio Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Kelola seluruh data portfolio Anda.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {management.map((item) => (
            <a
              key={item.title}
              href={item.path}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-900">
                  →
                </span>

              </div>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {item.description}
              </p>

            </a>
          ))}

        </div>

      </div>

      {/* Quick Info */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold">
          Status Sistem
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Authentication
            </p>

            <p className="mt-1 font-semibold text-green-600">
              Connected
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Firestore
            </p>

            <p className="mt-1 font-semibold text-green-600">
              Connected
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Cloudinary
            </p>

            <p className="mt-1 font-semibold text-green-600">
              Connected
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard