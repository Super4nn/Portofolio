import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

export async function getProfile() {
  const profileRef = doc(db, "profiles", "profile")

  const profileSnapshot = await getDoc(profileRef)

  if (!profileSnapshot.exists()) {
    return null
  }

  return {
    id: profileSnapshot.id,
    ...profileSnapshot.data(),
  }
}

export async function updateProfile(data) {
  const profileRef = doc(db, "profiles", "profile")

  await updateDoc(profileRef, data)
}