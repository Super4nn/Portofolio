import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../lib/firebase"

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Tunggu Firebase mengecek status login
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />

          <p className="mt-4 text-sm text-gray-500">
            Memeriksa autentikasi...
          </p>
        </div>
      </div>
    )
  }

  // Jika belum login, arahkan ke Login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Jika sudah login, tampilkan halaman admin
  return children
}

export default ProtectedRoute