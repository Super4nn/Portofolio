const CLOUD_NAME = "vqnttbju"
const UPLOAD_PRESET = "portfolio_upload"

export async function uploadToCloudinary(file, folder = "portfolio") {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)
  formData.append("folder", folder)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error("Gagal mengupload file ke Cloudinary")
  }

  const data = await response.json()

  return {
    url: data.secure_url,
    publicId: data.public_id,
    format: data.format,
  }
}