"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Search, Plus, X, Users, Mail, Phone, Shield, Loader2, AlertCircle } from "lucide-react";
import API from "@/lib/api";
// API configuration




export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, admins: 0, subadmins: 0, users: 0 });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formUser, setFormUser] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    role: "user",
    password: "" 
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const usersPerPage = 6;

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, [currentPage, search]);

 const fetchUsers = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await API.get(
      `/admin/users?page=${currentPage}&limit=${usersPerPage}&search=${search}`
    );

    // Axios returns: response.data = { data, stats, pagination }
    const { data, stats, pagination } = response.data;

    setUsers(data || []);
    setStats(stats || { total: 0, admins: 0, subadmins: 0, users: 0 });
    setTotalPages(pagination?.totalPages || 1);
  } catch (err) {
    console.error("Error fetching users:", err);
    setError(err.message || "Failed to load users");
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setSubmitting(true);
      await API.delete(`/admin/users/${id}`, {
      });
      
      alert("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.message || "Failed to delete user");
    } finally {
      setSubmitting(false);
    }
  };

const handleAddUser = async () => {
  if (!formUser.name || !formUser.email || !formUser.phone) {
    alert("Please fill all required fields");
    return;
  }

  try {
    setSubmitting(true);

    if (editUser) {
      // ✅ Axios PUT syntax: (url, data)
      await API.put(`/admin/users/${editUser.id}`, {
        name: formUser.name,
        email: formUser.email,
        phone: formUser.phone,
        role: formUser.role,
        ...(formUser.password && { password: formUser.password }),
      });

      alert("User updated successfully!");
    } else {
      // ✅ Axios POST syntax: (url, data)
      await API.post("/admin/users", {
        name: formUser.name,
        email: formUser.email,
        phone: formUser.phone,
        role: formUser.role,
        password: formUser.password,
      });

      alert("User added successfully!");
    }

    // ✅ Reset form and state
    setFormUser({ name: "", email: "", phone: "", role: "user", password: "" });
    setEditUser(null);
    setShowModal(false);
    fetchUsers();
  } catch (err) {
    console.error("❌ Error saving user:", err);
    alert(err.response?.data?.message || err.message || "Failed to save user");
  } finally {
    setSubmitting(false);
  }
};


  const openEditModal = (user) => {
    setEditUser(user);
    setFormUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: "",
    });
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const roleStyles = {
    admin: "bg-rose-100 text-rose-700 border-rose-200",
    subadmin: "bg-amber-100 text-amber-700 border-amber-200",
    user: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  const capitalizeRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-neutral-900 animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-neutral-900 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">User Management</h1>
          </div>
          <p className="text-neutral-600 ml-14">Manage and organize your team members</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">{error}</p>
              <button 
                onClick={fetchUsers}
                className="text-red-600 text-sm underline mt-1 hover:no-underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 placeholder-neutral-400"
              />
            </div>
            <button
              onClick={() => {
                setFormUser({ name: "", email: "", phone: "", role: "user", password: "" });
                setEditUser(null);
                setShowModal(true);
              }}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all duration-200 shadow-sm font-medium w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" /> Add User
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Total Users</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-neutral-100 rounded-xl">
                <Users className="w-6 h-6 text-neutral-700" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Admins</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.admins}</p>
              </div>
              <div className="p-3 bg-rose-100 rounded-xl">
                <Shield className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">On This Page</p>
                <p className="text-2xl font-bold text-neutral-900">{users.length}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {loading && users.length > 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6 text-center">
            <Loader2 className="w-8 h-8 text-neutral-900 animate-spin mx-auto" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-600 flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">{user.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-1 ${roleStyles[user.role]}`}>
                          {capitalizeRole(user.role)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-neutral-600 text-sm">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600 text-sm">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-neutral-100">
                    <button
                      onClick={() => openEditModal(user)}
                      disabled={submitting}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={submitting}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <Users className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-400 font-medium">No users found</p>
                <p className="text-neutral-400 text-sm mt-1">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && !loading && (
          <div className="flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={submitting}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentPage === page
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in duration-200">
              <button
                onClick={() => setShowModal(false)}
                disabled={submitting}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-neutral-900">
                {editUser ? "Edit User" : "Add New User"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={formUser.name}
                    onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={formUser.email}
                    onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number *</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={formUser.phone}
                    onChange={(e) => setFormUser({ ...formUser, phone: e.target.value })}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Password {editUser && "(leave blank to keep current)"}
                  </label>
                  <input
                    type="password"
                    placeholder={editUser ? "Enter new password" : "Enter password"}
                    value={formUser.password}
                    onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Role *</label>
                  <select
                    value={formUser.role}
                    onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 disabled:opacity-50"
                  >
                    <option value="admin">Admin</option>
                    <option value="subadmin">Subadmin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editUser ? "Update User" : "Add User"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}