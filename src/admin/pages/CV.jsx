import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../../lib/firebase"
import { uploadToCloudinary } from "../../lib/cloudinary"

function CV() {
  const [cvList, setCvList] = useState([])

  const [formData, setFormData] = useState({
    title: "",
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadCV()
  }, [])

  const loadCV = async () => {
    try {
      setLoading(true)
      setError("")

      const cvRef = collection(db, "cv")
      const snapshot = await getDocs(cvRef)

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      setCvList(data)
    } catch (err) {
      console.error(err)
      setError("Gagal mengambil data CV.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      title: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    if (file.type !== "application/pdf") {
      setError("File CV harus berupa PDF.")
      setSelectedFile(null)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file maksimal 10 MB.")
      setSelectedFile(null)
      return
    }

    setError("")
    setSelectedFile(file)
  }

  const resetForm = () => {
    setFormData({
      title: "",
    })

    setSelectedFile(null)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      setError("Judul CV wajib diisi.")
      return
    }

    if (!editingId && !selectedFile) {
      setError("Pilih file PDF terlebih dahulu.")
      return
    }

    try {
      setSaving(true)
      setError("")
      setMessage("")

      let fileUrl = ""
      let fileName = ""

      // Upload PDF baru ke Cloudinary
      if (selectedFile) {
        const uploadResult = await uploadToCloudinary(
          selectedFile,
          "portfolio/cv"
        )

        fileUrl = uploadResult.url
        fileName = selectedFile.name
      }

      if (editingId) {
        const existingCV = cvList.find(
          (item) => item.id === editingId
        )

        const data = {
          title: formData.title.trim(),
          fileUrl: fileUrl || existingCV?.fileUrl || "",
          fileName:
            fileName || existingCV?.fileName || "",
          isActive: true,
          updatedAt: serverTimestamp(),
        }

        await updateDoc(
          doc(db, "cv", editingId),
          data
        )

        setMessage("CV berhasil diperbarui.")
      } else {
        await addDoc(collection(db, "cv"), {
          title: formData.title.trim(),
          fileUrl,
          fileName,
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })

        setMessage("CV berhasil ditambahkan.")
      }

      resetForm()
      await loadCV()
    } catch (err) {
      console.error(err)
      setError(
        err.message || "Gagal menyimpan CV."
      )
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (cv) => {
    setEditingId(cv.id)

    setFormData({
      title: cv.title || "",
    })

    setSelectedFile(null)

    setMessage("")
    setError("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus CV ini?"
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(id)
      setError("")
      setMessage("")

      await deleteDoc(
        doc(db, "cv", id)
      )

      setCvList((prev) =>
        prev.filter((item) => item.id !== id)
      )

      if (editingId === id) {
        resetForm()
      }

      setMessage("CV berhasil dihapus.")
    } catch (err) {
      console.error(err)
      setError(
        err.message || "Gagal menghapus CV."
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-gray-500">
          Management
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          CV
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola Curriculum Vitae yang ditampilkan pada portfolio.
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4">
          <p className="text-sm font-medium text-green-700">
            {message}
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Form */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between gap-4">

          <div>
            <h2 className="text-lg font-semibold">
              {editingId
                ? "Edit CV"
                : "Upload CV"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingId
                ? "Perbarui judul atau ganti file CV."
                : "Upload CV dalam format PDF."}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Batal Edit
            </button>
          )}

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Judul CV
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: CV Andika Rizki Febrian"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              required
            />
          </div>

          {/* File */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              File CV
            </label>

            <p className="mb-4 text-sm text-gray-500">
              Format PDF dengan ukuran maksimal 10 MB.
            </p>

            <label
              htmlFor="cvFile"
              className="inline-block cursor-pointer rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Pilih File PDF
            </label>

            <input
              id="cvFile"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile && (
              <div className="mt-4 rounded-xl bg-gray-50 p-4">

                <p className="text-sm font-medium">
                  File dipilih
                </p>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>
            )}

          </div>

          {/* Submit */}
          <div className="flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gray-900 px-7 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Mengupload..."
                : editingId
                  ? "Update CV"
                  : "Upload CV"}
            </button>

          </div>

        </form>

      </section>

      {/* CV List */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold">
            Daftar CV
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {cvList.length} CV tersedia.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              Memuat CV...
            </p>
          </div>
        ) : cvList.length === 0 ? (
          <div className="mt-6 rounded-xl bg-gray-50 px-6 py-12 text-center">

            <p className="font-medium text-gray-600">
              Belum ada CV.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Upload CV menggunakan form di atas.
            </p>

          </div>
        ) : (
          <div className="mt-6 space-y-4">

            {cvList.map((cv) => (
              <div
                key={cv.id}
                className="flex flex-col gap-5 rounded-xl border border-gray-200 p-5 md:flex-row md:items-center md:justify-between"
              >

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-lg font-semibold">
                      {cv.title}
                    </h3>

                    {cv.isActive && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Aktif
                      </span>
                    )}

                  </div>

                  <p className="mt-2 break-all text-sm text-gray-500">
                    {cv.fileName || "File tidak diketahui"}
                  </p>

                </div>

                <div className="flex shrink-0 flex-wrap gap-2">

                  {cv.fileUrl && (
                    <a
                      href={cv.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                    >
                      Lihat PDF
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleEdit(cv)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(cv.id)}
                    disabled={deletingId === cv.id}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === cv.id
                      ? "..."
                      : "Hapus"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  )
}

export default CV