'use client';
import { useState, useEffect, useRef } from 'react';
import API from "@/lib/api";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
// Icon components
const LockIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function PrivacyPolicy() {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const sectionsRef = useRef({});

  // Fetch privacy policy data
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await API.get("/terms-conditions");
        const data = response.data;
        
        // Sort sections by order
        const sortedSections = (data.sections || []).sort((a, b) => a.order - b.order);
        
        setPolicyData({
          ...data,
          sections: sortedSections
        });
        
        // Set first section as active
        if (sortedSections.length > 0) {
          setActiveSection(0);
        }
      } catch (err) {
        console.error("Error fetching policy:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  // Smooth scroll functionality
  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(index);
      setMobileNavOpen(false);
    }
  };

  // Scrollspy effect
  useEffect(() => {
    if (!policyData?.sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setActiveSection(index);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );

    policyData.sections.forEach((_, index) => {
      const el = document.getElementById(`section-${index}`);
      if (el) observer.observe(el);
    });

    return () => {
      policyData.sections.forEach((_, index) => {
        const el = document.getElementById(`section-${index}`);
        if (el) observer.unobserve(el);
      });
    };
  }, [policyData]);

  const TableOfContents = () => {
    if (!policyData?.sections) return null;

    return (
      <nav className="space-y-1">
        {policyData.sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`group flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-200 ${
              activeSection === index
                ? 'bg-green-100 font-semibold text-orange-500'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className={`mr-3 h-2 w-2 rounded-full ${activeSection === index ? 'bg-green-500' : 'bg-transparent group-hover:bg-gray-300'}`}></span>
            {section.title}
          </button>
        ))}
      </nav>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading Privacy Policy...</p>
        </div>
      </div>
    );
  }

  if (!policyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Privacy Policy not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gray-50">
        {/* Header Banner */}
        <header className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <LockIcon />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              {policyData.title || 'Privacy Policy'}
            </h1>
            {policyData.subtitle && (
              <p className="mx-auto mt-4 max-w-3xl text-lg text-green-100">
                {policyData.subtitle}
              </p>
            )}
            {policyData.lastUpdated && (
              <p className="mt-4 text-sm text-green-200">
                Last Updated: {new Date(policyData.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Desktop Table of Contents (Sticky) */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Table of Contents</h2>
                <TableOfContents />
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9">

              {/* Mobile Table of Contents (Accordion) */}
              <div className="mb-8 lg:hidden">
                <div className="rounded-xl border bg-white shadow-sm">
                  <button
                    onClick={() => setMobileNavOpen(!isMobileNavOpen)}
                    className="flex w-full items-center justify-between p-4 text-lg font-bold text-gray-900"
                    aria-expanded={isMobileNavOpen}
                  >
                    <span>Table of Contents</span>
                    <div className={`transform transition-transform duration-300 ${isMobileNavOpen ? 'rotate-180' : ''}`}>
                      <ChevronDownIcon />
                    </div>
                  </button>
                  {isMobileNavOpen && (
                    <div className="border-t p-4">
                      <TableOfContents />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Policy Sections */}
              <div className="space-y-12">
                {policyData.sections.map((section, index) => (
                  <section 
                    key={section.id} 
                    id={`section-${index}`}
                    data-index={index}
                    className="scroll-mt-20"
                  >
                    <div className="flex items-center mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-white">
                        {index + 1}
                      </span>
                      <h2 className="ml-4 text-3xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    <article className="prose prose-lg max-w-none text-gray-700 prose-a:text-green-600 hover:prose-a:text-green-700">
                      <div className="whitespace-pre-line">
                        {section.content}
                      </div>
                    </article>
                  </section>
                ))}

                {/* Contact Section */}
                {policyData.contact && (
                  <section className="scroll-mt-20 border-t-4 border-yellow-400 pt-8">
                    <div className="flex items-center mb-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-white">
                        <MailIcon />
                      </span>
                      <h2 className="ml-4 text-3xl font-bold text-gray-900">
                        Contact Us
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {policyData.contact.email && (
                        <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-yellow-500">
                              <MailIcon />
                            </div>
                            <h4 className="font-semibold text-gray-800">Email Us</h4>
                          </div>
                          <p className="text-gray-500 text-sm mb-2">For any privacy concerns</p>
                          <a 
                            href={`mailto:${policyData.contact.email}`} 
                            className="font-medium text-yellow-500 break-all group-hover:underline"
                          >
                            {policyData.contact.email}
                          </a>
                        </div>
                      )}

                      {policyData.contact.phone && (
                        <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-yellow-500">
                              <PhoneIcon />
                            </div>
                            <h4 className="font-semibold text-gray-800">Call Us</h4>
                          </div>
                          {policyData.contact.phoneHours && (
                            <p className="text-gray-500 text-sm mb-2">{policyData.contact.phoneHours}</p>
                          )}
                          <a 
                            href={`tel:${policyData.contact.phone}`} 
                            className="font-medium text-yellow-500 group-hover:underline"
                          >
                            {policyData.contact.phone}
                          </a>
                        </div>
                      )}

                      {policyData.contact.address && (
                        <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg sm:col-span-2">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-yellow-500">
                              <MapPinIcon />
                            </div>
                            <h4 className="font-semibold text-gray-800">Mailing Address</h4>
                          </div>
                          <p className="text-gray-500 text-sm mb-2">Send us mail</p>
                          <address className="not-italic text-gray-600 whitespace-pre-line">
                            {policyData.contact.address}
                          </address>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
}