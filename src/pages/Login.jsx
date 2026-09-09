import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../lib/firebase"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate("/admin")

    } catch (error) {
      console.error(error)

      setError("Email atau password salah.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Portfolio Admin
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Login Admin
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Masuk untuk mengelola portfolio
          </p>

        </div>


        {/* Login Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />

            </div>


            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />

            </div>


            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Login"}
            </button>

          </form>

        </div>


        {/* Back */}
        <div className="mt-6 text-center">

          <a
            href="/"
            className="text-sm text-gray-500 transition hover:text-gray-900"
          >
            ← Kembali ke Portfolio
          </a>

        </div>

      </div>

    </div>
  )
}

export default Login