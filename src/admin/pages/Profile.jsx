import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "../../lib/profile"
import { uploadToCloudinary } from "../../lib/cloudinary"

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    bio: "",
    description: "",
    profileImageUrl: "",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError("")

      const data = await getProfile()

      if (data) {
        setFormData({
          name: data.name || "",
          headline: data.headline || "",
          bio: data.bio || "",
          description: data.description || "",
          profileImageUrl: data.profileImageUrl || "",
          email: data.email || "",
          githubUrl: data.githubUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          instagramUrl: data.instagramUrl || "",
        })

        setPreview(data.profileImageUrl || "")
      }
    } catch (err) {
      console.error(err)
      setError("Gagal mengambil data profile.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)
      setMessage("")
      setError("")

      let imageUrl = formData.profileImageUrl

      // Upload foto baru jika dipilih
      if (selectedFile) {
        const uploadResult = await uploadToCloudinary(
          selectedFile,
          "portfolio/profile"
        )

        imageUrl = uploadResult.url
      }

      const updatedData = {
        name: formData.name,
        headline: formData.headline,
        bio: formData.bio,
        description: formData.description,
        profileImageUrl: imageUrl,
        email: formData.email,
        githubUrl: formData.githubUrl,
        linkedinUrl: formData.linkedinUrl,
        instagramUrl: formData.instagramUrl,
      }

      await updateProfile(updatedData)

      setFormData(updatedData)
      setSelectedFile(null)
      setPreview(imageUrl)

      setMessage("Profile berhasil disimpan.")
    } catch (err) {
      console.error(err)
      setError(err.message || "Gagal menyimpan profile.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Memuat data profile...
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-gray-500">
          Management
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola informasi profile yang ditampilkan pada portfolio.
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
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Profile Image */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            Foto Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Gunakan gambar JPG, JPEG, atau PNG dengan ukuran maksimal 5 MB.
          </p>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">

              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400">
                  Belum ada foto
                </span>
              )}

            </div>

            <div>
              <label
                htmlFor="profileImage"
                className="inline-block cursor-pointer rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Pilih Foto
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile && (
                <p className="mt-3 text-sm text-gray-500">
                  File dipilih: {selectedFile.name}
                </p>
              )}
            </div>

          </div>

        </section>

        {/* Basic Information */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            Informasi Dasar
          </h2>

          <div className="mt-6 grid gap-6">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Nama
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Headline
              </label>

              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Web Developer & Software Developer"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Bio Singkat
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Deskripsi singkat tentang diri Anda..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Deskripsi Lengkap
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Informasi lengkap mengenai diri Anda..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

          </div>

        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            Kontak & Social Media
          </h2>

          <div className="mt-6 grid gap-6">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
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
                placeholder="https://github.com/username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                LinkedIn URL
              </label>

              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Instagram URL
              </label>

              <input
                type="url"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              />
            </div>

          </div>

        </section>

        {/* Save */}
        <div className="flex justify-end">

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gray-900 px-7 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Profile"}
          </button>

        </div>

      </form>

    </div>
  )
}

export default Profile