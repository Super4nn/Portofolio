import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  useEffect(() => {
    const html = document.documentElement

    if (darkMode) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
      aria-label={
        darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"
      }
      title={darkMode ? "Mode Terang" : "Mode Gelap"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  )
}