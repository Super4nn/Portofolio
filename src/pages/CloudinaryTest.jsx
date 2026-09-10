import { useState } from "react"
import { uploadToCloudinary } from "../lib/cloudinary"
import { getProfile } from "../lib/profile"

function CloudinaryTest() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [profile, setProfile] = useState(null)

  const handleUpload = async () => {
    if (!file) {
      setError("Pilih file terlebih dahulu.")
      return
    }

    try {
      setUploading(true)
      setError("")
      setResult(null)

      const data = await uploadToCloudinary(file, "portfolio/test")

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleGetProfile = async () => {
    try {
      setError("")
      setProfile(null)

      const data = await getProfile()

      setProfile(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          Test Cloudinary & Firestore
        </h1>

        {/* Cloudinary Upload */}
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">
            Test Upload Cloudinary
          </h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 block w-full"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>

          {result && (
            <div className="mt-6 rounded-lg bg-green-50 p-4">
              <p className="mb-2 font-semibold text-green-700">
                Upload berhasil!
              </p>

              <p className="break-all text-sm text-gray-600">
                {result.url}
              </p>

              {result.format && (
                <p className="mt-2 text-sm text-gray-600">
                  Format: {result.format}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Firestore Profile */}
        <div className="border-t pt-6">
          <h2 className="mb-3 text-lg font-semibold">
            Test Firestore Profile
          </h2>

          <button
            onClick={handleGetProfile}
            className="rounded-lg bg-green-600 px-5 py-2 text-white"
          >
            Get Profile
          </button>

          {profile && (
            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <p className="mb-4 font-semibold">
                Data Profile dari Firestore
              </p>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Nama:</strong>{" "}
                  {profile.name || "-"}
                </p>

                <p>
                  <strong>Headline:</strong>{" "}
                  {profile.headline || "-"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {profile.email || "-"}
                </p>

                <p>
                  <strong>Bio:</strong>{" "}
                  {profile.bio || "-"}
                </p>

                <p>
                  <strong>Deskripsi:</strong>{" "}
                  {profile.description || "-"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CloudinaryTest