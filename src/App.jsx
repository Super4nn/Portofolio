import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import CloudinaryTest from "./pages/CloudinaryTest"

import ProtectedRoute from "./components/ProtectedRoute"
import PublicLayout from "./components/PublicLayout"

import AdminLayout from "./admin/AdminLayout"
import Dashboard from "./admin/pages/Dashboard"
import Profile from "./admin/pages/Profile"
import Skills from "./admin/pages/Skills"
import Experience from "./admin/pages/Experience"
import Projects from "./admin/pages/Projects"
import CV from "./admin/pages/CV"
import Messages from "./admin/pages/Messages"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ========================================
            PUBLIC
        ======================================== */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

        </Route>


        {/* ========================================
            LOGIN
        ======================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ========================================
            ADMIN
        ======================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

          {/* Skills */}
          <Route
            path="skills"
            element={<Skills />}
          />

          {/* Experience */}
          <Route
            path="experience"
            element={<Experience />}
          />

          {/* Projects */}
          <Route
            path="projects"
            element={<Projects />}
          />

          {/* CV */}
          <Route
            path="cv"
            element={<CV />}
          />

          {/* Messages */}
          <Route
            path="messages"
            element={<Messages />}
          />

        </Route>


        {/* ========================================
            CLOUDINARY TEST
        ======================================== */}

        <Route
          path="/cloudinary-test"
          element={<CloudinaryTest />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App