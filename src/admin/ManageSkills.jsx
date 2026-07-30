import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/skillService";

const CATEGORIES = ["Frontend", "Backend", "Database", "Tools", "Other"];
const emptyForm = { name: "", category: "Frontend", level: 70, icon: "" };

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSkills = () => {
    setLoading(true);
    getSkills()
      .then((res) => setSkills(res?.data || []))
      .catch(() => setError("Could not load skills"))
      .finally(() => setLoading(false));
  };

  useEffect(loadSkills, []);

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (skill) => {
    setForm({ name: skill.name, category: skill.category, level: skill.level, icon: skill.icon || "" });
    setEditingId(skill._id);
    setShowForm(true);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "level" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await updateSkill(editingId, form);
      } else {
        await createSkill(form);
      }
      setShowForm(false);
      loadSkills();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id);
      loadSkills();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete skill");
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
            Manage <span className="text-cyan-400">Skills</span>
          </h1>
          <p className="text-gray-400 mt-2">Skills shown in the About section.</p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 rounded-xl transition"
        >
          <FaPlus /> Add Skill
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : skills.length === 0 ? (
        <p className="text-gray-400">No skills yet. Add your first one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{skill.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                  {skill.category}
                </span>
              </div>
              <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: `${skill.level}%` }} />
              </div>
              <p className="text-gray-500 text-xs mt-1">{skill.level}%</p>
              <div className="flex gap-3 mt-4">
                <button onClick={() => openEditForm(skill)} className="flex items-center gap-2 text-cyan-400 hover:underline text-sm">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(skill._id)} className="flex items-center gap-2 text-red-400 hover:underline text-sm">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Edit Skill" : "Add Skill"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Level: {form.level}%</label>
                <input type="range" name="level" min="0" max="100" value={form.level} onChange={handleChange} className="w-full accent-cyan-400" />
              </div>
              <div>
                <label className={labelClass}>Icon (optional, e.g. icon URL)</label>
                <input name="icon" value={form.icon} onChange={handleChange} className={inputClass} />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button type="submit" disabled={saving} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-bold transition disabled:opacity-60">
                {saving ? "Saving..." : editingId ? "Update Skill" : "Create Skill"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
