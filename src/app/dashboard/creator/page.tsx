"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import mockData from "@/mock/db.json";
import SubscriberChart from "@/components/charts/SubscriberChart";

export default function CreatorDashboard() {
  const [creator, setCreator] = useState<any>(null);

  useEffect(() => {
    const user = mockData.users.find((u) => u.role === "creator");
    setCreator(user);
  }, []);

  if (!creator)
    return (
      <div className="flex items-center justify-center h-screen bg-[#060B12] text-white text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05070A] via-[#0A1420] to-[#0E1B2A] text-white flex flex-col items-center">
      {/* Content Wrapper (adds real space from screen edges) */}
      <div className="w-full max-w-7xl px-8 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#00BFFF] bg-clip-text text-transparent">
            Welcome, {creator.name}
          </h1>
          <p className="text-gray-400 mt-2">Your Creator Dashboard</p>
        </motion.header>

        {/* Full-width Chart */}
        <DashboardCard title="📈 Subscriber Growth" glow="blue">
          <SubscriberChart data={[100000, 105000, 110000, 115000, 120000]} />
        </DashboardCard>

        {/* Bottom Row */}
        <div className="mt-10 flex flex-row flex-wrap gap-8">
          {/* Brand Offers */}
          <DashboardCard title="💼 Brand Offers" glow="gold" className="flex-1 min-w-[320px]">
            <div className="space-y-3">
              {creator.incomingOffers.map((offer: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex flex-col items-center text-center p-3 rounded-md bg-[#111E30] hover:bg-[#16263E] transition-all duration-200 border border-transparent hover:border-[#FFD700]/40"
                >
                  <span className="text-gray-200 font-medium">{offer.brand}</span>
                  <span className="font-semibold text-[#FFD700] mt-2">
                    {offer.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </DashboardCard>

          {/* Portfolio */}
          <DashboardCard title="🎥 Portfolio" glow="blue" className="flex-1 min-w-[320px]">
            <div className="space-y-3">
              {creator.portfolio.map((video: any, idx: number) => (
                <motion.a
                  key={idx}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="block p-3 rounded-lg bg-gradient-to-br from-[#111E30] to-[#0C1522] hover:from-[#16263E] hover:to-[#111E30] border border-transparent hover:border-[#00BFFF]/40 transition-all duration-300 text-center"
                >
                  <p className="font-medium text-gray-100">{video.title}</p>
                  <p className="text-sm text-gray-500 mt-1">View Video</p>
                </motion.a>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Card Component */
function DashboardCard({
  title,
  children,
  glow,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  glow?: "gold" | "blue";
  className?: string;
}) {
  const glowColor =
    glow === "gold"
      ? "hover:shadow-[#FFD70066] hover:border-[#FFD70044]"
      : "hover:shadow-[#00BFFF66] hover:border-[#00BFFF44]";

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-[#0E1B2A]/80 backdrop-blur-md p-6 rounded-2xl border border-[#1E2A3A] shadow-xl transition-all duration-300 ${glowColor} ${className}`}
    >
      <h2 className="text-xl font-semibold mb-4 text-[#EDEDED] tracking-tight">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
