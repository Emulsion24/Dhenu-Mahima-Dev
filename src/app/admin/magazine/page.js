"use client";

import React, { useState, useEffect } from "react";
import API from "@/lib/api";
import toast from "react-hot-toast";
import { Loader2, Search, Filter, X, Calendar, CreditCard, User, Mail, Phone, Hash, Clock } from "lucide-react";

export default function MembershipPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [membershipTypeFilter, setMembershipTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchPayments();
  }, [page, search, membershipTypeFilter, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
      };

      // Add search term for name and email if exists
      if (search) {
        params.name = search;
        params.email = search;
      }

      // Add specific filters if they exist (send lowercase to match DB values)
      if (statusFilter) {
        params.status = statusFilter.toLowerCase();
      }

      if (membershipTypeFilter) {
        params.membershipType = membershipTypeFilter.toLowerCase();
      }

      const res = await API.get("/membership", { params });
      setPayments(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (err) {
      console.error("Error fetching payments:", err);
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this subscription?")) return;
    try {
      await API.patch(`/membership/${id}`);
      toast.success("Subscription cancelled successfully");
      fetchPayments();
      setSelectedPayment(null);
    } catch (error) {
      toast.error("Failed to cancel subscription");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscription? This action cannot be undone.")) return;
    try {
      await API.delete(`/membership/delete/${id}`);
      toast.success("Subscription deleted successfully");
      fetchPayments();
      setSelectedPayment(null);
    } catch (error) {
      toast.error("Failed to delete subscription");
      console.error(error);
    }
  };

  const clearFilters = () => {
    setMembershipTypeFilter("");
    setStatusFilter("");
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const hasActiveFilters = membershipTypeFilter || statusFilter || search;

  useEffect(() => {
    document.body.style.overflow = selectedPayment ? "hidden" : "auto";
  }, [selectedPayment]);

  if (loading && payments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading payments...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "active":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-blue-600 bg-blue-50";
      case "cancelled":
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getMembershipBadge = (type) => {
    return type?.toLowerCase() === "lifetime" 
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-blue-100 text-blue-700 border-blue-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">
            Membership Payments
          </h1>
          <p className="text-gray-600">Manage and track all membership subscriptions</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or status..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800"
                />
              </div>
              <button
                onClick={handleSearchClick}
                className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[membershipTypeFilter, statusFilter, search].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Membership Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Membership Type
                  </label>
                  <select
                    value={membershipTypeFilter}
                    onChange={(e) => {
                      setMembershipTypeFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                  >
                    <option value="">All Types</option>
                    <option value="annual">Annual</option>
                    <option value="lifetime">Lifetime</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="revoked">Revoked</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="failed">Failed</option>
                    <option value="expired">Expired</option>
                  </select>
          
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && payments.length > 0 && (
          <div className="fixed inset-0 bg-black/20 z-40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 shadow-xl">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
          </div>
        )}

        {/* Payment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {payments.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <CreditCard className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No payments found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            payments.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white truncate flex-1">
                      {p.name}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getMembershipBadge(p.membershipType)}`}>
                      {p.membershipType}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">₹{p.amount}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{p.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(p.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPayment(p)}
                    className="w-full mt-4 bg-orange-600 text-white font-semibold py-3 rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              Previous
            </button>
            <div className="px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold shadow-md">
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              Next
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 relative">
                <h2 className="text-2xl font-bold text-white pr-8">
                  Payment Details
                </h2>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="absolute top-6 right-6 text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status and Type Badges */}
                <div className="flex gap-3 flex-wrap">
                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(selectedPayment.status)}`}>
                    {selectedPayment.status}
                  </span>
                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getMembershipBadge(selectedPayment.membershipType)}`}>
                    {selectedPayment.membershipType} Membership
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <User className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                    <p className="font-semibold text-gray-800">{selectedPayment.name}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                    <p className="font-semibold text-gray-800 break-all">{selectedPayment.email}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </div>
                    <p className="font-semibold text-gray-800">{selectedPayment.phone}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <CreditCard className="w-4 h-4" />
                      <span>Amount</span>
                    </div>
                    <p className="font-semibold text-gray-800 text-xl">₹{selectedPayment.amount}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Hash className="w-4 h-4" />
                      <span>Transaction ID</span>
                    </div>
                    <p className="font-semibold text-gray-800 break-all">{selectedPayment.transactionId}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Date</span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {new Date(selectedPayment.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  {selectedPayment.status !== "cancelled" && selectedPayment.status !== "failed" && (
                    <button
                      onClick={() => handleCancel(selectedPayment.id)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                      Cancel Subscription
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedPayment.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}