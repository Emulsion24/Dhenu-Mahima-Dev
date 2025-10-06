"use client";

import { useState } from "react";
import { Edit, Trash2, Search, Plus, X, Users, Mail, Phone, Shield } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Rohit Sharma", email: "rohit@example.com", phone: "9876543210", role: "Admin" },
    { id: 2, name: "Priya Das", email: "priya@example.com", phone: "9123456780", role: "Subadmin" },
    { id: 3, name: "Amit Roy", email: "amit@example.com", phone: "9988776655", role: "User" },
    { id: 4, name: "Sneha Gupta", email: "sneha@example.com", phone: "9811223344", role: "User" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formUser, setFormUser] = useState({ name: "", email: "", phone: "", role: "User" });

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleAddUser = () => {
    if (!formUser.name || !formUser.email || !formUser.phone) {
      alert("Please fill all fields");
      return;
    }
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? { ...formUser, id: u.id } : u)));
    } else {
      setUsers([{ ...formUser, id: users.length + 1 }, ...users]);
    }
    setFormUser({ name: "", email: "", phone: "", role: "User" });
    setEditUser(null);
    setShowModal(false);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const roleStyles = {
    Admin: "bg-rose-100 text-rose-700 border-rose-200",
    Subadmin: "bg-amber-100 text-amber-700 border-amber-200",
    User: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-neutral-900 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">User Management</h1>
          </div>
          <p className="text-neutral-600 ml-14">Manage and organize your team members</p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 placeholder-neutral-400"
              />
            </div>
            <button
              onClick={() => {
                setFormUser({ name: "", email: "", phone: "", role: "User" });
                setEditUser(null);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all duration-200 shadow-sm font-medium w-full md:w-auto justify-center"
            >
              <Plus className="w-5 h-5" /> Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Total Users</p>
                <p className="text-2xl font-bold text-neutral-900">{users.length}</p>
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
                <p className="text-2xl font-bold text-neutral-900">
                  {users.filter(u => u.role === "Admin").length}
                </p>
              </div>
              <div className="p-3 bg-rose-100 rounded-xl">
                <Shield className="w-6 h-6 text-rose-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-sm font-medium mb-1">Active Now</p>
                <p className="text-2xl font-bold text-neutral-900">{currentUsers.length}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-600 flex items-center justify-center text-white font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{user.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-1 ${roleStyles[user.role]}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-neutral-600 text-sm">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => openEditModal(user)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors font-medium text-sm"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in duration-200">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-neutral-900">
                {editUser ? "Edit User" : "Add New User"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={formUser.name}
                    onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={formUser.email}
                    onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={formUser.phone}
                    onChange={(e) => setFormUser({ ...formUser, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Role</label>
                  <select
                    value={formUser.role}
                    onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Subadmin">Subadmin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 px-6 py-3 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm font-medium"
                >
                  {editUser ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}