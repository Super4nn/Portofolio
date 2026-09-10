import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function PublicLayout() {
  return (
    <div className="min-h-screen scroll-smooth bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}