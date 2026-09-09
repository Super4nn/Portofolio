function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-5">

          {/* Logo */}
          <a
            href="#home"
            className="absolute left-6 text-xl font-bold"
          >
            Portfolio
          </a>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            <a
              href="#home"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              About
            </a>

            <a
              href="#skills"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Skills
            </a>

            <a
              href="#experience"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Experience
            </a>

            <a
              href="#projects"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Contact
            </a>

          </div>

        </div>
      </nav>


      {/* Hero */}
      <section
        id="home"
        className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20"
      >
        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
            Hello, I'm
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Nama Anda
          </h1>

          <p className="mt-6 text-xl text-gray-600 md:text-2xl">
            Web Developer & Software Developer
          </p>

          <p className="mt-6 max-w-2xl leading-8 text-gray-500">
            Saya adalah seorang developer yang memiliki ketertarikan
            dalam membangun aplikasi web dan berbagai solusi digital.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#projects"
              className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              Contact Me
            </a>

          </div>

        </div>
      </section>


      {/* About */}
      <section
        id="about"
        className="border-t border-gray-200 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            About Me
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Tentang Saya
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-gray-600">
            Informasi mengenai profil, latar belakang, pengalaman,
            dan ketertarikan saya dalam bidang teknologi.
          </p>

        </div>
      </section>


      {/* Skills */}
      <section
        id="skills"
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Skills
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Keahlian
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "React",
              "Laravel",
              "JavaScript",
              "Tailwind CSS",
            ].map((skill) => (
              <div
                key={skill}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold">
                  {skill}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Skill description
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* Experience */}
      <section
        id="experience"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Pengalaman
          </h2>

          <div className="mt-10 space-y-8">

            <div className="border-l-2 border-gray-300 pl-6">

              <p className="text-sm text-gray-500">
                2024 - Sekarang
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Position / Role
              </h3>

              <p className="mt-1 text-gray-500">
                Company / Organization
              </p>

              <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                Deskripsi pengalaman atau pekerjaan.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* Projects */}
      <section
        id="projects"
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Projects
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Project Saya
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((project) => (
              <article
                key={project}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Project Image */}
                <div className="aspect-video bg-gray-200" />

                <div className="p-6">

                  <h3 className="text-xl font-semibold">
                    Project {project}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Deskripsi singkat mengenai project yang telah dibuat.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      React
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      Tailwind
                    </span>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* CV */}
      <section
        id="cv"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Curriculum Vitae
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            CV Saya
          </h2>

          <p className="mt-5 text-gray-600">
            Lihat atau download Curriculum Vitae saya.
          </p>

          <button
            className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Download CV
          </button>

        </div>
      </section>


      {/* Contact */}
      <section
        id="contact"
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Hubungi Saya
          </h2>

          <form className="mt-10 max-w-2xl space-y-5">

            <input
              type="text"
              placeholder="Nama"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-500"
            />

            <textarea
              rows="5"
              placeholder="Pesan"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Kirim Pesan
            </button>

          </form>

        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 Portfolio. All rights reserved.
          </p>

          <div className="flex gap-5">

            <a
              href="#"
              className="transition hover:text-gray-900"
            >
              GitHub
            </a>

            <a
              href="#"
              className="transition hover:text-gray-900"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="transition hover:text-gray-900"
            >
              Instagram
            </a>

          </div>

        </div>
      </footer>

    </div>
  )
}

export default App