import React, { useEffect, useState } from "react";
import { fetchAllUsers, updateUser } from "../../api/admin.js";
import { User, Pencil } from "lucide-react";

const Field = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</span>
    <span className="text-slate-800 font-medium">{value || "—"}</span>
  </div>
);

const Account = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null); // holds the user being edited
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [saving, setSaving] = useState(false);

  const loadUsers = async () => {
    try {
      const { data } = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (user) => {
    setEditing(user._id);
    setForm({ name: user.name, email: user.email, mobile: user.mobile || "" });
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const handleSave = async (userId) => {
    try {
      setSaving(true);
      await updateUser(userId, form);
      setEditing(null);
      loadUsers();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-10 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Account</h1>

      <div className="flex flex-col gap-6 max-w-3xl">
        {users.map((u) => (
          <div key={u._id} className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">

            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-800">{u.name}</p>
                  <p className="text-sm text-slate-500">{u.email}</p>
                </div>
              </div>
              {editing === u._id ? (
                <div className="flex gap-2">
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(u._id)}
                    disabled={saving}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition disabled:opacity-60"
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEdit(u)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
              )}
            </div>

            {/* Fields */}
            {editing === u._id ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">Full Name</label>
                  <input
                    className="border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">Email</label>
                  <input
                    className="border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">Mobile</label>
                  <input
                    className="border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.mobile}
                    onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-6">
                <Field label="Full Name" value={u.name} />
                <Field label="Email" value={u.email} />
                <Field label="Mobile" value={u.mobile} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
