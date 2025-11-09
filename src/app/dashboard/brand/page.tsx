"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import mockData from "@/mock/db.json";
import CreatorCard from "@/components/CreatorCard";

export default function BrandDashboard() {
  const router = useRouter();
  const [creators, setCreators] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");

  useEffect(() => {
    const allCreators = mockData.users.filter((u) => u.role === "creator");
    setCreators(allCreators);
  }, []);

  const categories = ["All", ...new Set(creators.map((c) => c.category))];
  const subsRange = ["All", "<50K", "50K-100K", ">100K"];

  const filteredCreators = creators.filter((c) => {
    const matchesText = c.name.toLowerCase().includes(filterText.toLowerCase());
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
    let matchesSubs = true;
    if (subFilter === "<50K") matchesSubs = c.subscribers < 50000;
    else if (subFilter === "50K-100K")
      matchesSubs = c.subscribers >= 50000 && c.subscribers <= 100000;
    else if (subFilter === ">100K") matchesSubs = c.subscribers > 100000;
    return matchesText && matchesCategory && matchesSubs;
  });

  const handleCreatorClick = (creatorId: string | number) => {
    router.push(`/creator/${creatorId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#020617] to-[#0a1b2e] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-10 text-center text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] text-[#b09b58] drop-shadow-[0_6px_18px_rgba(212,175,55,0.45)]"
        >
          Creator Marketplace
        </motion.h1>

        {/* Search + Filters in a single horizontal line (no wrap, horizontal scroll on small screens) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="flex flex-row items-center gap-4 mb-12 bg-gradient-to-br from-[#0a0f1c]/70 to-[#091d35]/70 border border-blue-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg overflow-x-auto flex-nowrap"
        >
          {/* Search Input = 70% */}
          <div className="relative w-[70%] min-w-0">
            
            <input
              type="text"
              autoComplete="off"
              placeholder="🔍Search creators..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[#0b1120] text-white focus:outline-none transition-all duration-300"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Category Filter = 15% */}
          <div className="w-[15%] min-w-[120px] flex-shrink-0">
            <select
              className="w-full bg-[#0b1120] border border-transparent text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subscriber Filter = 15% */}
          <div className="w-[15%] min-w-[120px] flex-shrink-0">
            <select
              className="w-full bg-[#0b1120] border border-transparent text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              value={subFilter}
              onChange={(e) => setSubFilter(e.target.value)}
            >
              {subsRange.map((range, i) => (
                <option key={i} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Creator Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-12 mx-auto"
        >
          {filteredCreators.length ? (
            filteredCreators.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                onClick={() => handleCreatorClick(c.id)}
                className="cursor-pointer"
              >
                <div className="w-[260px] md:w-[280px] lg:w-[300px]">
                  <CreatorCard creator={c} />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center w-full mt-12 text-lg">
              No creators found.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
