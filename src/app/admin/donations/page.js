"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, 
  Plus, 
  Search, 
  X, 
  DollarSign, 
  Users, 
  TrendingUp,
  Calendar,
  CreditCard,
  Building2,
  Smartphone,
  Filter
} from "lucide-react";
import API from "@/lib/api";
import { FaRupeeSign } from "react-icons/fa";

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [timePeriod, setTimePeriod] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDonors: 0,
    successfulDonations: 0
  });
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    email: "",
    pan: ""
  });

  // Fetch donations with pagination and filters
  useEffect(() => {
    fetchDonations();
  }, [currentPage, itemsPerPage, searchTerm, filterStatus, timePeriod]);

  // Fetch stats separately
  useEffect(() => {
    fetchStats();
  }, [searchTerm, filterStatus, timePeriod]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });

      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus !== 'All') params.append('status', filterStatus);
      if (timePeriod !== 'All Time') params.append('timePeriod', timePeriod);

      const response = await API.get(`/donations?${params.toString()}`);
      
      if (response.data) {
        setDonations(response.data.donations || []);
        setTotalCount(response.data.total || 0);
      } else {
        alert('Failed to fetch Donations');
      }
    } catch (error) {
      console.error('Error fetching Donations:', error);
      alert('Error fetching Donations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus !== 'All') params.append('status', filterStatus);
      if (timePeriod !== 'All Time') params.append('timePeriod', timePeriod);

      const response = await API.get(`/donations/stats?${params.toString()}`);
      
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, filterStatus, timePeriod]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

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
    setFormData({
      name: "",
      amount: "",
      email: "",
      pan: ""
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle submit - Call API to add donation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.post('/donations', {
        ...formData,
        amount: Number(formData.amount)
      });
      
      if (response.data) {
        alert('Donation initiated successfully! Redirecting to payment...');
        // Redirect to PhonePe payment URL
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        }
        closeModal();
      } else {
        alert('Failed to initiate donation');
      }
    } catch (error) {
      console.error('Error adding donation:', error);
      alert('Error initiating donation. Please try again.');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation record?")) {
      try {
        await API.delete(`/donations/${id}`);
        alert('Donation deleted successfully!');
        fetchDonations();
        fetchStats();
      } catch (error) {
        console.error('Error deleting donation:', error);
        alert('Error deleting donation. Please try again.');
      }
    }
  };

  // Get payment method icon
  const getPaymentIcon = (method) => {
    switch(method?.toLowerCase()) {
      case "credit card":
      case "debit card":
        return <CreditCard size={18} />;
      case "bank transfer":
        return <Building2 size={18} />;
      case "upi":
      case "phonepe":
        return <Smartphone size={18} />;
      default:
        return <FaRupeeSign size={18} />;
    }
  };

 return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">
                Donation Statement
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium">Transaction History & Management</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-white border-2 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-sm">
                <FaRupeeSign size={16} className="sm:text-lg font-bold" />
              </div>
              <TrendingUp size={20} className="sm:w-6 sm:h-6 text-blue-200" />
            </div>
            <p className="text-blue-100 text-xs sm:text-sm font-bold mb-1 uppercase tracking-wide">Total Donations</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">₹{stats.totalDonations.toLocaleString()}</h3>
            <p className="text-blue-200 text-[10px] sm:text-xs mt-1 font-medium">{timePeriod}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-white border-2 border-indigo-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-sm">
                <Users size={24} className="sm:w-7 sm:h-7 font-bold" />
              </div>
            </div>
            <p className="text-indigo-100 text-xs sm:text-sm font-bold mb-1 uppercase tracking-wide">Total Donors</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{stats.totalDonors}</h3>
            <p className="text-indigo-200 text-[10px] sm:text-xs mt-1 font-medium">{timePeriod}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-white border-2 border-green-500 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-sm">
                <TrendingUp size={24} className="sm:w-7 sm:h-7 font-bold" />
              </div>
            </div>
            <p className="text-green-100 text-xs sm:text-sm font-bold mb-1 uppercase tracking-wide">Successful</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{stats.successfulDonations}</h3>
            <p className="text-green-200 text-[10px] sm:text-xs mt-1 font-medium">Transactions</p>
          </div>
        </div>

        {/* Time Period Filter Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-slate-200">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Filter size={18} className="sm:w-5 sm:h-5 text-slate-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-800">Filter by Period</h3>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            {["All Time", "Weekly", "Monthly", "Yearly"].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all shadow-md hover:shadow-lg ${
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
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search by name, transaction ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium placeholder-slate-400"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800 font-bold"
            >
              <option value="All">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Bank Statement Style Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          {loading ? (
            <div className="text-center py-12 sm:py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">Loading donations...</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wide">Transaction ID</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wide">Date & Time</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wide">Donor Details</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wide">Payment Method</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-bold uppercase tracking-wide">Amount</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-bold uppercase tracking-wide">Status</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-bold uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {donations.map((d, index) => (
                      <tr 
                        key={d.id} 
                        className={`hover:bg-blue-50 transition-all ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                      >
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="font-mono text-xs md:text-sm font-bold text-blue-700">
                            {d.transactionId}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2 text-slate-800">
                            <Calendar size={14} className="md:w-4 md:h-4 text-slate-500" />
                            <div>
                              <div className="font-bold text-xs md:text-sm text-slate-900">{d.date}</div>
                              <div className="text-[10px] md:text-xs text-slate-600 font-semibold">{d.time}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div>
                            <div className="font-bold text-slate-900 text-sm md:text-base">{d.name}</div>
                            <div className="text-xs md:text-sm text-slate-600 font-medium">{d.email}</div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-blue-700 text-sm">
                              {getPaymentIcon(d.paymentMethod)}
                            </div>
                            <div>
                              <div className="text-xs md:text-sm font-bold text-slate-900 capitalize">{d.paymentMethod}</div>
                              <div className="text-[10px] md:text-xs text-slate-600 font-semibold">PAN-{d.cardLast4}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                          <div className="font-extrabold text-lg md:text-xl text-green-700">
                            ₹{Number(d.amount).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                          <span className={`inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide
                            ${d.status.toLowerCase() === 'success' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 
                              d.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' : 
                              'bg-red-100 text-red-800 border-2 border-red-300'}`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDelete(d.id)}
                              className="p-2 md:p-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden divide-y divide-slate-200">
                {donations.map((d) => (
                  <div key={d.id} className="p-4 hover:bg-blue-50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base text-slate-900 mb-1">{d.name}</div>
                        <div className="text-xs text-slate-600 font-medium truncate">{d.email}</div>
                        <div className="font-mono text-xs text-blue-700 font-bold mt-1">{d.transactionId}</div>
                      </div>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-md ml-2 flex-shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-slate-500 font-semibold mb-1">Date & Time</div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-slate-500" />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{d.date}</div>
                            <div className="text-[10px] text-slate-600">{d.time}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold mb-1">Payment</div>
                        <div className="flex items-center gap-1.5">
                          <div className="bg-blue-100 p-1 rounded text-blue-700 text-xs">
                            {getPaymentIcon(d.paymentMethod)}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 capitalize">{d.paymentMethod}</div>
                            <div className="text-[10px] text-slate-600">PAN-{d.cardLast4}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${d.status.toLowerCase() === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 
                          d.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 
                          'bg-red-100 text-red-800 border border-red-300'}`}
                      >
                        {d.status}
                      </span>
                      <div className="font-extrabold text-xl text-green-700">
                        ₹{Number(d.amount).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {donations.length === 0 && !loading && (
                <div className="text-center py-12 sm:py-16">
                  <FaRupeeSign size={48} className="sm:text-6xl mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">No donations found</h3>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mt-4 sm:mt-6 border border-slate-200">
            <div className="flex flex-col gap-4">
              {/* Items per page selector - Mobile First */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm text-slate-700 font-bold">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800 font-bold"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">per page</span>
                </div>

                {/* Page info */}
                <div className="text-xs sm:text-sm text-slate-700 font-bold">
                  Page <span className="text-blue-600 text-sm sm:text-lg">{currentPage}</span> of{" "}
                  <span className="text-blue-600 text-sm sm:text-lg">{totalPages}</span>
                </div>
              </div>

              {/* Pagination buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
                {/* First/Previous */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      currentPage === 1
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-md hover:shadow-lg"
                    }`}
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      currentPage === 1
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-md hover:shadow-lg"
                    }`}
                  >
                    Previous
                  </button>
                </div>
                
                {/* Page numbers - Hidden on mobile */}
                <div className="hidden md:flex gap-2 flex-wrap justify-center">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-105"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span key={pageNum} className="px-2 flex items-center text-slate-500 text-xs sm:text-sm">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next/Last */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      currentPage === totalPages
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-md hover:shadow-lg"
                    }`}
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      currentPage === totalPages
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-md hover:shadow-lg"
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>

              {/* Showing info */}
              <div className="text-center text-xs sm:text-sm text-slate-600 font-medium">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
                {totalCount} donations
              </div>
            </div>
          </div>
        )}

        {/* Summary Footer */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mt-4 sm:mt-6 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm md:text-base text-slate-700 font-bold text-center md:text-left">
              Showing <span className="font-extrabold text-slate-900 text-sm sm:text-base md:text-lg">{donations.length}</span> donations
              <span className="text-blue-600 ml-2">({timePeriod})</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-50 to-green-100 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-green-300 w-full md:w-auto justify-center">
              <span className="text-xs sm:text-sm text-slate-700 font-bold">Total Amount:</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-green-700">
                ₹{stats.totalDonations.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}