import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../services/faqService";

const emptyForm = { question: "", answer: "" };

const ManageFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadFaqs = () => {
    setLoading(true);
    getFAQs()
      .then((res) => setFaqs(res?.data || []))
      .catch(() => setError("Could not load FAQs"))
      .finally(() => setLoading(false));
  };

  useEffect(loadFaqs, []);

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditingId(faq._id);
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
        await updateFAQ(editingId, form);
      } else {
        await createFAQ(form);
      }
      setShowForm(false);
      loadFaqs();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await deleteFAQ(id);
      loadFaqs();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete FAQ");
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
            Manage <span className="text-cyan-400">FAQs</span>
          </h1>
          <p className="text-gray-400 mt-2">Questions shown in the FAQs section.</p>
        </div>
        <button onClick={openCreateForm} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 rounded-xl transition">
          <FaPlus /> Add FAQ
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : faqs.length === 0 ? (
        <p className="text-gray-400">No FAQs yet. Add your first one!</p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold">{faq.question}</h3>
                <p className="text-gray-400 text-sm mt-1">{faq.answer}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => openEditForm(faq)} className="flex items-center gap-2 text-cyan-400 hover:underline text-sm">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(faq._id)} className="flex items-center gap-2 text-red-400 hover:underline text-sm">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingId ? "Edit FAQ" : "Add FAQ"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Question</label>
                <input name="question" value={form.question} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Answer</label>
                <textarea name="answer" value={form.answer} onChange={handleChange} required rows={4} className={inputClass} />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button type="submit" disabled={saving} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-bold transition disabled:opacity-60">
                {saving ? "Saving..." : editingId ? "Update FAQ" : "Create FAQ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFAQs;
