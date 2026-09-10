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
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/70 px-3.5 py-1 text-xs font-mono text-[var(--text-secondary)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Available for new projects & roles</span>
              </div>

              {/* Title & Name */}
              <div>
                <p className="font-mono text-xs tracking-[0.24em] uppercase text-[var(--accent)] mb-3">
                  Software & Web Developer
                </p>
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05]">
                  {profile?.name || "Andika Rizki Febrian"}
                </h1>
              </div>

              {/* Subtitle / Headline */}
              <p className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-secondary)]">
                {profile?.headline || "Web Developer & Software Developer"}
              </p>

              {/* Editorial Lead Paragraph */}
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                {profile?.description ||
                  "Membangun aplikasi web dan solusi perangkat lunak yang fungsional, performan, dan dirancang dengan perhatian mendalam terhadap detail arsitektur serta pengalaman pengguna."}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--bg-primary)] transition hover:opacity-90"
                >
                  <span>Lihat Project</span>
                  <span className="text-xs">↗</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-secondary)]"
                >
                  <span>Hubungi Saya</span>
                  <span className="text-xs">→</span>
                </a>
              </div>

              {/* Quick Meta Socials */}
              <div className="flex items-center gap-6 pt-4 text-xs font-mono tracking-wider text-[var(--text-muted)]">
                {profile?.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    GITHUB ↗
                  </a>
                )}
                {profile?.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    LINKEDIN ↗
                  </a>
                )}
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    EMAIL ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Editorial Portrait Crop */}
            {profile?.profileImageUrl && (
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-sm">
                  {/* Image Card */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] shadow-sm">
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.name || "Profile"}
                      className="h-full w-full object-cover grayscale-[15%] contrast-[1.04] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Editorial Frame Caption */}
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase text-[var(--text-muted)]">
                    <span>INDONESIA / REMOTE</span>
                    <span>PORTFOLIO 2026</span>
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