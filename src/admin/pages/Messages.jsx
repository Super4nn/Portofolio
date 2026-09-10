import { useEffect, useState } from "react"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"
import { db } from "../../lib/firebase"

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const fetchMessages = async () => {
    try {
      setLoading(true)

      const messagesRef = collection(db, "messages")
      const messagesQuery = query(
        messagesRef,
        orderBy("createdAt", "desc")
      )

      const snapshot = await getDocs(messagesQuery)

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      setMessages(data)
    } catch (error) {
      console.error("Gagal mengambil pesan:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "messages", id), {
        isRead: true,
      })

      setMessages((prev) =>
        prev.map((message) =>
          message.id === id
            ? { ...message, isRead: true }
            : message
        )
      )

      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) => ({
          ...prev,
          isRead: true,
        }))
      }
    } catch (error) {
      console.error("Gagal mengubah status pesan:", error)
    }
  }

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus pesan ini?"
    )

    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, "messages", id))

      setMessages((prev) =>
        prev.filter((message) => message.id !== id)
      )

      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error("Gagal menghapus pesan:", error)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "-"

    const date = timestamp.toDate
      ? timestamp.toDate()
      : new Date(timestamp)

    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter(
    (message) => !message.isRead
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Messages
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Kelola pesan yang dikirim oleh pengunjung.
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400">
            Belum dibaca:
          </span>{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {unreadCount}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {loading ? (
          <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Memuat pesan...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mb-3 text-4xl">💬</div>

            <h3 className="font-semibold text-gray-900 dark:text-white">
              Belum ada pesan
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Pesan dari pengunjung akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-5 transition hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  !message.isRead
                    ? "bg-blue-50/50 dark:bg-blue-900/10"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Message Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`font-semibold ${
                          message.isRead
                            ? "text-gray-900 dark:text-white"
                            : "text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {message.name || "Tanpa Nama"}
                      </h3>

                      {!message.isRead && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          Baru
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {message.email || "-"}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                      {message.message || "-"}
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                      {formatDate(message.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => {
                        setSelectedMessage(message)

                        if (!message.isRead) {
                          markAsRead(message.id)
                        }
                      }}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Lihat
                    </button>

                    {!message.isRead && (
                      <button
                        onClick={() => markAsRead(message.id)}
                        className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      >
                        Tandai Dibaca
                      </button>
                    )}

                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl dark:bg-gray-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detail Pesan
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pesan dari pengunjung
                </p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Nama
                </p>

                <p className="mt-1 font-medium text-gray-900 dark:text-white">
                  {selectedMessage.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {selectedMessage.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Tanggal
                </p>

                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Pesan
                </p>

                <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {selectedMessage.message || "-"}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 p-5 dark:border-gray-700">
              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}