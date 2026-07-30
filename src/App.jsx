import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import ManageAbout from "./admin/ManageAbout";
import ManageProjects from "./admin/ManageProjects";
import ManageSkills from "./admin/ManageSkills";
import ManageJourney from "./admin/ManageJourney";
import ManageFAQs from "./admin/ManageFAQs";
import ManageContacts from "./admin/ManageContacts";

function App() {
  return (
    <Routes>
      {/* Public portfolio site */}
      <Route path="/" element={<Home />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* Admin dashboard (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="about" element={<ManageAbout />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="journey" element={<ManageJourney />} />
        <Route path="faqs" element={<ManageFAQs />} />
        <Route path="contacts" element={<ManageContacts />} />
      </Route>
    </Routes>
  );
}

export default App;
