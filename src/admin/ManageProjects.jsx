import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";
import { getImageUrl } from "../utils/getImageUrl";

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  github: "",
  liveDemo: "",
  featured: false,
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = () => {
    setLoading(true);
    getProjects()
      .then((res) => setProjects(res?.data || []))
      .catch(() => setError("Could not load projects"))
      .finally(() => setLoading(false));
  };

  useEffect(loadProjects, []);

  const openCreateForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: (project.technologies || []).join(", "),
      github: project.github || "",
      liveDemo: project.liveDemo || "",
      featured: project.featured || false,
    });
    setImageFile(null);
    setEditingId(project._id);
    setShowForm(true);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("github", form.github);
      formData.append("liveDemo", form.liveDemo);
      formData.append("featured", form.featured);
      form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((tech) => formData.append("technologies", tech));
      if (imageFile) formData.append("image", imageFile);

      if (editingId) {
        await updateProject(editingId, formData);
      } else {
        await createProject(formData);
      }

      setShowForm(false);
      loadProjects();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete project");
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none focus:border-cyan-400";
  const labelClass = "text-sm text-gray-400 mb-1 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Manage <span className="text-cyan-400">Projects</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Add, edit or remove portfolio projects.
          </p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 rounded-xl transition"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">No projects yet. Add your first one!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
            >
              {project.image && (
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => openEditForm(project)}
                    className="flex items-center gap-2 text-cyan-400 hover:underline text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex items-center gap-2 text-red-400 hover:underline text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Project" : "Add Project"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Technologies (comma separated)</label>
                <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GitHub Link</label>
                  <input name="github" value={form.github} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Live Demo Link</label>
                  <input name="liveDemo" value={form.liveDemo} onChange={handleChange} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Project Image {editingId && "(leave empty to keep current)"}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className={inputClass}
                />
              </div>
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                Featured project
              </label>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-bold transition disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
