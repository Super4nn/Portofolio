import { useEffect, useState } from "react"
import { getProfile } from "../lib/profile"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Projects from "./Projects"
import CV from "./CV"
import Contact from "./Contact"

export default function Home() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (error) {
        console.error("Gagal mengambil profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <main
        id="home"
        className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Memuat portfolio...
        </p>
      </main>
    )
  }

  return (
    <main className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* =========================
          HERO
      ========================== */}
      <section
        id="home"
        className="flex min-h-screen scroll-mt-24 items-center justify-center px-4 pt-24 sm:px-6 sm:pt-20"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:gap-14">
          {/* Profile Image */}
          {profile?.profileImageUrl && (
            <div className="animate-fade-up shrink-0">
              <img
                src={profile.profileImageUrl}
                alt={profile.name || "Profile"}
                className="h-40 w-40 rounded-full object-cover ring-4 ring-gray-100 dark:ring-gray-800 md:h-64 md:w-64"
              />
            </div>
          )}

          {/* Hero Content */}
          <div className="animate-fade-up max-w-3xl text-center md:text-left">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Welcome to my portfolio
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {profile?.name || "Portfolio Saya"}
            </h1>

            <p className="mt-5 text-xl text-gray-600 dark:text-gray-400 sm:text-2xl">
              {profile?.headline || "Web Developer & Software Developer"}
            </p>

            {profile?.description && (
              <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400">
                {profile.description}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#projects"
                className="w-full rounded-xl bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-700 sm:w-auto dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Lihat Project
              </a>

              <a
                href="#contact"
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Hubungi Saya
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          ABOUT
      ========================== */}
      <About />

      {/* =========================
          SKILLS
      ========================== */}
      <Skills />

      {/* =========================
          EXPERIENCE
      ========================== */}
      <Experience />

      {/* =========================
          PROJECTS
      ========================== */}
      <Projects />

      {/* =========================
          CV
      ========================== */}
      <CV />

      {/* =========================
          CONTACT
      ========================== */}
      <Contact />
    </main>
  )
}