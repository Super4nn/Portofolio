import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function PublicLayout() {
  return (
    <div className="min-h-screen scroll-smooth bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}