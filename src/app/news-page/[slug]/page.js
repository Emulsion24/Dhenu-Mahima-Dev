'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft, Clock, Eye, Loader2 } from 'lucide-react';
import Headers from "@/components/Header";
import Footer from "@/components/Footer";
import API from '@/lib/api';

// Make sure you add this in globals.css:
// @keyframes blink-red {
//   0%, 100% { opacity: 0.6; }
//   50% { opacity: 1; }
// }
// .animate-blink-red { animation: blink-red 1s infinite; }

export default function NewsDetailPage({ params }) {
  // Unwrap params using React.use()
  const { slug } = use(params); 
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchNewsData = async (id) => {
      const res=await API.get(`/news/${id}`)  // simulate API delay

      // Sample news data (replace with your actual API call)


      const sampleRelatedNews = [
        { id: 2, title: "गौशाला में आयोजित पूजन", slug: "gaushala-pooja", image: "/images/ancient.jpg", date: "12 अक्टूबर 2024", category: "धार्मिक" },
        { id: 3, title: "जैविक खेती में गोबर की भूमिका", slug: "organic-farming-seminar", image: "/images/ancient.jpg", date: "10 अक्टूबर 2024", category: "कृषि" }
      ];

       const data = res.data.data;

      setNewsData({
        id: data.id,
        title: data.title,
        titleEn: data.titleEn,
        slug: data.slug,
        excerpt: data.excerpt,
        featuredImage: data.image,
        category: data.category,
        publishedDate: data.date,
        readTime: data.readTime || "5 मिनट",
        views: data.views || 0,
        author: {
          name: data.author || "Admin",
          avatar: "/images/default-avatar.png",
          role: "लेखक"
        },
        content: data.content || [],
        tags: data.tags || [],
      });
      setRelatedNews(sampleRelatedNews);
      setLoading(false);
    };

    if (id) fetchNewsData(id);
  }, [id, slug]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = newsData?.title;
    let shareUrl = '';
    switch(platform) {
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`; break;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <>
        <Headers />
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-orange-600 animate-spin mx-auto mb-4" />
            <p className="text-xl text-gray-600">समाचार लोड हो रहा है...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!newsData) {
    return (
      <>
        <Headers />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 via-white to-amber-50">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 mb-4">समाचार नहीं मिला</p>
            <Link href="/news" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
              <ArrowLeft size={20} /> समाचार पृष्ठ पर वापस जाएं
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Headers />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> समाचार पृष्ठ पर वापस जाएं
          </Link>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={newsData.featuredImage} alt={newsData.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-6 left-6">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">{newsData.category}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 pb-16 grid lg:grid-cols-12 gap-8">
          {/* Main */}
          <div className="lg:col-span-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{newsData.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{newsData.titleEn}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Image src={newsData.author.avatar} alt={newsData.author.name} width={48} height={48} className="rounded-full" />
                <div>
                  <p className="font-semibold text-gray-900">{newsData.author.name}</p>
                  <p className="text-sm text-gray-600">{newsData.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600"><Calendar size={18} /><span className="text-sm">{newsData.publishedDate}</span></div>
              <div className="flex items-center gap-2 text-gray-600"><Clock size={18} /><span className="text-sm">{newsData.readTime} पढ़ें</span></div>
              <div className="flex items-center gap-2 text-gray-600"><Eye size={18} /><span className="text-sm">{newsData.views} views</span></div>
            </div>

            {/* Article */}
            <article className="prose prose-lg max-w-none">
              {newsData.content.map((block, index) => {
                switch(block.type) {
                  case 'paragraph': return <p key={index} className="text-gray-800 leading-relaxed mb-6 text-lg">{block.text}</p>;
                  case 'heading': return <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{block.text}</h2>;
                  case 'list': return (
                    <ul key={index} className="space-y-3 my-6">
                      {block.items.map((item,i) => <li key={i} className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm mt-1">✓</span><span className="text-gray-800 text-lg">{item}</span></li>)}
                    </ul>
                  );
                  default: return null;
                }
              })}
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-3">
              <Tag size={20} className="text-gray-600" />
              {newsData.tags.map((tag, i) => <span key={i} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-200 transition-colors cursor-pointer">{tag}</span>)}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              {/* Share */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Share2 size={20} /> इस समाचार को साझा करें</h3>
                <div className="space-y-3">
                  <button onClick={()=>handleShare('facebook')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"><Facebook size={20} /> Facebook पर साझा करें</button>
                  <button onClick={()=>handleShare('twitter')} className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"><Twitter size={20} /> Twitter पर साझा करें</button>
                  <button onClick={()=>handleShare('linkedin')} className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"><Linkedin size={20} /> LinkedIn पर साझा करें</button>
                </div>
              </div>

              {/* Related News */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">संबंधित समाचार</h3>
                <div className="space-y-4">
                  {relatedNews.map((news)=>(
                    <Link key={news.id} href={`/news-page/${news.slug}?id=${news.id}`} className="block group">
                      <div className="flex gap-3">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-orange-600 font-semibold">{news.category}</span>
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors mb-1">{news.title}</h4>
                          <p className="text-xs text-gray-600">{news.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
