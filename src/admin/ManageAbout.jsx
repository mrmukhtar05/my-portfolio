import { useEffect, useState } from "react";
import { getAbout, updateAbout } from "../services/aboutService";

const emptyForm = {
  name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  profileImage: "",
  resume: "",
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    portfolio: "",
  },
};

const ManageAbout = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAbout()
      .then((res) => {
        if (res?.data) {
          setForm({ ...emptyForm, ...res.data, socialLinks: { ...emptyForm.socialLinks, ...res.data.socialLinks } });
        }
      })
      .catch(() => {
        // no about doc yet, keep empty form
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e) => {
    setForm({
      ...form,
      socialLinks: { ...form.socialLinks, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await updateAbout(form);
      setMessage("Saved successfully!");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;

  const inputClass =
    "w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none focus:border-cyan-400";
  const labelClass = "text-sm text-gray-400 mb-1 block";

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Manage <span className="text-cyan-400">About</span>
      </h1>
      <p className="text-gray-400 mt-2 mb-8">
        This information powers the Hero, About and Contact sections.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Title / Role</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Full Stack Developer" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} required rows={4} className={inputClass} />
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} required className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Profile Image URL</label>
            <input name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Resume URL</label>
            <input name="resume" value={form.resume} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Social Links</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>GitHub</label>
              <input name="github" value={form.socialLinks.github} onChange={handleSocialChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>LinkedIn</label>
              <input name="linkedin" value={form.socialLinks.linkedin} onChange={handleSocialChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Twitter</label>
              <input name="twitter" value={form.socialLinks.twitter} onChange={handleSocialChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Instagram</label>
              <input name="instagram" value={form.socialLinks.instagram} onChange={handleSocialChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Portfolio Website</label>
              <input name="portfolio" value={form.socialLinks.portfolio} onChange={handleSocialChange} className={inputClass} />
            </div>
          </div>
        </div>

        {message && (
          <p className={message.includes("success") ? "text-green-400" : "text-red-400"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-lg font-bold transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ManageAbout;
