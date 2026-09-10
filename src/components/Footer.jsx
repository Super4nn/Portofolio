import { useEffect, useState } from "react"
import { getProfile } from "../lib/profile"

export default function Footer() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (error) {
        console.error("Gagal mengambil profile:", error)
      }
    }

    fetchProfile()
  }, [])

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "CV", href: "#cv" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Profile */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {profile?.name || "Portfolio"}
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              {profile?.headline ||
                "Web Developer & Software Developer"}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
              Navigasi
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
              Social Media
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {profile?.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  GitHub
                </a>
              )}

              {profile?.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  LinkedIn
                </a>
              )}

              {profile?.instagramUrl && (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()}{" "}
              {profile?.name || "Portfolio"}. All rights reserved.
            </p>

            <a
              href="#home"
              className="transition hover:text-gray-900 dark:hover:text-white"
            >
              Kembali ke atas ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}