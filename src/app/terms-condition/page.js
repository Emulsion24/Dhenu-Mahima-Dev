'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Headers from '@/components/Header';

// Icon components for visual enhancement
// Chakra Icon - symbolizing order, energy, and spiritual journey
const ChakraIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m-9-9h18M5.636 5.636l12.728 12.728M5.636 18.364l12.728-12.728" />
    </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('agreement');
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const sections = [
    { id: 'agreement', title: 'Our Sacred Agreement' },
    { id: 'accounts', title: 'Your Seva Account' },
    { id: 'offerings', title: 'Offerings & Payments' },
    { id: 'products', title: 'Prasadam & Products' },
    { id: 'cancellations', title: 'Cancellations & Refunds' },
    { id: 'user-conduct', title: 'Community Dharma' },
    { id: 'ip-rights', title: 'Our Sacred Content' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes', title: 'Evolving With Grace' },
    { id: 'contact', title: 'Connect With Us' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setMobileNavOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
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

  const TableOfContents = () => (
    <nav className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`group flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-200 ${
            activeSection === section.id
              ? 'bg-green-100 font-semibold text-orange-500'
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
    <Headers/>
      <Head>
        <title>Terms of Seva - Acow Sheva</title>
        <meta name="description" content="Understand the terms of service and community guidelines for participating in the Acow Sheva mission." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <ChakraIcon />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Terms of Seva (Service)</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-green-100">
              A guide to our shared values and commitments as we serve Gaumata (Mother Cow) together.
            </p>
            <p className="mt-4 text-sm text-green-200">Last Updated: October 5, 2025</p>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Table of Contents</h2>
                <TableOfContents />
              </div>
            </aside>

            <div className="lg:col-span-9">
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
                      <TableOfContents />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <section key={section.id} id={section.id} className="scroll-mt-20">
                    <div className="flex items-center mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-white">
                        {index + 1}
                      </span>
                      <h2 className="ml-4 text-3xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    <article className="prose prose-lg max-w-none text-gray-700 prose-a:text-green-600 hover:prose-a:text-green-700">
                      {section.id === 'agreement' && (
                        <p>Jai Gaumata! Welcome to Acow Sheva. By accessing our website, making offerings, or acquiring prasadam, you enter into this sacred covenant, our Terms of Seva. This agreement ensures that our shared journey, dedicated to the welfare of Mother Cow, is conducted with respect, harmony, and devotion. If any part of these terms resonates not with your heart, we humbly request you to understand their purpose before proceeding.</p>
                      )}
                      {section.id === 'accounts' && (
                        <p>To fully partake in our community and its seva, you may establish a personal Seva Account. You are entrusted with the guardianship of your account details, and all actions originating from it shall be your responsibility. We pray that you keep your information accurate and sacred, and alert us immediately if you perceive any unauthorized entry. Your account is a bridge to our collective devotion; protect it with spiritual vigilance.</p>
                      )}
                      {section.id === 'offerings' && (
                        <p>All offerings (donations) and payments for our sacred products are channeled through secure gateways, ensuring the sanctity of your transaction. We do not retain your financial details within our direct care. By making an offering, you affirm your intention and capacity to contribute, empowering us (or our trusted facilitators) to receive your benevolent gift.</p>
                      )}
                      {section.id === 'products' && (
                        <p>The precious items available on our platform are offered as prasadam—blessed remnants from our service to Gaumata, imbued with spiritual essence. We endeavor to depict these offerings truthfully. However, as many are handcrafted or natural, subtle variations in their divine form, shade, or presence may occur, reflecting their unique origin. All prasadam is offered subject to its divine availability.</p>
                      )}
                      {section.id === 'cancellations' && (
                        <>
                          <p>We approach every interaction with deep reverence. Kindly note our considerations regarding cancellations and the return of offerings:</p>
                          <ul>
                            <li><strong>Donations/Offerings:</strong> As these are consecrated acts of devotion for the ongoing care of our Gaumata and the functioning of the Gaushala, they are generally considered final and non-refundable. Your generosity is a profound blessing.</li>
                            <li><strong>Prasadam/Products:</strong> Should you wish to alter an order for prasadam, please communicate your intention within 24 hours of its placement. We will strive to accommodate your request if the offering has not yet embarked on its journey to you. Returns and refunds for prasadam will be contemplated with discernment, provided the item is returned in its original, untouched state, fit for re-offering.</li>
                          </ul>
                        </>
                      )}
                      {section.id === 'user-conduct' && (
                        <>
                          <p>Our digital temple is a sanctuary for all who honor Gaumata. We implore you, as a cherished member of our extended family, to uphold this Community Dharma:</p>
                          <ul>
                            <li>Conduct yourself with kindness, respect, and unwavering compassion towards all.</li>
                            <li>Refrain from using this sacred space for any actions that are unlawful, divisive, or deceptive.</li>
                            <li>Do not utter or propagate words that are hurtful, offensive, or contrary to the spirit of devotion.</li>
                            <li>Seek not to disturb the sanctity or functionality of our digital abode.</li>
                          </ul>
                          <p>We reserve the right, with a heavy heart, to respectfully dissociate any account that deviates from this Community Dharma.</p>
                        </>
                      )}
                      {section.id === 'ip-rights' && (
                        <p>All divine expressions on this platform—be it sacred texts, evocative imagery, emblematic symbols, or digital creations—are the spiritual property of Acow Sheva or our revered contributors, safeguarded by universal laws of creation. These offerings are presented for your personal reflection and spiritual nourishment. Any replication or dissemination without our humble consent is considered an act against the sacred trust.</p>
                      )}
                      {section.id === 'liability' && (
                        <p>We perform our seva with utmost sincerity and dedication. However, our digital platform and its offerings are presented as is, without explicit guarantees. In moments of unforeseen challenge, Acow Sheva shall not be held responsible for any direct or indirect hardship arising from your interaction with our services. Our commitment extends to the highest dharma, within the bounds of earthly laws.</p>
                      )}
                      {section.id === 'governing-law' && (
                        <p>This sacred pact shall be guided by the timeless principles and statutes of the land of India. Any spiritual or temporal disagreements arising from these terms shall be humbly presented before the righteous courts situated in Maharashtra, India.</p>
                      )}
                      {section.id === 'changes' && (
                        <p>As the cycles of nature bring forth new beginnings, so too may our Terms of Seva evolve. We reserve the divine prerogative to update or refine these terms at any moment. We shall announce such changes by updating the Last Updated date, and your continued participation signifies your acceptance of this evolving grace.</p>
                      )}
                      {section.id === 'contact' && (
                        <div className="not-prose grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg">
                            <h4 className="font-semibold text-gray-800">Email Us</h4>
                            <p className="text-gray-500 text-sm mb-2">For any questions or concerns</p>
                            <a href="mailto:seva@acowsheva.com" className="font-medium text-yellow-400 break-all group-hover:underline">seva@acowsheva.com</a>
                          </div>
                          <div className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg">
                            <h4 className="font-semibold text-gray-800">Call Us</h4>
                            <p className="text-gray-500 text-sm mb-2">Mon-Fri, 9am - 5pm IST</p>
                            <a href="tel:+911234567890" className="font-medium text-yellow-400 group-hover:underline">+91 123 456 7890</a>
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
      <Footer/>
    </>
  );
}