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

function Skills() {
  const [skills, setSkills] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: 50,
    icon: "",
    sortOrder: 1,
  })

  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      setLoading(true)
      setError("")

      const skillsRef = collection(db, "skills")
      const snapshot = await getDocs(skillsRef)

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      data.sort(
        (a, b) =>
          Number(a.sortOrder || 0) - Number(b.sortOrder || 0)
      )

      setSkills(data)
    } catch (err) {
      console.error(err)
      setError("Gagal mengambil data skills.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "level" || name === "sortOrder"
          ? Number(value)
          : value,
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      level: 50,
      icon: "",
      sortOrder: skills.length + 1,
    })

    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError("Nama skill wajib diisi.")
      return
    }

    if (!formData.category.trim()) {
      setError("Category wajib diisi.")
      return
    }

    if (formData.level < 0 || formData.level > 100) {
      setError("Level harus berada di antara 0 sampai 100.")
      return
    }

    try {
      setSaving(true)
      setError("")
      setMessage("")

      const data = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        level: Number(formData.level),
        icon: formData.icon.trim(),
        sortOrder: Number(formData.sortOrder),
        updatedAt: serverTimestamp(),
      }

      if (editingId) {
        const skillRef = doc(db, "skills", editingId)

        await updateDoc(skillRef, data)

        setMessage("Skill berhasil diperbarui.")
      } else {
        await addDoc(collection(db, "skills"), {
          ...data,
          createdAt: serverTimestamp(),
        })

        setMessage("Skill berhasil ditambahkan.")
      }

      resetForm()
      await loadSkills()
    } catch (err) {
      console.error(err)
      setError(err.message || "Gagal menyimpan skill.")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (skill) => {
    setEditingId(skill.id)

    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      level: Number(skill.level || 0),
      icon: skill.icon || "",
      sortOrder: Number(skill.sortOrder || 1),
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
      "Apakah Anda yakin ingin menghapus skill ini?"
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(id)
      setError("")
      setMessage("")

      await deleteDoc(doc(db, "skills", id))

      setSkills((prev) =>
        prev.filter((skill) => skill.id !== id)
      )

      if (editingId === id) {
        resetForm()
      }

      setMessage("Skill berhasil dihapus.")
    } catch (err) {
      console.error(err)
      setError(err.message || "Gagal menghapus skill.")
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
          Skills
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola daftar skill dan tingkat kemampuan Anda.
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
                ? "Edit Skill"
                : "Tambah Skill"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingId
                ? "Perbarui informasi skill."
                : "Tambahkan skill baru ke portfolio."}
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
          className="mt-6 grid gap-6 md:grid-cols-2"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Nama Skill
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: React"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-500"
              required
            >
              <option value="">
                Pilih Category
              </option>

              <option value="Frontend">
                Frontend
              </option>

              <option value="Backend">
                Backend
              </option>

              <option value="Database">
                Database
              </option>

              <option value="Mobile">
                Mobile
              </option>

              <option value="Tools">
                Tools
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Level
            </label>

            <div className="flex items-center gap-4">

              <input
                type="range"
                name="level"
                min="0"
                max="100"
                value={formData.level}
                onChange={handleChange}
                className="flex-1"
              />

              <div className="w-20 rounded-lg bg-gray-100 px-3 py-2 text-center font-semibold">
                {formData.level}%
              </div>

            </div>
          </div>

          {/* Icon */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Icon
            </label>

            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Contoh: react"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />

            <p className="mt-2 text-xs text-gray-400">
              Isi dengan nama/icon identifier jika diperlukan.
            </p>
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
          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Menyimpan..."
                : editingId
                  ? "Update Skill"
                  : "Tambah Skill"}
            </button>
          </div>

        </form>

      </section>

      {/* Skill List */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold">
              Daftar Skills
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {skills.length} skill tersedia.
            </p>
          </div>

        </div>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              Memuat skills...
            </p>
          </div>
        ) : skills.length === 0 ? (
          <div className="mt-6 rounded-xl bg-gray-50 px-6 py-12 text-center">
            <p className="font-medium text-gray-600">
              Belum ada skill.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Tambahkan skill menggunakan form di atas.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[700px] border-collapse">

              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-4 text-sm font-semibold">
                    #
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold">
                    Skill
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold">
                    Level
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold">
                    Icon
                  </th>

                  <th className="px-4 py-4 text-right text-sm font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>

                {skills.map((skill, index) => (
                  <tr
                    key={skill.id}
                    className="border-b border-gray-100 last:border-0"
                  >

                    <td className="px-4 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {skill.name}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                        {skill.category || "-"}
                      </span>
                    </td>

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">

                          <div
                            className="h-full rounded-full bg-gray-900"
                            style={{
                              width: `${Math.min(
                                Math.max(
                                  Number(skill.level || 0),
                                  0
                                ),
                                100
                              )}%`,
                            }}
                          />

                        </div>

                        <span className="text-sm font-medium">
                          {skill.level || 0}%
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-4 text-sm text-gray-500">
                      {skill.icon || "-"}
                    </td>

                    <td className="px-4 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() => handleEdit(skill)}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(skill.id)
                          }
                          disabled={deletingId === skill.id}
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === skill.id
                            ? "..."
                            : "Hapus"}
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

    </div>
  )
}

export default Skills