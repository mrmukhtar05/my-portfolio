import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaProjectDiagram,
  FaTools,
  FaRoute,
  FaQuestionCircle,
  FaEnvelopeOpenText,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", to: "/admin", icon: <FaTachometerAlt />, end: true },
  { name: "About", to: "/admin/about", icon: <FaUser /> },
  { name: "Projects", to: "/admin/projects", icon: <FaProjectDiagram /> },
  { name: "Skills", to: "/admin/skills", icon: <FaTools /> },
  { name: "Journey", to: "/admin/journey", icon: <FaRoute /> },
  { name: "FAQs", to: "/admin/faqs", icon: <FaQuestionCircle /> },
  { name: "Messages", to: "/admin/contacts", icon: <FaEnvelopeOpenText /> },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-40">
        <span className="text-cyan-400 font-bold text-xl">Admin Panel</span>
        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <span className="text-2xl font-bold text-cyan-400">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-cyan-500 text-black font-semibold"
                    : "text-gray-300 hover:bg-slate-800"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-800 transition"
          >
            <FaExternalLinkAlt />
            View Site
          </a>

          <div className="px-4 py-2 text-sm text-gray-500 truncate">
            Signed in as{" "}
            <span className="text-gray-300">{user?.name || "Admin"}</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
