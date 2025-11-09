"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import mockData from "@/mock/db.json";

export default function CreatorProfile() {
  const params = useParams();
  const [creator, setCreator] = useState<any>(null);

  useEffect(() => {
    const creatorData = mockData.users.find(
      (u) => u.id.toString() === params.id && u.role === "creator"
    );
    setCreator(creatorData || null);
  }, [params.id]);

  if (!creator)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#020617] to-[#0a1b2e] text-gray-400 text-lg">
        Creator not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#020617] to-[#0a1b2e] text-white flex items-center justify-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl w-full bg-gradient-to-b from-[#0a0f1c]/90 to-[#0b1a33]/90 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-10 md:p-14 relative overflow-hidden"
      >
        {/* Subtle Glow Accent */}
        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_50px_rgba(176,155,88,0.05)] pointer-events-none"></div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
        >
          {/* Avatar */}
          <div className="relative group">
            <motion.img
              src={creator.avatar}
              alt={creator.name}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 group-hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#b09b58]/10 to-transparent blur-2xl opacity-60"></div>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-[#b09b58] drop-shadow-[0_4px_14px_rgba(212,175,55,0.35)]"
            >
              {creator.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-gray-300 mb-6 leading-relaxed"
            >
              {creator.bio ||
                "This creator crafts inspiring, high-quality content that captivates their audience and drives authentic engagement."}
            </motion.p>

            {/* Category & Subscribers in One Line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center md:justify-start gap-6 mt-4"
            >
              <div className="flex-1 min-w-[180px] bg-gradient-to-tr from-[#0d162a] to-[#0e1d36] rounded-xl p-4 shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(176,155,88,0.25)] text-center md:text-left transition-all duration-500">
                <p className="text-sm text-gray-400">Category</p>
                <p className="text-xl font-semibold text-[#b09b58]">
                  {creator.category}
                </p>
              </div>

              <div className="flex-1 min-w-[180px] bg-gradient-to-tr from-[#0d162a] to-[#0e1d36] rounded-xl p-4 shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(176,155,88,0.25)] text-center md:text-left transition-all duration-500">
                <p className="text-sm text-gray-400">Subscribers</p>
                <p className="text-xl font-semibold text-[#b09b58]">
                  {creator.subscribers.toLocaleString()}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="my-10 h-px bg-gradient-to-r from-transparent via-[#b09b58]/40 to-transparent"
        />

        {/* About & Performance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* About */}
          <div className="bg-gradient-to-tr from-[#0d162a] to-[#0e1d36] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(176,155,88,0.25)] transition-all duration-500">
            <h2 className="text-2xl font-semibold text-[#b09b58] mb-3">
              About
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {creator.bio ||
                "A talented and passionate creator delivering outstanding, authentic content that connects deeply with their audience."}
            </p>
          </div>

          {/* Performance */}
          <div className="bg-gradient-to-tr from-[#0d162a] to-[#0e1d36] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(176,155,88,0.25)] transition-all duration-500">
            <h2 className="text-2xl font-semibold text-[#b09b58] mb-3">
              Performance
            </h2>
            <ul className="text-gray-300 space-y-2">
              <li>
                ✨ Engagement Rate:{" "}
                <span className="text-[#b09b58]">7.8%</span>
              </li>
              <li>
                📈 Avg. Views: <span className="text-[#b09b58]">85K</span>
              </li>
              <li>
                💬 Avg. Comments:{" "}
                <span className="text-[#b09b58]">350+</span>
              </li>
              <li>
                🤝 Brand Collaborations:{" "}
                <span className="text-[#b09b58]">12+</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
