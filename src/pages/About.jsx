import { useEffect, useState } from "react"
import { getProfile } from "../lib/profile"

export default function About() {
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

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white px-6 py-24 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            About Me
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Tentang Saya
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Memuat informasi...
          </div>
        )}

        {/* Content */}
        {!loading && profile && (
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Image */}
            {profile.profileImageUrl && (
              <div className="flex justify-center md:justify-start">
                <img
                  src={profile.profileImageUrl}
                  alt={profile.name || "Profile"}
                  className="h-72 w-72 rounded-2xl object-cover shadow-lg ring-1 ring-gray-200 dark:ring-gray-800"
                />
              </div>
            )}

            {/* Text */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {profile.name}
              </h3>

              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {profile.headline}
              </p>

              {profile.bio && (
                <p className="mt-6 whitespace-pre-line text-base leading-8 text-gray-600 dark:text-gray-400">
                  {profile.bio}
                </p>
              )}

              {profile.description && (
                <p className="mt-4 whitespace-pre-line text-base leading-8 text-gray-600 dark:text-gray-400">
                  {profile.description}
                </p>
              )}

              {profile.email && (
                <div className="mt-6">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Email
                  </p>

                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-1 inline-block font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    {profile.email}
                  </a>
                </div>
              )}

              {/* Social Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    GitHub
                  </a>
                )}

                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    LinkedIn
                  </a>
                )}

                {profile.instagramUrl && (
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* No Data */}
        {!loading && !profile && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Data profile belum tersedia.
          </p>
        )}
      </div>
    </section>
  )
}