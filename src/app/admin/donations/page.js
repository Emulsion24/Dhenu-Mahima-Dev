"use client";

import { useState } from "react";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  X, 
  DollarSign, 
  Users, 
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  Building2,
  Smartphone,
  Filter
} from "lucide-react";

export default function DonationsPage() {
  const [donations, setDonations] = useState([
    { 
      id: 1,
      transactionId: "TXN001234567",
      name: "John Doe", 
      amount: 5000, 
      email: "john@example.com",
      date: "2024-01-15",
      time: "10:30 AM",
      paymentMethod: "Credit Card",
      cardLast4: "4242",
      status: "Success"
    },
    { 
      id: 2,
      transactionId: "TXN001234568",
      name: "Jane Smith", 
      amount: 10000,
      email: "jane@example.com", 
      date: "2024-01-14",
      time: "02:45 PM",
      paymentMethod: "Bank Transfer",
      cardLast4: "8976",
      status: "Success"
    },
    { 
      id: 3,
      transactionId: "TXN001234569",
      name: "Mike Johnson", 
      amount: 7500,
      email: "mike@example.com", 
      date: "2024-01-13",
      time: "09:15 AM",
      paymentMethod: "UPI",
      cardLast4: "9876",
      status: "Pending"
    },
    { 
      id: 4,
      transactionId: "TXN001234570",
      name: "Sarah Williams", 
      amount: 3000,
      email: "sarah@example.com", 
      date: "2023-12-25",
      time: "04:20 PM",
      paymentMethod: "Credit Card",
      cardLast4: "1234",
      status: "Success"
    },
    { 
      id: 5,
      transactionId: "TXN001234571",
      name: "Robert Brown", 
      amount: 15000,
      email: "robert@example.com", 
      date: "2023-11-10",
      time: "11:30 AM",
      paymentMethod: "Bank Transfer",
      cardLast4: "5678",
      status: "Success"
    },
    { 
      id: 6,
      transactionId: "TXN001234572",
      name: "Emily Davis", 
      amount: 8000,
      email: "emily@example.com", 
      date: "2024-01-10",
      time: "03:15 PM",
      paymentMethod: "UPI",
      cardLast4: "9012",
      status: "Success"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [timePeriod, setTimePeriod] = useState("All Time");
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    email: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    paymentMethod: "Credit Card",
    cardLast4: "",
    status: "Success"
  });

  // Filter by time period
  const filterByTimePeriod = (donation) => {
    const donationDate = new Date(donation.date);
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    switch(timePeriod) {
      case "Weekly":
        return donationDate >= oneWeekAgo;
      case "Monthly":
        return donationDate >= oneMonthAgo;
      case "Yearly":
        return donationDate >= oneYearAgo;
      default:
        return true;
    }
  };

  // Filter donations
  const filteredDonations = donations.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || d.status === filterStatus;
    const matchesTimePeriod = filterByTimePeriod(d);
    return matchesSearch && matchesFilter && matchesTimePeriod;
  });

  // Calculate statistics for filtered data
  const totalDonations = filteredDonations.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalDonors = filteredDonations.length;
  const successfulDonations = filteredDonations.filter(d => d.status === "Success").length;

  // Generate transaction ID
  const generateTransactionId = () => {
    return "TXN" + Math.random().toString().slice(2, 11);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditingDonation(null);
    setFormData({
      name: "",
      amount: "",
      email: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      paymentMethod: "Credit Card",
      cardLast4: "",
      status: "Success"
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (donation) => {
    setEditingDonation(donation);
    setFormData(donation);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDonation(null);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingDonation) {
      // Update existing donation
      setDonations(donations.map(d => 
        d.id === editingDonation.id ? { 
          ...formData, 
          id: d.id, 
          amount: Number(formData.amount),
          transactionId: d.transactionId 
        } : d
      ));
    } else {
      // Add new donation
      const newDonation = {
        ...formData,
        id: Date.now(),
        amount: Number(formData.amount),
        transactionId: generateTransactionId()
      };
      setDonations([newDonation, ...donations]);
    }
    
    closeModal();
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this donation record?")) {
      setDonations(donations.filter(d => d.id !== id));
    }
  };

  // Get payment method icon
  const getPaymentIcon = (method) => {
    switch(method) {
      case "Credit Card":
      case "Debit Card":
        return <CreditCard size={18} />;
      case "Bank Transfer":
        return <Building2 size={18} />;
      case "UPI":
        return <Smartphone size={18} />;
      default:
        return <DollarSign size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Donation Statement
              </h1>
              <p className="text-slate-600 font-medium">Transaction History & Management</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => alert("Export functionality")}
                className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold shadow-sm hover:shadow-md"
              >
                <Download size={20} />
                <span className="font-semibold">Export</span>
              </button>
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                <Plus size={20} />
                <span className="font-semibold">Add Donation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white border-2 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <DollarSign size={28} className="font-bold" />
              </div>
              <TrendingUp size={24} className="text-blue-200" />
            </div>
            <p className="text-blue-100 text-sm font-bold mb-1 uppercase tracking-wide">Total Donations</p>
            <h3 className="text-4xl font-extrabold">₹{totalDonations.toLocaleString()}</h3>
            <p className="text-blue-200 text-xs mt-1 font-medium">{timePeriod}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white border-2 border-indigo-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Users size={28} className="font-bold" />
              </div>
            </div>
            <p className="text-indigo-100 text-sm font-bold mb-1 uppercase tracking-wide">Total Donors</p>
            <h3 className="text-4xl font-extrabold">{totalDonors}</h3>
            <p className="text-indigo-200 text-xs mt-1 font-medium">{timePeriod}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg p-6 text-white border-2 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <TrendingUp size={28} className="font-bold" />
              </div>
            </div>
            <p className="text-green-100 text-sm font-bold mb-1 uppercase tracking-wide">Successful</p>
            <h3 className="text-4xl font-extrabold">{successfulDonations}</h3>
            <p className="text-green-200 text-xs mt-1 font-medium">Transactions</p>
          </div>
        </div>

        {/* Time Period Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Filter size={20} className="text-slate-600" />
            <h3 className="text-lg font-bold text-slate-800">Filter by Period</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {["All Time", "Weekly", "Monthly", "Yearly"].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
                  timePeriod === period
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search by name, transaction ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium placeholder-slate-400"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800 font-bold"
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Bank Statement Style Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Donor Details</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Payment Method</th>
                  <th className="px-6 py-4 text-right text-sm font-bold uppercase tracking-wide">Amount</th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDonations.map((d, index) => (
                  <tr 
                    key={d.id} 
                    className={`hover:bg-blue-50 transition-all ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm font-bold text-blue-700">
                        {d.transactionId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-800">
                        <Calendar size={16} className="text-slate-500" />
                        <div>
                          <div className="font-bold text-sm text-slate-900">{d.date}</div>
                          <div className="text-xs text-slate-600 font-semibold">{d.time}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-slate-900 text-base">{d.name}</div>
                        <div className="text-sm text-slate-600 font-medium">{d.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                                              <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                          {getPaymentIcon(d.paymentMethod)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{d.paymentMethod}</div>
                          <div className="text-xs text-slate-600 font-semibold">****{d.cardLast4}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-extrabold text-xl text-green-700">
                        ₹{d.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide
                        ${d.status === 'Success' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 
                          d.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' : 
                          'bg-red-100 text-red-800 border-2 border-red-300'}`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(d)}
                          className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="p-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredDonations.length === 0 && (
            <div className="text-center py-16">
              <DollarSign size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No donations found</h3>
              <p className="text-slate-600 font-medium">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center rounded-t-2xl shadow-lg">
                <h2 className="text-2xl font-bold">
                  {editingDonation ? "Edit Donation" : "Add New Donation"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white/20 transition-colors p-2 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Donor Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Donor Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
                    placeholder="Enter donor name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
                    placeholder="donor@example.com"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Donation Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 font-bold text-lg">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-bold text-lg"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
                    />
                  </div>
                </div>

                {/* Payment Method and Card Last 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Payment Method *
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-slate-800 font-bold"
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Last 4 Digits *
                    </label>
                    <input
                      type="text"
                      name="cardLast4"
                      value={formData.cardLast4}
                      onChange={handleInputChange}
                      required
                      maxLength="4"
                      pattern="[0-9]{4}"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-bold text-lg"
                      placeholder="1234"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Transaction Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-slate-800 font-bold"
                  >
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                {/* Transaction ID Display (if editing) */}
                {editingDonation && (
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                    <label className="block text-sm font-bold text-blue-900 mb-1">
                      Transaction ID
                    </label>
                    <div className="font-mono text-blue-900 font-bold text-lg">
                      {editingDonation.transactionId}
                    </div>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border-2 border-slate-400 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-lg hover:shadow-xl"
                  >
                    {editingDonation ? "Update Donation" : "Add Donation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-700 font-bold text-base">
              Showing <span className="font-extrabold text-slate-900 text-lg">{filteredDonations.length}</span> of{" "}
              <span className="font-extrabold text-slate-900 text-lg">{donations.length}</span> donations
              <span className="text-blue-600 ml-2">({timePeriod})</span>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 px-6 py-3 rounded-xl border-2 border-green-300">
              <span className="text-slate-700 font-bold">Total Amount:</span>
              <span className="text-3xl font-extrabold text-green-700">
                ₹{filteredDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
                        
                        