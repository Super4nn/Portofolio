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

function Experience() {
  const [experiences, setExperiences] = useState([])

  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    sortOrder: 1,
  })

  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    try {
      setLoading(true)
      setError("")

      const experiencesRef = collection(db, "experiences")
      const snapshot = await getDocs(experiencesRef)

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      data.sort(
        (a, b) =>
          Number(a.sortOrder || 0) - Number(b.sortOrder || 0)
      )

      setExperiences(data)
    } catch (err) {
      console.error(err)
      setError("Gagal mengambil data experience.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "sortOrder"
            ? Number(value)
            : value,
    }))
  }

  const resetForm = () => {
    setFormData({
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      sortOrder: experiences.length + 1,
    })

    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.position.trim()) {
      setError("Position wajib diisi.")
      return
    }

    if (!formData.company.trim()) {
      setError("Company wajib diisi.")
      return
    }

    if (!formData.startDate.trim()) {
      setError("Start Date wajib diisi.")
      return
    }

    if (!formData.isCurrent && !formData.endDate.trim()) {
      setError(
        "End Date wajib diisi jika experience sudah selesai."
      )
      return
    }

    try {
      setSaving(true)
      setError("")
      setMessage("")

      const data = {
        position: formData.position.trim(),
        company: formData.company.trim(),
        location: formData.location.trim(),
        startDate: formData.startDate.trim(),
        endDate: formData.isCurrent
          ? ""
          : formData.endDate.trim(),
        isCurrent: Boolean(formData.isCurrent),
        description: formData.description.trim(),
        sortOrder: Number(formData.sortOrder),
        updatedAt: serverTimestamp(),
      }

      if (editingId) {
        const experienceRef = doc(
          db,
          "experiences",
          editingId
        )

        await updateDoc(experienceRef, data)

        setMessage("Experience berhasil diperbarui.")
      } else {
        await addDoc(collection(db, "experiences"), {
          ...data,
          createdAt: serverTimestamp(),
        })

        setMessage("Experience berhasil ditambahkan.")
      }

      resetForm()
      await loadExperiences()
    } catch (err) {
      console.error(err)
      setError(
        err.message || "Gagal menyimpan experience."
      )
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (experience) => {
    setEditingId(experience.id)

    setFormData({
      position: experience.position || "",
      company: experience.company || "",
      location: experience.location || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      isCurrent: Boolean(experience.isCurrent),
      description: experience.description || "",
      sortOrder: Number(experience.sortOrder || 1),
    })

    setMessage("")
    setError("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus experience ini?"
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(id)
      setError("")
      setMessage("")

      await deleteDoc(
        doc(db, "experiences", id)
      )

      setExperiences((prev) =>
        prev.filter(
          (experience) => experience.id !== id
        )
      )

      if (editingId === id) {
        resetForm()
      }

      setMessage("Experience berhasil dihapus.")
    } catch (err) {
      console.error(err)
      setError(
        err.message || "Gagal menghapus experience."
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-gray-500">
          Management
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Experience
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola pengalaman pendidikan, pekerjaan,
          organisasi, atau pengalaman lainnya.
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
                ? "Edit Experience"
                : "Tambah Experience"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingId
                ? "Perbarui informasi experience."
                : "Tambahkan pengalaman baru ke portfolio."}
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

          {/* Position & Company */}
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Position
              </label>

              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Contoh: Mahasiswa"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Company / Institution
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Contoh: Institut Teknologi Nasional Malang"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
                required
              />
            </div>

          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Contoh: Malang, Indonesia"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          {/* Date */}
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Start Date
              </label>

              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Contoh: 2023"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                End Date
              </label>

              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.isCurrent}
                placeholder={
                  formData.isCurrent
                    ? "Sekarang"
                    : "Contoh: 2025"
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-gray-500"
              />

              {formData.isCurrent && (
                <p className="mt-2 text-xs text-gray-400">
                  Experience masih berlangsung.
                </p>
              )}
            </div>

          </div>

          {/* Current */}
          <div className="rounded-xl bg-gray-50 p-4">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300"
              />

              <div>
                <p className="text-sm font-medium">
                  Masih berlangsung
                </p>

                <p className="text-xs text-gray-500">
                  Centang jika experience ini masih aktif.
                </p>
              </div>

            </label>

          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Jelaskan pengalaman, aktivitas, atau tanggung jawab..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          {/* Sort Order */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Urutan
            </label>

            <input
              type="number"
              name="sortOrder"
              min="1"
              value={formData.sortOrder}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gray-900 px-7 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Menyimpan..."
                : editingId
                  ? "Update Experience"
                  : "Tambah Experience"}
            </button>

          </div>

        </form>

      </section>

      {/* List */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold">
            Daftar Experience
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {experiences.length} experience tersedia.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              Memuat experience...
            </p>
          </div>
        ) : experiences.length === 0 ? (
          <div className="mt-6 rounded-xl bg-gray-50 px-6 py-12 text-center">
            <p className="font-medium text-gray-600">
              Belum ada experience.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Tambahkan experience menggunakan form di atas.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">

            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="rounded-xl border border-gray-200 p-5"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  <div className="flex-1">

                    {/* Position */}
                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-lg font-semibold">
                        {experience.position}
                      </h3>

                      {experience.isCurrent && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Sekarang
                        </span>
                      )}

                    </div>

                    {/* Company */}
                    <p className="mt-2 font-medium text-gray-700">
                      {experience.company}
                    </p>

                    {/* Location */}
                    {experience.location && (
                      <p className="mt-1 text-sm text-gray-500">
                        {experience.location}
                      </p>
                    )}

                    {/* Period */}
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      {experience.startDate || "-"}
                      {" — "}
                      {experience.isCurrent
                        ? "Sekarang"
                        : experience.endDate || "-"}
                    </p>

                    {/* Description */}
                    {experience.description && (
                      <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-6 text-gray-500">
                        {experience.description}
                      </p>
                    )}

                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(experience)
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(experience.id)
                      }
                      disabled={
                        deletingId === experience.id
                      }
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === experience.id
                        ? "..."
                        : "Hapus"}
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  )
}

export default Experience