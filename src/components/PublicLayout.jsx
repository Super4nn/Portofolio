import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen scroll-smooth bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Architectural Guide Rails (Desktop / Tablet) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 mx-auto hidden w-full max-w-6xl border-x border-[var(--rule-color)] md:block"
      />

      <Navbar />

      <main className="relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}