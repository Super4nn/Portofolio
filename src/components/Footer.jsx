import { useEffect, useState } from "react"
import { getProfile } from "../lib/profile"

export default function Footer() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        if (data) {
          setProfile(data)
        }
      } catch (error) {
        console.error("Gagal mengambil profile di footer:", error)
      }
    }

    fetchProfile()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Identity */}
          <div className="space-y-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {profile?.name || "Andika Rizki Febrian"}
            </h3>
            <p className="font-mono text-xs text-[var(--text-tertiary)]">
              {profile?.role || profile?.headline || "Web & Software Developer"}
            </p>
          </div>

          {/* Social Links (Inline Editorial dot-separated) */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-secondary)]">
            {profile?.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)] transition-colors underline-offset-4 hover:underline"
              >
                GitHub ↗
              </a>
            )}

            {profile?.githubUrl && (profile?.linkedinUrl || profile?.instagramUrl) && (
              <span className="text-[var(--border-strong)]" aria-hidden="true">·</span>
            )}

            {profile?.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)] transition-colors underline-offset-4 hover:underline"
              >
                LinkedIn ↗
              </a>
            )}

            {profile?.linkedinUrl && profile?.instagramUrl && (
              <span className="text-[var(--border-strong)]" aria-hidden="true">·</span>
            )}

            {profile?.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)] transition-colors underline-offset-4 hover:underline"
              >
                Instagram ↗
              </a>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col gap-3 text-xs font-mono text-[var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {profile?.name || "Andika Rizki Febrian"}. All rights reserved.
          </p>

          <a
            href="#home"
            className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Kembali ke atas</span>
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}