'use client';
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// Icon components for better visual representation
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

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const sectionsRef = useRef({});

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Your Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'children-privacy', title: 'Children\'s Privacy' },
    { id: 'changes', title: 'Changes to Policy' },
    { id: 'contact', title: 'Contact Us' },
  ];

  // Smooth scroll functionality
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setMobileNavOpen(false); // Close mobile nav on selection
    }
  };

  // Scrollspy effect to highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 } // Adjust rootMargin to trigger highlight when section is in view
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const TableOfContents = ({ isMobile = false }) => (
    <nav className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`group flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-200 ${
            activeSection === section.id
              ? 'bg-green-100 font-semibold text-green-800'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <span className={`mr-3 h-2 w-2 rounded-full ${activeSection === section.id ? 'bg-green-500' : 'bg-transparent group-hover:bg-gray-300'}`}></span>
          {section.title}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <Head>
        <title>Privacy Policy - Acow Sheva</title>
        <meta name="description" content="Privacy Policy for Acow Sheva - Learn how we collect, use, and protect your personal information" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header Banner */}
        <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <LockIcon />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Privacy Policy</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-green-100">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="mt-4 text-sm text-green-200">Last Updated: October 5, 2025</p>
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
                    <ChevronDownIcon className={`transform transition-transform duration-300 ${isMobileNavOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileNavOpen && (
                    <div className="border-t p-4">
                      <TableOfContents isMobile />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <section key={section.id} id={section.id} className="scroll-mt-20">
                    <div className="flex items-center mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-xl font-bold text-white">
                        {index + 1}
                      </span>
                      <h2 className="ml-4 text-3xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    {/* Tailwind 'prose' provides beautiful typography for long-form content */}
                    <article className="prose prose-lg max-w-none text-gray-700 prose-a:text-green-600 hover:prose-a:text-green-700">
                      {section.id === 'introduction' && (
                        <>
                          <p>Welcome to Acow Sheva ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.</p>
                          <p>When you use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important.</p>
                        </>
                      )}
                      {section.id === 'information-collection' && (
                        <>
                          <p>We collect personal information that you voluntarily provide to us when you register on the services, express an interest in obtaining information about us or our products and services, when you participate in activities on the services, or otherwise when you contact us.</p>
                           <ul>
                            <li><strong>Personal Information You Disclose to Us:</strong> Name, email address, phone number, and payment information.</li>
                            <li><strong>Information Automatically Collected:</strong> IP address, browser type, device information, operating system, and usage data.</li>
                          </ul>
                        </>
                      )}
                      {section.id === 'information-use' && (
                        <p>We use the information we collect or receive: to facilitate account creation and logon process, to post testimonials, to manage user accounts, to send administrative information to you, to protect our Services, to respond to user inquiries/offer support to users, and for other business purposes like data analysis and identifying usage trends.</p>
                      )}
                      {section.id === 'information-sharing' && (
                        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.</p>
                      )}
                      {section.id === 'data-security' && (
                        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
                      )}
                      {section.id === 'cookies' && (
                        <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
                      )}
                      {section.id === 'your-rights' && (
                        <p>In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. To make such a request, please use the contact details provided below.</p>
                      )}
                      {section.id === 'children-privacy' && (
                        <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.</p>
                      )}
                      {section.id === 'changes' && (
                        <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
                      )}
                      {section.id === 'contact' && (
                        <div className="not-prose grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg">
                                <h4 className="font-semibold text-gray-800">Email Us</h4>
                                <p className="text-gray-500 text-sm mb-2">For any privacy concerns</p>
                                <a href="mailto:privacy@acowsheva.com" className="font-medium text-green-600 break-all group-hover:underline">privacy@acowsheva.com</a>
                            </div>
                            <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg">
                                <h4 className="font-semibold text-gray-800">Call Us</h4>
                                <p className="text-gray-500 text-sm mb-2">Mon-Fri, 9am - 5pm IST</p>
                                <a href="tel:+911234567890" className="font-medium text-green-600 group-hover:underline">+91 123 456 7890</a>
                            </div>
                             <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg sm:col-span-2">
                                <h4 className="font-semibold text-gray-800">Mailing Address</h4>
                                <p className="text-gray-500 text-sm mb-2">Send us mail</p>
                                <address className="not-italic text-gray-600">
                                  123 Dairy Farm Road,<br />
                                  Sheva District, Maharashtra,<br />
                                  India - 400001
                                </address>
                            </div>
                        </div>
                      )}
                    </article>
                  </section>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}