"use client";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import React from "react";

export default function gowshala() {
  return (
    <>
    <Headers/>
    <div className="bg-gradient-to-b from-orange-50 to-yellow-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          प्रेरित गौशालाएं
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium text-orange-50">
          श्री गोपाल परिवार संघ द्वारा अब तक की प्रेरित गौशाला की संख्या -{" "}
          <span className="font-bold">54</span>
        </p>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent_60%)]"></div>
      </section>

      {/* Table Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl border border-orange-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                <th className="py-4 px-4 text-left text-lg font-semibold border-r border-orange-300">
                  गौशाला का नाम
                </th>
                <th className="py-4 px-4 text-left text-lg font-semibold border-r border-orange-300">
                  पता
                </th>
                <th className="py-4 px-4 text-left text-lg font-semibold">
                  स्थापना वर्ष
                </th>
              </tr>
            </thead>
            <tbody>
              {gaushalasData.map((gaushala, index) => (
                <tr
                  key={index}
                  className={`text-gray-800 ${
                    index % 2 === 0
                      ? "bg-orange-100/70 hover:bg-yellow-100"
                      : "bg-yellow-100/70 hover:bg-orange-100"
                  } transition-colors duration-300`}
                >
                  <td className="py-4 px-4 border-r border-orange-200 font-medium">
                    {gaushala.name}
                  </td>
                  <td className="py-4 px-4 border-r border-orange-200">
                    {gaushala.address}
                  </td>
                  <td className="py-4 px-4 font-semibold text-orange-700">
                    {gaushala.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact Card */}
        <div className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl shadow-lg p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">हमसे संपर्क करें</h2>
          <p className="text-lg mb-6">
            यदि आप किसी गौशाला से जुड़ना चाहते हैं या नई गौशाला स्थापित करना चाहते हैं, 
            तो हमसे संपर्क करें।
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-yellow-50 transition-all duration-300"
          >
            संपर्क करें
          </a>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}

// --- Sample Data ---
const gaushalasData = [
  {
    name: "श्री राघवेन्द्र गौ आश्रम, मल्लापुर",
    address: "मल्लापुर, पोस्ट: शिकारीपुरा, तालुक: शिकारीपुरा, जिला: शिवमोग्गा",
    year: "2015",
  },
  {
    name: "कमधेनु गौ लोक, कोलदा",
    address: "कोलदा, पोस्ट: कूली मारू, तालुक: सिद्धापुर, जिला: उत्तर कन्नड़",
    year: "2016",
  },
  {
    name: "श्री कृष्ण गौ आश्रम, नेलेमावु",
    address: "नेलेमावु, पोस्ट: कंचिकाई, तालुक: सिद्धापुर, जिला: उत्तर कन्नड़",
    year: "2017",
  },
  {
    name: "श्री राघवेन्द्र गौ आश्रम, अनुले",
    address: "अनुले, पोस्ट: इंदिरानगर, तालुक: सागर, जिला: शिवमोग्गा",
    year: "2018",
  },
];
