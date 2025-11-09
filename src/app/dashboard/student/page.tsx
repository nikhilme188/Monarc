"use client";

import React, { useEffect, useState } from "react";
import mockData from "@/mock/db.json";
import { Badge, Briefcase, FileVideo } from "lucide-react";
import { motion } from "framer-motion";

type PortfolioItem = {
  title: string;
  description: string;
  link: string;
};

type JobMatch = {
  title: string;
  creator: string;
  rate: number;
};

type StudentData = {
  name: string;
  avatar?: string;
  skills: string[];
  skillScore: number;
  jobMatches: JobMatch[];
  portfolio: PortfolioItem[];
};

type MockUser = {
  id: number;
  role: string;
  name: string;
  avatar?: string;
  skills?: string[];
  skillScore?: number;
  jobMatches?: Array<{ title: string; creator: string; rate: number }>;
  portfolio?: Array<{ title: string; description?: string; url: string }>;
};

const palette = {
  bg: "#03060a",
  surface: "#071226",
  card: "#0b1524",
  electric: "#1fb6ff",
  gold: "#D4AF37",
};

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const user = (mockData.users as MockUser[]).find((u) => u.role === "student");
    if (!user) return;

    const transformed: StudentData = {
      name: user.name,
      avatar:
        user.avatar ||
        "https://api.dicebear.com/7.x/adventurer/svg?seed=student",
      skills: user.skills ?? [],
      skillScore: user.skillScore ?? 0,
      jobMatches: user.jobMatches ?? [],
      portfolio: (user.portfolio ?? []).map((p) => ({
        title: p.title,
        description: p.description ?? "No description available",
        link: p.url,
      })),
    };

    setTimeout(() => setStudent(transformed), 200);
  }, []);

  const startValidation = () => {
    if (isValidating) return;
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      alert("Skills validated successfully!");
    }, 700);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-white"
      style={{
        background: `radial-gradient(circle at top, ${palette.bg} 0%, #041226 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl w-full bg-gradient-to-b from-[#040b16] to-[#060f1d] rounded-3xl shadow-2xl p-10 relative"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-4"
          >
            <div
              className="absolute inset-0 blur-md opacity-60 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${palette.electric}, ${palette.gold})`,
              }}
            />
            <img
              src={student?.avatar}
              alt={student?.name}
              className="w-32 h-32 rounded-full relative z-10 border-4 border-[#0b1524] shadow-lg"
            />
          </motion.div>

          <h1 className="text-3xl font-bold tracking-wide">
            {student ? student.name : "Loading..."}
          </h1>
          <p className="text-sm text-gray-400 mt-1">Sovereign Student</p>

          <motion.button
            onClick={startValidation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 px-6 py-2 rounded-xl font-semibold shadow-sm"
            style={{
              background: `linear-gradient(90deg, ${palette.electric}, ${palette.gold})`,
              color: "#021018",
            }}
          >
            {isValidating ? "Validating..." : "Validate Skills"}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#0b1524] text-[var(--electric)] font-semibold shadow-inner"
          >
            Skill Score: {student?.skillScore ?? 0}
          </motion.div>
        </div>

        {/* 3-Column Horizontal Layout */}
        <div className="flex flex-wrap justify-between gap-6 text-center">
          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col items-center"
            style={{ flexBasis: "33%" }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Badge size={18} className="text-[var(--electric)]" />
              <h2 className="text-lg font-semibold">Skills</h2>
            </div>
            <div className="space-y-3 w-full max-w-xs mx-auto">
              {student?.skills?.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#0b1524]/70 rounded-xl px-4 py-2 shadow-inner"
                >
                  <span className="block text-base">{skill}</span>
                  <span className="text-sm text-[#1fb6ff] block">★★★★☆</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Job Matches */}
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 flex flex-col items-center"
            style={{ flexBasis: "34%" }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Briefcase size={18} className="text-[var(--electric)]" />
              <h2 className="text-lg font-semibold">Job Matches</h2>
            </div>
            <div className="space-y-3 w-full max-w-xs mx-auto">
              {student?.jobMatches?.map((job, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="p-4 rounded-xl bg-[#0b1524]/70 shadow-inner"
                >
                  <h3 className="font-semibold mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-400">{job.creator}</p>
                  <p className="text-[#1fb6ff] mt-1 font-medium">
                    ${job.rate}/hr
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Portfolio */}
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex flex-col items-center"
            style={{ flexBasis: "33%" }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileVideo size={18} className="text-[var(--electric)]" />
              <h2 className="text-lg font-semibold">Portfolio</h2>
            </div>
            <div className="space-y-3 w-full max-w-xs mx-auto">
              {student?.portfolio?.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-[#0b1524]/70 shadow-inner"
                >
                  <h4 className="font-semibold mb-1">{p.title}</h4>
                  <p className="text-sm text-gray-400 mb-2">{p.description}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--electric)] text-sm hover:underline"
                  >
                    View Project →
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Glow Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            boxShadow: `inset 0 0 60px rgba(31,182,255,0.1), 0 0 50px rgba(212,175,55,0.1)`,
          }}
        />
      </motion.div>

      <style jsx>{`
        :root {
          --electric: ${palette.electric};
          --gold: ${palette.gold};
        }
      `}</style>
    </div>
  );
}
