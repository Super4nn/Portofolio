import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase"

function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Logout gagal:", error)
    }
  }

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
    },
    {
      label: "Profile",
      path: "/admin/profile",
    },
    {
      label: "Skills",
      path: "/admin/skills",
    },
    {
      label: "Experience",
      path: "/admin/experience",
    },
    {
      label: "Projects",
      path: "/admin/projects",
    },
    {
      label: "CV",
      path: "/admin/cv",
    },
    {
      label: "Messages",
      path: "/admin/messages",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

        {/* Logo */}
        <div className="flex h-20 items-center border-b border-gray-200 px-6">
          <div>
            <h1 className="text-xl font-bold">
              Portfolio
            </h1>

            <p className="text-xs text-gray-500">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">

          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-8 backdrop-blur">

          <div>
            <h2 className="text-lg font-semibold">
              Admin Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Kelola portfolio Anda
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
              A
            </div>

          </div>

        </header>

        {/* Page */}
        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AdminLayout