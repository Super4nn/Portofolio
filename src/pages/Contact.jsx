import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import { getProfile } from "../lib/profile"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [profile, setProfile] = useState(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile()
        if (data) {
          setProfile(data)
        }
      } catch (err) {
        console.error("Gagal mengambil data profil untuk contact:", err)
      }
    }
    fetchProfileData()
  }, [])

  const contactEmail = profile?.email || "andikarizkifebrian@gmail.com"

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error("Gagal menyalin email:", err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess("")
    setError("")

    if (!form.name.trim()) {
      setError("Nama lengkap wajib diisi.")
      return
    }

    if (!form.email.trim()) {
      setError("Alamat email wajib diisi.")
      return
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Format alamat email tidak valid.")
      return
    }

    if (!form.message.trim()) {
      setError("Pesan tidak boleh kosong.")
      return
    }

    try {
      setLoading(true)

      await addDoc(collection(db, "messages"), {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        isRead: false,
        createdAt: serverTimestamp(),
      })

      setForm({
        name: "",
        email: "",
        message: "",
      })

      setSuccess("Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya, saya akan segera merespons.")
    } catch (err) {
      console.error("Gagal mengirim pesan:", err)
      setError("Pesan gagal dikirim karena kendala jaringan. Anda dapat langsung mengirim email ke alamat di samping.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 px-6 py-20 sm:px-8 lg:py-28 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="editorial-rule mb-16" />

        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
            06 // CONTACT
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Hubungi Saya
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[var(--text-secondary)]">
            Punya ide proyek baru, tawaran kerja sama, atau sekadar ingin bertukar pikiran seputar pengembangan software? Pintu komunikasi selalu terbuka.
          </p>
        </div>

        {/* 2-Column Split: Contact Info (Left) + Form (Right) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 p-6 sm:p-7 transition-all duration-300 hover:border-[var(--border-strong)]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                  Direct Email
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Aktif & Terbuka
                </span>
              </div>

              <a
                href={`mailto:${contactEmail}`}
                className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors break-all"
              >
                {contactEmail}
              </a>

              <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                Kirim pesan langsung melalui email klien Anda untuk komunikasi cepat.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2 font-mono text-xs text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--accent)] active:scale-95"
                >
                  <span>{copied ? "✓ Disalin!" : "Salin Email"}</span>
                </button>

                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2 font-mono text-xs text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                >
                  <span>Buka Mail</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 p-6 sm:p-7 transition-all duration-300 hover:border-[var(--border-strong)]">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] mb-3">
                Sosial & Repositori
              </p>
              <p className="text-xs text-[var(--text-secondary)] mb-5">
                Kunjungi profil profesional dan portofolio kode saya:
              </p>

              <div className="flex flex-wrap gap-2.5">
                {profile?.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                  >
                    GitHub ↗
                  </a>
                )}

                {profile?.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                  >
                    LinkedIn ↗
                  </a>
                )}

                {profile?.instagramUrl && (
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                  >
                    Instagram ↗
                  </a>
                )}
              </div>
            </div>

            {/* Availability / Note */}
            <div className="rounded-xl border border-dashed border-[var(--border)] p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                Lokasi & Zona Waktu
              </p>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Indonesia (WIB / UTC+7) · Siap Remote & Hybrid
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Message Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm p-7 sm:p-9 transition-all duration-300 shadow-sm">
              <div className="mb-8">
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  Kirim Pesan Langsung
                </h3>
                <p className="mt-1 font-sans text-xs sm:text-sm text-[var(--text-secondary)]">
                  Isi formulir di bawah ini dan pesan akan langsung terkirim ke sistem saya.
                </p>
              </div>

              {/* Feedback Notifications */}
              {success && (
                <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  {success}
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-mono text-rose-600 dark:text-rose-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs Grid: Name + Email */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
                    >
                      Nama Lengkap <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama Anda"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]/70 transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
                    >
                      Alamat Email <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="nama@domain.com"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]/70 transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
                  >
                    Pesan <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tuliskan ide proyek, penawaran, atau pertanyaan Anda di sini..."
                    className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]/70 transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[var(--text-primary)] py-3.5 px-6 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--bg-primary)] transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>Mengirim Pesan...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Pesan Sekarang</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}