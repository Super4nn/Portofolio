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

const technologyOptions = [
  "React",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Laravel",
  "PHP",
  "Node.js",
  "Express.js",
  "MySQL",
  "Firebase",
  "Supabase",
  "React Native",
  "Expo",
  "Python",
  "TensorFlow",
  "Unity",
  "C#",
  "Arduino",
  "ESP32",
]

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function Projects() {
  const [projects, setProjects] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    technologies: [],
    demoUrl: "",
    githubUrl: "",
    featured: false,
    sortOrder: 1,
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState("")

  const [editingId, setEditingId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError("")

      const projectsRef = collection(db, "projects")
      const snapshot = await getDocs(projectsRef)

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      data.sort(
        (a, b) =>
          Number(a.sortOrder || 0) - Number(b.sortOrder || 0)
      )

      setProjects(data)
    } catch (err) {
      console.error(err)
      setError("Gagal mengambil data projects.")
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

  const handleTechnologyChange = (technology) => {
    setFormData((prev) => {
      const exists = prev.technologies.includes(technology)

      return {
        ...prev,
        technologies: exists
          ? prev.technologies.filter(
              (item) => item !== technology
            )
          : [...prev.technologies, technology],
      }
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5 MB.")
      return
    }

    setError("")
    setSelectedFile(file)

    const imagePreview = URL.createObjectURL(file)
    setPreview(imagePreview)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      technologies: [],
      demoUrl: "",
      githubUrl: "",
      featured: false,
      sortOrder: projects.length + 1,
    })

    setSelectedFile(null)
    setPreview("")
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      setError("Nama project wajib diisi.")
      return
    }

    if (!formData.description.trim()) {
      setError("Description wajib diisi.")
      return
    }

    if (formData.technologies.length === 0) {
      setError("Pilih minimal satu technology.")
      return
    }

    try {
      setSaving(true)
      setError("")
      setMessage("")

      let imageUrl = formData.imageUrl

      // Upload gambar baru ke Cloudinary
      if (selectedFile) {
        const uploadResult = await uploadToCloudinary(
          selectedFile,
          "portfolio/projects"
        )

        imageUrl = uploadResult.url
      }

      const slug = createSlug(formData.title)

      const data = {
        title: formData.title.trim(),
        slug,
        description: formData.description.trim(),
        imageUrl,
        technologies: formData.technologies,
        demoUrl: formData.demoUrl.trim(),
        githubUrl: formData.githubUrl.trim(),
        featured: Boolean(formData.featured),
        sortOrder: Number(formData.sortOrder),
        updatedAt: serverTimestamp(),
      }

      if (editingId) {
        const projectRef = doc(
          db,
          "projects",
          editingId
        )

        await updateDoc(projectRef, data)

        setMessage("Project berhasil diperbarui.")
      } else {
        await addDoc(collection(db, "projects"), {
          ...data,
          createdAt: serverTimestamp(),
        })

        setMessage("Project berhasil ditambahkan.")
      }

      resetForm()
      await loadProjects()
    } catch (err) {
      console.error(err)
      setError(
        err.message || "Gagal menyimpan project."
      )
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project) => {
    setEditingId(project.id)

    setFormData({
      title: project.title || "",
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies
        : [],
      demoUrl: project.demoUrl || "",
      githubUrl: project.githubUrl || "",
      featured: Boolean(project.featured),
      sortOrder: Number(project.sortOrder || 1),
    })

    setSelectedFile(null)
    setPreview(project.imageUrl || "")

    setMessage("")
    setError("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus project ini?"
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(id)
      setError("")
      setMessage("")

      await deleteDoc(
        doc(db, "projects", id)
      )

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      )

      if (editingId === id) {
        resetForm()
      }

      setMessage("Project berhasil dihapus.")
    } catch (err) {
      console.error(err)
      setError(
        err.message || "Gagal menghapus project."
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
          Projects
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola project yang ditampilkan pada portfolio.
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
                ? "Edit Project"
                : "Tambah Project"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingId
                ? "Perbarui informasi project."
                : "Tambahkan project baru ke portfolio."}
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
              Nama Project
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Portfolio Website"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              required
            />

            {formData.title && (
              <p className="mt-2 text-xs text-gray-400">
                Slug: {createSlug(formData.title)}
              </p>
            )}
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
              placeholder="Jelaskan tentang project ini..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Gambar Project
            </label>

            <p className="mb-4 text-sm text-gray-500">
              JPG, JPEG, atau PNG. Maksimal 5 MB.
            </p>

            <div className="flex flex-col gap-5 md:flex-row md:items-start">

              <div className="flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-xl bg-gray-100">

                {preview ? (
                  <img
                    src={preview}
                    alt="Project preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400">
                    Belum ada gambar
                  </span>
                )}

              </div>

              <div>

                <label
                  htmlFor="projectImage"
                  className="inline-block cursor-pointer rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  Pilih Gambar
                </label>

                <input
                  id="projectImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedFile && (
                  <p className="mt-3 text-sm text-gray-500">
                    File: {selectedFile.name}
                  </p>
                )}

              </div>

            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Technologies
            </label>

            <p className="mb-4 text-sm text-gray-500">
              Pilih teknologi yang digunakan pada project.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

              {technologyOptions.map((technology) => {
                const checked =
                  formData.technologies.includes(technology)

                return (
                  <label
                    key={technology}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                      checked
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        handleTechnologyChange(
                          technology
                        )
                      }
                      className="h-4 w-4"
                    />

                    <span className="text-sm font-medium">
                      {technology}
                    </span>
                  </label>
                )
              })}

            </div>

            {formData.technologies.length > 0 && (
              <div className="mt-4 rounded-xl bg-gray-50 p-4">

                <p className="text-xs font-medium text-gray-500">
                  Technology dipilih:
                </p>

                <p className="mt-2 text-sm font-medium">
                  {formData.technologies.join(", ")}
                </p>

              </div>
            )}

          </div>

          {/* Links */}
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Demo URL
              </label>

              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                GitHub URL
              </label>

              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/project"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

          </div>

          {/* Featured + Sort */}
          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-4">

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300"
                />

                <div>
                  <p className="text-sm font-medium">
                    Featured Project
                  </p>

                  <p className="text-xs text-gray-500">
                    Tampilkan project sebagai project unggulan.
                  </p>
                </div>

              </label>

            </div>

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
                  ? "Update Project"
                  : "Tambah Project"}
            </button>

          </div>

        </form>

      </section>

      {/* Project List */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold">
            Daftar Projects
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {projects.length} project tersedia.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              Memuat projects...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-6 rounded-xl bg-gray-50 px-6 py-12 text-center">

            <p className="font-medium text-gray-600">
              Belum ada project.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Tambahkan project menggunakan form di atas.
            </p>

          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {projects.map((project) => (
              <div
                key={project.id}
                className="overflow-hidden rounded-2xl border border-gray-200"
              >

                {/* Image */}
                <div className="h-52 bg-gray-100">

                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm text-gray-400">
                        Belum ada gambar
                      </span>
                    </div>
                  )}

                </div>

                {/* Content */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h3 className="text-lg font-semibold">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        /{project.slug}
                      </p>
                    </div>

                    {project.featured && (
                      <span className="shrink-0 rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                        Featured
                      </span>
                    )}

                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">

                        {project.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                            >
                              {technology}
                            </span>
                          )
                        )}

                      </div>
                    )}

                  {/* Links */}
                  <div className="mt-5 flex flex-wrap gap-3">

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-gray-700 underline"
                      >
                        Demo
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-gray-700 underline"
                      >
                        GitHub
                      </a>
                    )}

                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2 border-t border-gray-100 pt-5">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(project)
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(project.id)
                      }
                      disabled={
                        deletingId === project.id
                      }
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === project.id
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

export default Projects