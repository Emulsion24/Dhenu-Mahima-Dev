"use client";

import React, { useState, useEffect } from "react";
import API from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function MembershipPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null); // for modal

  useEffect(() => {
    fetchPayments();
  }, [page, search]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/membership", {
        params: { page, limit, search },
      });
      setPayments(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedPayment) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedPayment]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-16 h-16 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Membership Payments
      </h1>

      {/* Search */}
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
        >
          Search
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.length === 0 ? (
          <div className="col-span-full text-center text-gray-700">
            No payments found.
          </div>
        ) : (
          payments.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition cursor-pointer"
            >
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-orange-600">{p.name}</h2>
                <p className="text-gray-800 font-semibold">Amount: ₹{p.amount}</p>
              </div>
              <button
                onClick={() => setSelectedPayment(p)}
                className="mt-4 bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition"
              >
                See Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-orange-200 rounded-lg hover:bg-orange-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 rounded-lg bg-orange-100 text-orange-800 font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-orange-200 rounded-lg hover:bg-orange-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 sm:w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              Payment Details
            </h2>
            <button
              onClick={() => setSelectedPayment(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold"
            >
              ✕
            </button>
            <div className="space-y-2 text-gray-800">
              <p>
                <span className="font-semibold">Name:</span> {selectedPayment.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {selectedPayment.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {selectedPayment.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {selectedPayment.address}, {selectedPayment.city}, {selectedPayment.state} - {selectedPayment.pincode}
              </p>
              <p>
                <span className="font-semibold">Membership Type:</span> {selectedPayment.membershipType}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ₹{selectedPayment.amount}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    selectedPayment.status === "success"
                      ? "text-green-700 font-bold"
                      : selectedPayment.status === "failed"
                      ? "text-red-700 font-bold"
                      : "text-yellow-700 font-bold"
                  }
                >
                  {selectedPayment.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Transaction ID:</span>{" "}
                {selectedPayment.transactionId}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(selectedPayment.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
