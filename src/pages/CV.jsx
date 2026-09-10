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
      className="scroll-mt-24 bg-white px-6 py-24 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Curriculum Vitae
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            CV Saya
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            Lihat atau download curriculum vitae saya untuk mengetahui
            informasi lebih lengkap mengenai pengalaman dan kemampuan.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Memuat CV...
          </div>
        )}

        {/* CV */}
        {!loading && cv && cv.fileUrl && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm dark:bg-gray-950">
              📄
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
              {cv.title || "Curriculum Vitae"}
            </h3>

            {cv.fileName && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {cv.fileName}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={cv.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Lihat CV
              </a>

              <a
                href={cv.fileUrl}
                download
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Download CV
              </a>
            </div>
          </div>
        )}

        {/* No CV */}
        {!loading && (!cv || !cv.fileUrl) && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="text-4xl">📄</div>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              CV belum tersedia.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}