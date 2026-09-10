import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export default function CV() {
  const [cv, setCv] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const cvRef = collection(db, "cv")
        const cvQuery = query(cvRef, where("isActive", "==", true))
        const snapshot = await getDocs(cvQuery)

        if (!snapshot.empty) {
          const document = snapshot.docs[0]
          setCv({
            id: document.id,
            ...document.data(),
          })
        }
      } catch (error) {
        console.error("Gagal mengambil CV:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCV()
  }, [])

  return (
    <section
      id="cv"
      className="scroll-mt-24 px-6 py-20 sm:px-8 lg:py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="editorial-rule mb-16" />

        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
              05 // CURRICULUM VITAE
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Curriculum Vitae
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
            Dokumen riwayat hidup resmi yang merangkum latar belakang pendidikan, perjalanan karier, dan kualifikasi teknis.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)] animate-pulse">
              Memuat data CV...
            </span>
          </div>
        )}

        {/* CV Available: Minimal Inline Action Banner */}
        {!loading && cv && cv.fileUrl && (
          <div className="rounded-[6px] border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all duration-300 hover:border-[var(--border-strong)]">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  {cv.title || "Curriculum Vitae Lengkap"}
                </h3>
              </div>

              <p className="font-mono text-xs text-[var(--text-tertiary)] pl-5">
                {cv.fileName ? cv.fileName : "PDF Document · Terverifikasi"}
              </p>
            </div>

            {/* Editorial Action Links */}
            <div className="flex items-center gap-5 sm:gap-6 pl-5 sm:pl-0 font-mono text-xs">
              <a
                href={cv.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-medium underline-offset-4 hover:underline"
              >
                Lihat CV
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={cv.fileUrl}
                download={cv.fileName || "CV-Andika-Rizki-Febrian.pdf"}
                className="inline-flex items-center gap-1.5 rounded-[4px] border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
              >
                Download CV
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        )}

        {/* Empty State: CV Not Available */}
        {!loading && (!cv || !cv.fileUrl) && (
          <div className="rounded-[6px] border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-8 sm:p-10 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
              Dokumen CV sedang diperbarui dan akan segera tersedia.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}