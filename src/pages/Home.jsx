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
        className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]"
      >
        <p className="font-mono text-xs tracking-wider uppercase text-[var(--text-muted)]">
          Memuat portfolio...
        </p>
      </main>
    )
  }

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* =========================
          HERO SECTION
      ========================== */}
      <section
        id="home"
        className="relative flex min-h-[90vh] items-center px-6 pt-32 pb-20 sm:px-8 lg:pt-36 lg:pb-28"
      >
        <div className="mx-auto max-w-6xl w-full">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Headline, Bio & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Title & Name */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05]">
                  {profile?.name || "Andika Rizki Febrian"}
                </h1>
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--text-secondary)] font-medium">
                  Software & Web Developer
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-[4px] border border-[var(--border-strong)] bg-transparent px-6 py-3 text-sm font-sans font-medium text-[var(--text-primary)] transition duration-200 hover:bg-[var(--bg-secondary)] active:scale-[0.98]"
                >
                  Lihat Project
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-[4px] border border-[var(--border-strong)] bg-transparent px-6 py-3 text-sm font-sans font-medium text-[var(--text-primary)] transition duration-200 hover:bg-[var(--bg-secondary)] active:scale-[0.98]"
                >
                  Hubungi Saya
                </a>
              </div>

              {/* Quick Meta Socials — Bordered Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-3">
                {profile?.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-secondary)] px-3.5 py-1.5 text-xs font-sans font-medium text-[var(--text-secondary)] transition duration-200 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {profile?.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-secondary)] px-3.5 py-1.5 text-xs font-sans font-medium text-[var(--text-secondary)] transition duration-200 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--bg-secondary)] px-3.5 py-1.5 text-xs font-sans font-medium text-[var(--text-secondary)] transition duration-200 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    Email
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Editorial Portrait Crop */}
            {profile?.profileImageUrl && (
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm">
                  {/* Image Frame */}
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] shadow-sm">
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.name || "Profile"}
                      className="h-full w-full object-cover grayscale-[10%] contrast-[1.03] transition duration-500 hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          ABOUT (EXTENDED INTRODUCTION)
      ========================== */}
      <About profile={profile} />

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