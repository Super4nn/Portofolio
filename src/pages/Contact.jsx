import { useState } from "react"
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

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
      setError("Nama wajib diisi.")
      return
    }

    if (!form.email.trim()) {
      setError("Email wajib diisi.")
      return
    }

    if (!form.message.trim()) {
      setError("Pesan wajib diisi.")
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

      setSuccess(
        "Pesan berhasil dikirim. Terima kasih sudah menghubungi saya!"
      )
    } catch (error) {
      console.error("Gagal mengirim pesan:", error)
      setError(
        "Pesan gagal dikirim. Silakan coba lagi."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-gray-50 px-6 py-24 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Hubungi Saya
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            Punya pertanyaan, project, atau ingin berdiskusi?
            Silakan kirim pesan melalui form berikut.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Mari Terhubung
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 dark:text-gray-400">
              Saya terbuka untuk berdiskusi mengenai project,
              pengembangan website, aplikasi, maupun peluang
              kolaborasi.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <a
                  href="mailto:andikarizkifebrian@gmail.com"
                  className="mt-1 inline-block text-sm font-medium text-gray-900 hover:underline dark:text-white"
                >
                  andikarizkifebrian@gmail.com
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/Super4nn"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  GitHub
                </a>

                <a
                  href="#"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-950 sm:p-8">
            {/* Success */}
            {success && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400">
                {success}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nama
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-800"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-800"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Pesan
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tulis pesan Anda..."
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-800"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}