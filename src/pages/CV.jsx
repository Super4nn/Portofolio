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

        const cvQuery = query(
          cvRef,
          where("isActive", "==", true)
        )

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
      className="
        scroll-mt-24
        bg-[var(--bg-primary)]
        px-6
        py-20
        text-[var(--text-primary)]
        transition-colors
        duration-300
        sm:px-8
        lg:py-24
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* =========================================================
            SECTION DIVIDER
        ========================================================== */}
        <hr className="editorial-rule mb-16" />

        {/* =========================================================
            SECTION HEADER
        ========================================================== */}
        <div
          className="
            mb-12
            grid
            grid-cols-1
            gap-8
            md:grid-cols-12
            md:items-end
          "
        >
          {/* =======================================================
              LEFT — TITLE
          ======================================================== */}
          <div className="md:col-span-7">
            <p
              className="
                mb-2
                font-mono
                text-xs
                uppercase
                tracking-[0.2em]
                text-[var(--accent)]
              "
            >
              05 CURRICULUM VITAE
            </p>

            <h2
              className="
                font-display
                text-3xl
                font-bold
                tracking-tight
                text-[var(--text-primary)]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Curriculum Vitae
            </h2>
          </div>

          {/* =======================================================
              RIGHT — DESCRIPTION
          ======================================================== */}
          <div
            className="
              md:col-span-5
              md:pl-4
              lg:pl-8
              md:pt-6
              lg:pt-8
            "
          >
            <p
              className="
                max-w-lg
                font-sans
                text-sm
                leading-relaxed
                text-[var(--text-secondary)]
                text-justify
              "
            >
              Dokumen riwayat hidup resmi yang merangkum latar belakang
              pendidikan, perjalanan karier, dan kualifikasi teknis.
            </p>
          </div>
        </div>

        {/* =========================================================
            LOADING STATE
        ========================================================== */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <span
              className="
                animate-pulse
                font-mono
                text-xs
                uppercase
                tracking-widest
                text-[var(--text-tertiary)]
              "
            >
              Memuat data CV...
            </span>
          </div>
        )}

        {/* =========================================================
            CV AVAILABLE
        ========================================================== */}
        {!loading && cv && cv.fileUrl && (
          <div
            className="
              flex
              flex-col
              gap-6
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--bg-secondary)]/30
              p-6
              transition-all
              duration-300
              hover:border-[var(--border-strong)]
              hover:bg-[var(--bg-secondary)]
              sm:p-8
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* =====================================================
                CV INFORMATION
            ====================================================== */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className="
                    inline-block
                    h-2
                    w-2
                    rounded-full
                    bg-[var(--accent)]
                  "
                />

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
                  {cv.title || "Curriculum Vitae Lengkap"}
                </h3>
              </div>

              <p
                className="
                  pl-5
                  font-mono
                  text-xs
                  text-[var(--text-tertiary)]
                "
              >
                {cv.fileName || "PDF Document · Terverifikasi"}
              </p>
            </div>

            {/* =====================================================
                DOWNLOAD BUTTON
            ====================================================== */}
            <div className="shrink-0">
              <a
                href={cv.fileUrl}
                download={
                  cv.fileName ||
                  "CV-Andika-Rizki-Febrian.pdf"
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-[var(--border)]
                  bg-[var(--bg-secondary)]
                  px-5
                  py-2.5
                  font-mono
                  text-xs
                  text-[var(--text-primary)]
                  transition-all
                  duration-200
                  hover:border-[var(--border-strong)]
                  hover:bg-[var(--bg-primary)]
                  hover:text-[var(--accent)]
                "
              >
                Download CV
              </a>
            </div>
          </div>
        )}

        {/* =========================================================
            EMPTY STATE
        ========================================================== */}
        {!loading && (!cv || !cv.fileUrl) && (
          <div
            className="
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--bg-secondary)]/30
              p-8
              text-center
              sm:p-10
            "
          >
            <p
              className="
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-[var(--text-tertiary)]
              "
            >
              Dokumen CV sedang diperbarui dan akan segera tersedia.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}