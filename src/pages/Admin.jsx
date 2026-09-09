import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../lib/firebase"

function Admin() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)

    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">

        <div className="flex items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Portfolio Admin
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Logout
          </button>

        </div>

      </header>


      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-8">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Dashboard
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Selamat Datang, Admin 👋
          </h2>

          <p className="mt-2 text-gray-500">
            Kelola seluruh konten portfolio kamu dari sini.
          </p>

        </div>


        {/* Statistics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Projects
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Skills
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Experience
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Messages
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>

        </div>


        {/* Management */}
        <div className="mt-10">

          <h3 className="text-xl font-bold">
            Management
          </h3>

          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h4 className="font-semibold">
                Projects
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Kelola project portfolio.
              </p>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h4 className="font-semibold">
                Skills
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Kelola skill dan teknologi.
              </p>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h4 className="font-semibold">
                Experience
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Kelola pengalaman kerja.
              </p>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h4 className="font-semibold">
                Profile
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Kelola informasi profil.
              </p>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h4 className="font-semibold">
                CV
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Kelola file CV.
              </p>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h4 className="font-semibold">
                Messages
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Lihat pesan dari pengunjung.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Admin