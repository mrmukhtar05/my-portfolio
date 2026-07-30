import { useEffect, useState } from "react";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import { getContacts, deleteContact } from "../services/contactService";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = () => {
    setLoading(true);
    getContacts()
      .then((res) => setContacts(res?.data || []))
      .catch(() => setError("Could not load messages"))
      .finally(() => setLoading(false));
  };

  useEffect(loadContacts, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteContact(id);
      loadContacts();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete message");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Contact <span className="text-cyan-400">Messages</span>
      </h1>
      <p className="text-gray-400 mt-2 mb-8">
        Messages submitted through your Contact form.
      </p>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-400 flex items-center gap-2">
          <FaEnvelope /> No messages yet.
        </p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold">{contact.subject}</h3>
                  <p className="text-cyan-400 text-sm mt-1">
                    {contact.name} · {contact.email}
                  </p>
                  <p className="text-gray-400 mt-3">{contact.message}</p>
                  {contact.createdAt && (
                    <p className="text-gray-600 text-xs mt-3">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="text-red-400 hover:underline text-sm flex items-center gap-2 shrink-0"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
