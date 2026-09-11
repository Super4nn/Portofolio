import { useState } from "react"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "CV", href: "#cv" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--rule-color)] bg-[var(--bg-primary)]/85 backdrop-blur-md transition-colors duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8">
        {/* Logo / Monogram */}
        <a
          href="#home"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3 text-[var(--text-primary)] transition-colors"
        >
          <span className="font-display text-lg font-extrabold tracking-wider transition-colors group-hover:text-[var(--accent)]">
            A.R.F
          </span>
          <span className="hidden sm:inline-block h-3 w-px bg-[var(--border-strong)]" />
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
            Developer
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}

          <div className="h-4 w-px bg-[var(--border-subtle)]" />

          <ThemeToggle />
        </div>

        {/* Tablet / Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60 text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)] hover:bg-[var(--accent-subtle)]"
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 px-6 py-5 shadow-lg backdrop-blur-xl md:hidden animate-editorial-fade">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 font-mono text-[12px] font-medium tracking-[0.16em] uppercase text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}