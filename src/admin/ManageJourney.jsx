import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
  getJourneys,
  createJourney,
  updateJourney,
  deleteJourney,
} from "../services/journeyService";

const TYPES = ["Education", "Experience", "Internship", "Certification"];
const emptyForm = {
  title: "",
  organization: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  type: "Education",
};

const ManageJourney = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadItems = () => {
    setLoading(true);
    getJourneys()
      .then((res) => setItems(res?.data || []))
      .catch(() => setError("Could not load journey items"))
      .finally(() => setLoading(false));
  };

  useEffect(loadItems, []);

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (item) => {
    setForm({
      title: item.title,
      organization: item.organization,
      location: item.location || "",
      startDate: item.startDate,
      endDate: item.endDate || "",
      description: item.description,
      type: item.type,
    });
    setEditingId(item._id);
    setShowForm(true);
    setError("");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await updateJourney(editingId, form);
      } else {
        await createJourney(form);
      }
      setShowForm(false);
      loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this journey item?")) return;
    try {
      await deleteJourney(id);
      loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete");
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
            Manage <span className="text-cyan-400">Journey</span>
          </h1>
          <p className="text-gray-400 mt-2">Timeline shown in the Journey section.</p>
        </div>
        <button onClick={openCreateForm} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 rounded-xl transition">
          <FaPlus /> Add Item
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-400">No journey items yet. Add your first one!</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300">{item.type}</span>
                <h3 className="font-bold text-lg mt-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.organization} · {item.startDate} - {item.endDate || "Present"}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => openEditForm(item)} className="flex items-center gap-2 text-cyan-400 hover:underline text-sm">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="flex items-center gap-2 text-red-400 hover:underline text-sm">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Edit Journey Item" : "Add Journey Item"}</h2>
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
                <label className={labelClass}>Organization</label>
                <input name="organization" value={form.organization} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Location (optional)</label>
                <input name="location" value={form.location} onChange={handleChange} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input name="startDate" value={form.startDate} onChange={handleChange} required placeholder="2024" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="Present" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={inputClass} />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button type="submit" disabled={saving} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-bold transition disabled:opacity-60">
                {saving ? "Saving..." : editingId ? "Update Item" : "Create Item"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJourney;
