'use client';

import Footer from '@/components/Footer';
import Headers from '@/components/Header';
import React from 'react';

/**
 * Instructions Section Component
 */
const InstructionsSection = () => {
  const instructionsList = [
    "कथा करवाने हेतु आयोजक स्वयं सुव्यवस्थित टेंट एवं व्यवस्थित साउंड सिस्टम की व्यवस्था करें।",
    "वक्ता के साथ आए संगीत कलाकार एवं यूट्यूब चैनल प्रसारण टीम के सात दिवस के खर्च की आयोजक व्यवस्था करें।",
    "कथा के समय तथा कथा के उपरांत वक्ता से अनावश्यक चर्चा ना करें, समय पर शयन करने दें, क्योंकि वक्ता प्रातः ब्रह्म मुहूर्त में उठते हैं।",
    "वक्ता व्यासपीठ के स्थान पर गोमयपीठ पर बिराजते हैं, अतः व्यासपीठ शब्द का प्रयोग नहीं करें, गोमयपीठ शब्द का प्रयोग करें।",
    "वक्ता जिस घर में निराश्रित गौमाता एवं नंदी बाबा को बांधा गया हो, गो-सेवा हो रही हो, उन्हीं के घर में पधरावणी करेंगे।",
    "जिस ग्राम/नगर में कथा हो रही हो, वक्त को आयोजक वहाँ के तीर्थ व मंदिर पर दर्शन हेतु ले जाए।",
    "वक्ता प्रतिदिन स्वाध्याय, धार्मिक साहित्य के साथ समाचार पत्र का अध्ययन करते हैं, अतः उपलब्धता करवाई जाये।",
    "कथा से पूर्व निकाली जाने वाली कलश यात्रा गौशाला से ही निकाले। यदि गौशाला दूरी पर है, तो एक वाहन रैली गौशाला से प्रारंभ करें और कलश यात्रा कथा स्थल के समीप किसी मंदिर, सरोवर, सरिता से प्रारंभ कर दें।",
    "कथा के दौरान वक्ता दो समय ही मुंह झूठा करते हैं। एक समय सुबह अन्न और शाम के समय फल एवं दूध लेते हैं। भोजन, फलाहार, किसी सात्विक गौभक्त के हाथ से बना हुआ ही पाते हैं।",
    "कथा पंडाल में गायमाता का बिराजना अत्यंत आवश्यक है। गो पूजन के पश्चात ही कथा प्रारंभ हो पाएगी।",
    "नित्य कथा के पश्चात गोवर्ती प्रसादी ही वितरण करवाएँ।",
    "पंडाल में प्रवेश करने वाले प्रत्येक श्रोता को पंचगव्य प्राशन करना आवश्यक है। कथा स्थल पर प्रवेश करने वाले प्रत्येक श्रोता को गोमय मिश्रण का तिलक अवश्य लगाना चाहिए।",
    "आयोजक ध्यान रखें कि मंच पर भारतीय पोशाक अर्थात् धोती कुर्ता पहने सज्जन और सनातनी वस्त्र पहनने वाली महिला ही आए।",
    "कथा पंडाल और आसपास के स्थान पर सभी प्रकार के व्यसन का प्रयोग प्रतिबंधित होना चाहिए।",
    "कथा में आए हुए सभी संतों का यथोचित सम्मान करें और करवाएँ।",
    "वक्ता कथास्थल पर समय पर पहुँचते हैं, पत्रक/पोस्टर/बैनर/निमंत्रण में लिखा समय से 7 मिनट पहले।",
    "कथा प्रारंभ होने से पहले गौमाता एवं स्थापित देवी देवताओं का पूजन गोव्रती पंडित जी से करवाएँ।",
    "कथा पंडाल में किसी भी प्रकार के जलपान, दूध, फल, रस आदि का वितरण कथा के समय नहीं होना चाहिए।",
    "आयोजक कथा वक्ता का निवास सार्वजनिक स्थान पर ही रखें।",
    "आयोजक महिला वक्ता का निवास धार्मिक सद्गृहस्थ परिवार में रखें।",
    "वक्ता प्रतिदिन कथा के दौरान स्थानीय गौशाला में पधारते हैं और स्वयं गौसेवा करते हैं।",
    "आयोजक महिला वक्ता के आवास पर पुरुषों का प्रवेश नहीं होने दें।",
    "महिला वक्ता हेतु कथा में आते-जाते समय माता बहन को अवश्य साथ रखें। पुरुष वक्ता के वाहन में माता बहन को बिठाने से बचें।",
    "वक्ता कथा के चार घंटे पूर्व मौन धारण करते हैं एवं कथा पूर्ण होने के 1 घंटे बाद दो घंटे का मौन रखते हैं।",
    "रसीद, दान पात्र, और झोली के पैसे, कथा जिस गांव में हो रही है वहाँ गोशाला में जमा कराएँ।"
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-orange-800 border-b-4 border-orange-500 pb-3 inline-block">
        कथा करवाने हेतु व्यवस्थात्मक निर्देश
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructionsList.map((instruction, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-l-4 border-orange-400 flex space-x-4 items-start"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <p className="text-gray-800 leading-relaxed flex-1 text-sm">
              {instruction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Main Page Component
 */
const GaukathaPage = () => {
  return (
    <>
    <Headers/>
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50 font-sans">
      {/* Hero Section */}
      <section className="text-center mb-16 bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 p-10 md:p-16 rounded-3xl shadow-xl border-t-4 border-orange-500">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-800 mb-4 tracking-tight leading-snug">
          भगवती गौमाता कथा
        </h1>
        <p className="text-lg md:text-xl text-gray-800 max-w-4xl mx-auto">
          भगवती गौमाता की कथा एवं अन्य कथाएं अपने गांव, नगर, महानगर, गौशाला में करवाने हेतु आवेदन करें और व्यवस्थात्मक निर्देशों का पालन सुनिश्चित करें।
        </p>
      </section>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Form Section */}
        <div className="lg:col-span-4 mb-12 lg:mb-0">
          <div className="p-8 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border border-orange-200 rounded-2xl shadow-xl lg:sticky lg:top-24">
            <h3 className="text-2xl font-bold text-orange-700 mb-6 border-b pb-3">
              कथा हेतु ऑनलाइन आवेदन
            </h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">आपका नाम</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" placeholder="पूरा नाम" required />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">संपर्क नंबर</label>
                <input type="tel" id="contact" name="contact" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" placeholder="9876543210" required />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">राज्य का चयन करें</label>
                <select id="state" name="state" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md" required>
                  <option disabled>--Select--</option>
                  <option>राजस्थान</option>
                  <option>उत्तर प्रदेश</option>
                  <option>मध्य प्रदेश</option>
                  <option>अन्य राज्य</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">शहर / गाँव</label>
                <input type="text" id="city" name="city" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" placeholder="नगर का नाम" required />
              </div>

              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 mt-6">
                आवेदन जमा करें
              </button>
            </form>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="lg:col-span-8">
          <InstructionsSection />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default GaukathaPage;
