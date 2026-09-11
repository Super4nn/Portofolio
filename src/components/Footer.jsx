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
    <footer
      className="
        border-t
        border-[var(--border)]
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
        transition-colors
        duration-300
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-6
          py-12
          sm:px-8
        "
      >
        {/* =========================================================
            MAIN FOOTER ROW
        ========================================================== */}
        <div
          className="
            flex
            flex-col
            gap-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* =======================================================
              IDENTITY
          ======================================================== */}
          <div className="space-y-1">
            <h3
              className="
                font-display
                text-xl
                font-bold
                tracking-tight
                text-[var(--text-primary)]
                sm:text-2xl
              "
            >
              {profile?.name || "Andika Rizki Febrian"}
            </h3>

            <p
              className="
                font-mono
                text-xs
                text-[var(--text-tertiary)]
              "
            >
              {profile?.role ||
                profile?.headline ||
                "Web & Software Developer"}
            </p>
          </div>

          {/* =======================================================
              SOCIAL LINKS
          ======================================================== */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
              font-mono
              text-xs
              text-[var(--text-secondary)]
            "
          >
            {profile?.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  transition-colors
                  hover:text-[var(--accent)]
                  hover:underline
                  underline-offset-4
                "
              >
                GitHub
              </a>
            )}

            {profile?.githubUrl &&
              (profile?.linkedinUrl || profile?.instagramUrl) && (
                <span
                  className="text-[var(--text-secondary)]"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}

            {profile?.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  transition-colors
                  hover:text-[var(--accent)]
                  hover:underline
                  underline-offset-4
                "
              >
                LinkedIn
              </a>
            )}

            {profile?.linkedinUrl && profile?.instagramUrl && (
              <span
                className="text-[var(--text-secondary)]"
                aria-hidden="true"
              >
                ·
              </span>
            )}

            {profile?.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  transition-colors
                  hover:text-[var(--accent)]
                  hover:underline
                  underline-offset-4
                "
              >
                Instagram
              </a>
            )}
          </div>
        </div>

        {/* =========================================================
            BOTTOM STRIP
        ========================================================== */}
        <div
          className="
            mt-10
            border-t
            border-[var(--border)]
            pt-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              font-mono
              text-xs
              text-[var(--text-tertiary)]
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* =====================================================
                COPYRIGHT
            ====================================================== */}
            <p>
              © {currentYear}{" "}
              {profile?.name || "Andika Rizki Febrian"}. All rights
              reserved.
            </p>

            {/* =====================================================
                BACK TO TOP
            ====================================================== */}
            <a
              href="#home"
              className="
                inline-flex
                items-center
                self-start
                transition-colors
                hover:text-[var(--text-primary)]
                sm:self-auto
              "
            >
              Kembali ke atas
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}