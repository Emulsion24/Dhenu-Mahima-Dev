import { useState } from "react";

// Modern, detailed SVG icons
const OmIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L15.5 8.5L22 9.5L17 14.5L18 21L12 18L6 21L7 14.5L2 9.5L8.5 8.5L12 2Z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const CowIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12c0-2 1-4 2-5l2-1c1 0 2 1 3 1h2c1 0 2-1 3-1l2 1c1 1 2 3 2 5v4c0 2-2 4-4 4h-8c-2 0-4-2-4-4v-4z" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <path d="M8 8c-1-1-2-2-3-2M16 8c1-1 2-2 3-2" />
  </svg>
);

export default function FamilySection() {
  const [hoveredCard, setHoveredCard] = useState(null);
 const handleCardClick = (link) => {
    console.log(`Navigating to: ${link}`);
    window.location.href = link;
  };
  const cards = [
    {
      id: 1,
      logo: "/logo/logo1.png",
      title: "हमारा गोपाल परिवार",
      icon: OmIcon,
      gradient: "from-orange-500 to-red-500",
      link:"/gopal-pariwar"
    },
    {
      id: 2,
      logo: "/logo/logo10.png",
      title: "हमारी पदयात्राएं",
      icon: CowIcon,
      gradient: "from-amber-500 to-orange-500",
      link:"https://dhenudhamfoundation.com/"
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-600 to-orange-500">
       <div className="absolute bottom-0 left-0 right-0 rotate-180">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
                </svg>
         </div>

         {/* another page devider */}
          <div className="absolute top-0 left-0 right-0">
                 <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fffbeb" opacity="0.3"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb" opacity="0.5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#fffbeb" opacity="0.7"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#fffbeb"></path>
                </svg>
         </div>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Modern Heading */}
        <div className="mb-10 lg:mb-16">
  <div className="relative px-8 py-6 flex items-center justify-center gap-4 max-w-3xl mx-auto">
    <svg 
      className="absolute inset-0 w-full h-full" 
      viewBox="0 0 1688 159" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M1504.67 23.3789H844V79.0889H1688C1661.24 78.0941 1601.52 65.5594 1576.68 23.3789C1551.84 -18.8016 1518.32 5.80369 1504.67 23.3789Z" fill="url(#paint0_linear_95_20)"/>
      <path d="M1504.67 23.3789H844V79.0889H1688C1661.24 78.0941 1601.52 65.5594 1576.68 23.3789C1551.84 -18.8016 1518.32 5.80369 1504.67 23.3789Z" fill="url(#paint1_linear_95_20)"/>
      <path d="M1504.67 134.799H844V79.0889H1688C1661.24 80.0837 1601.52 92.6184 1576.68 134.799C1551.84 176.979 1518.32 152.374 1504.67 134.799Z" fill="url(#paint2_linear_95_20)"/>
      <path d="M1504.67 134.799H844V79.0889H1688C1661.24 80.0837 1601.52 92.6184 1576.68 134.799C1551.84 176.979 1518.32 152.374 1504.67 134.799Z" fill="url(#paint3_linear_95_20)"/>
      <path d="M183.335 23.29H844V79H6.10352e-05C26.757 78.0052 86.4811 65.4705 111.322 23.29C136.163 -18.8905 169.681 5.71482 183.335 23.29Z" fill="url(#paint4_linear_95_20)"/>
      <path d="M183.335 135.415H844V79H6.10352e-05C26.757 80.0074 86.4811 92.7008 111.322 135.415C136.163 178.13 169.681 153.213 183.335 135.415Z" fill="url(#paint5_linear_95_20)"/>
      <defs>
        <linearGradient id="paint0_linear_95_20" x1="844" y1="39.5889" x2="1688" y2="39.5889" gradientUnits="userSpaceOnUse">
          <stop stopColor="#571710"/>
          <stop offset="1" stopColor="#732812"/>
        </linearGradient>
        <linearGradient id="paint1_linear_95_20" x1="844" y1="39.5889" x2="1688" y2="39.5889" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
        <linearGradient id="paint2_linear_95_20" x1="844" y1="118.589" x2="1688" y2="118.589" gradientUnits="userSpaceOnUse">
          <stop stopColor="#571710"/>
          <stop offset="1" stopColor="#737373"/>
        </linearGradient>
        <linearGradient id="paint3_linear_95_20" x1="844" y1="118.589" x2="1688" y2="118.589" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
        <linearGradient id="paint4_linear_95_20" x1="844" y1="39.5" x2="0" y2="39.5" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
        <linearGradient id="paint5_linear_95_20" x1="844" y1="119" x2="0" y2="119" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#EE6C1B"/>
          <stop offset="1" stopColor="#891313"/>
        </linearGradient>
      </defs>
    </svg>
    
    <img src="/images/Heading.png" alt="" className="relative z-10 w-20 h-20 lg:w-20 lg:h-20"
       style={{ 
        filter: 'brightness(0) invert(1)', 
        transform: 'rotate(180deg) scaleY(-1)' 
        }}
      onError={(e) => e.currentTarget.style.display = 'none'} />
    <h1 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide text-center drop-shadow-lg">
      गोपाल परिवार
    </h1>
    <img src="/images/Heading.png" alt="" className="relative z-10 w-20 h-20 lg:w-20 lg:h-20"
      style={{ filter: 'brightness(0) invert(1)' }}
      onError={(e) => e.currentTarget.style.display = 'none'} />
  </div>
</div>


        {/* Logo and Button Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 xl:gap-32">
          {cards.map((card) => {
            const IconComponent = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <div
                onClick={() => handleCardClick(card.link)}
                key={card.id}
                className="relative group flex flex-col items-center gap-8"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Logo Container */}
                <div className="relative">
                  {/* Animated Ring */}
                  <div
                    className={`
                      absolute inset-0 rounded-full 
                      bg-gradient-to-r ${card.gradient}
                      blur-md opacity-0 group-hover:opacity-75
                      transition-opacity duration-500
                      animate-spin-slow
                    `}
                    style={{ transform: 'scale(1.1)' }}
                  />

                  {/* Logo */}
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-white/70 group-hover:ring-8 group-hover:ring-white/90 transition-all duration-500 bg-white/80 backdrop-blur-sm shadow-2xl">
                    <img
                      src={card.logo}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      loading="lazy"
                    />
                  </div>

                  {/* Decorative Dots */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-bounce" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>

                {/* Button */}
                <button
                  className={`
                    relative px-8 py-4
                    flex items-center justify-center gap-3
                    font-bold text-base md:text-lg
                    rounded-2xl overflow-hidden
                    bg-gradient-to-r ${card.gradient}
                    text-white
                    shadow-xl hover:shadow-2xl
                    transition-all duration-300
                    transform hover:scale-105
                    group/button
                    min-w-[280px]
                  `}
                  aria-label={card.title}
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700" />

                  {/* Icon */}
                  
                  {/* Text */}
                  <span className="relative z-10">{card.title}</span>

                  {/* Arrow Icon */}
                  <svg
                    className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/button:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                {/* Decorative Background Glow */}
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-orange-200 to-red-200 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}