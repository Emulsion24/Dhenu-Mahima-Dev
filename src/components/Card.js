"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Music, Newspaper, UsersRound, Book, DollarSign } from "lucide-react";

export default function Card({ title, value, link }) {
  const icons = {
    "Total Users": <Users className="w-8 h-8 text-white" />,
    "Total Songs": <Music className="w-8 h-8 text-white" />,
    News: <Newspaper className="w-8 h-8 text-white" />,
    "gopal-pariwar": <UsersRound className="w-8 h-8 text-white" />,
    "PDF Books": <Book className="w-8 h-8 text-white" />,
    "Total Donations": <DollarSign className="w-8 h-8 text-white" />,
  };

  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-green-400 to-emerald-600",
    "from-orange-400 to-red-500",
    "from-purple-500 to-pink-500",
    "from-teal-400 to-cyan-600",
    "from-pink-400 to-rose-500",
  ];

  const [gradient, setGradient] = useState(gradients[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    setGradient(gradients[randomIndex]);
  }, []);

  return (
    <Link href={link}>
      <div className={`rounded-2xl p-6 shadow-lg cursor-pointer bg-gradient-to-r ${gradient} transform transition duration-300 hover:scale-105 hover:shadow-2xl`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80 font-medium">{title}</p>
            <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            {icons[title] || <DollarSign className="w-8 h-8 text-white" />}
          </div>
        </div>
      </div>
    </Link>
  );
}
