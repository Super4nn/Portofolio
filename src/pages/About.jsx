import { useEffect, useState } from "react"
import { getProfile } from "../lib/profile"

export default function About({ profile: initialProfile }) {
  const [profile, setProfile] = useState(initialProfile || null)
  const [loading, setLoading] = useState(!initialProfile)

  useEffect(() => {
    // If profile was already passed as prop, use it directly
    if (initialProfile) {
      setProfile(initialProfile)
      setLoading(false)
      return
    }

    // Otherwise fetch from Firestore (preserves standalone usage)
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
  }, [initialProfile])

  return (
    <section
      id="about"
      className="scroll-mt-24 px-6 py-20 sm:px-8 lg:py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="editorial-rule mb-16" />

        {/* Loading State */}
        {loading && (
          <div className="py-12 font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
            Memuat informasi profil...
          </div>
        )}

        {/* Content */}
        {!loading && profile && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Index, Section Title & Meta Specs */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                    01 // ABOUT
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                    Background & Narrative
                  </h2>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {profile.headline || "Web Developer & Software Developer"}
                </p>

                {/* Metadata Specs Table */}
                <div className="border-t border-[var(--border-subtle)] pt-6 space-y-4">
                  {profile.email && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Inquiries & Contact
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="mt-1 block font-mono text-xs text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      Location & Availability
                    </p>
                    <p className="mt-1 font-mono text-xs text-[var(--text-secondary)]">
                      Indonesia — Available for Remote Roles
                    </p>
                  </div>

                  {/* Connect / Socials */}
                  {(profile.githubUrl || profile.linkedinUrl || profile.instagramUrl) && (
                    <div className="pt-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] mb-2">
                        Online Profiles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.githubUrl && (
                          <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                          >
                            <span>GitHub</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        )}

                        {profile.linkedinUrl && (
                          <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                          >
                            <span>LinkedIn</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        )}

                        {profile.instagramUrl && (
                          <a
                            href={profile.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                          >
                            <span>Instagram</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Prose */}
            <div className="lg:col-span-8 lg:pl-6 space-y-8">
              {profile.bio && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] mb-3">
                    Personal Statement
                  </p>
                  <p className="font-sans text-xl sm:text-2xl leading-relaxed text-[var(--text-primary)] font-normal">
                    {profile.bio}
                  </p>
                </div>
              )}

              {profile.description && (
                <div className="border-t border-[var(--border-subtle)] pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] mb-3">
                    Overview & Approach
                  </p>
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed text-[var(--text-secondary)] whitespace-pre-line">
                    {profile.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Data Fallback */}
        {!loading && !profile && (
          <p className="font-mono text-xs text-[var(--text-muted)]">
            Data profile belum tersedia.
          </p>
        )}
      </div>
    </section>
  )
}