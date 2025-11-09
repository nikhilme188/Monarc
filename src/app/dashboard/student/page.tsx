"use client";

import React, { useEffect, useState } from "react";
import mockData from "@/mock/db.json";
import { Badge, Briefcase, FileVideo } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types

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
  skills: string[];
  skillScore: number;
  jobMatches: JobMatch[];
  portfolio: PortfolioItem[];
};

type MockUser = {
  id: number;
  role: string;
  name: string;
  skills?: string[];
  skillScore?: number;
  jobMatches?: Array<{
    title: string;
    creator: string;
    rate: number;
  }>;
  portfolio?: Array<{
    title: string;
    description?: string;
    url: string;
  }>;
};

function Modal({ children, isOpen, onClose }: { children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="max-w-lg w-full bg-[#071226] border border-[#1f2a3a] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse bg-gradient-to-r from-[#0b1622] via-[#081223] to-[#081422] p-4 rounded-lg">
      <div className="h-4 bg-[#0f1b2a] rounded w-1/3 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 bg-[#0f1b2a] rounded my-2 w-full" />
      ))}
    </div>
  );
}

const palette = {
  bg: "#03060a",
  surface: "#071226",
  card: "#0b1524",
  electric: "#1fb6ff",
  gold: "#D4AF37",
};

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const user = (mockData.users as MockUser[]).find((u) => u.role === "student");
    if (!user) return;

    const transformed: StudentData = {
      name: user.name,
      skills: user.skills ?? [],
      skillScore: user.skillScore ?? 0,
      jobMatches: user.jobMatches ?? [],
      portfolio: (user.portfolio ?? []).map((p) => ({
        title: p.title,
        description: p.description ?? "No description available",
        link: p.url,
      })),
    };

    const t = setTimeout(() => setStudent(transformed), 200);
    return () => clearTimeout(t);
  }, []);

  const startValidation = async () => {
    if (isValidating) return;
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setModalOpen(true);
    }, 700);
  };

  return (
    <div
      className="min-h-screen px-6 md:px-12 lg:px-20 py-8 text-white"
      style={{
        background: `linear-gradient(180deg, ${palette.bg} 0%, #041226 100%)`,
        color: "#e6eef8",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.header initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Welcome,</h1>
              <p className="text-lg text-gray-300">{student ? student.name : <span className="inline-block w-40 h-6 bg-[#0e1b2a] rounded animate-pulse" />}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-gray-400">Visibility</div>
                <div className="font-medium text-sm">{student ? `${student.skillScore} pts` : <span className="inline-block w-20 h-4 bg-[#0e1b2a] rounded animate-pulse" />}</div>
              </div>
              <div className="px-3 py-2 rounded-xl border border-[#132036] bg-gradient-to-b from-[#071226] to-[#041726] shadow-inner">
                <div className="text-sm">Sovereign</div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-1 bg-[#071226] rounded-2xl p-6 border border-[#102133] shadow-lg"
            style={{ boxShadow: `0 8px 30px rgba(3,6,10,0.6)` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge size={20} className="text-[var(--electric)]" />
              <h2 className="text-xl font-semibold">Skills & Badges</h2>
            </div>

            <div className="space-y-3 mb-6">
              {!student && <SkeletonCard lines={4} />}

              {student?.skills?.length ? (
                student.skills.map((skill, idx) => (
                  <motion.div
                    key={skill + idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center justify-between bg-[#0b1524] p-3 rounded-lg border border-[#122033]"
                  >
                    <span>{skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-300">★★★★☆</div>
                      <div className="text-xs px-2 py-1 rounded-md bg-[rgba(27,139,255,0.08)] border border-[rgba(27,139,255,0.12)] text-[var(--electric)]">Verified</div>
                    </div>
                  </motion.div>
                ))
              ) : null}
            </div>

            <button
              onClick={startValidation}
              className="w-full py-3 rounded-xl font-semibold shadow-sm transition-transform active:scale-[0.995]"
              style={{
                background: `linear-gradient(90deg, ${palette.electric} 0%, rgba(31,182,255,0.85) 60%)`,
                color: "#021018",
              }}
            >
              {isValidating ? "Validating..." : "Validate My Skills"}
            </button>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="lg:col-span-2 bg-[#071226] rounded-2xl p-6 border border-[#102133] shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={20} className="text-[var(--electric)]" />
              <h2 className="text-xl font-semibold">Job Matches</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!student && <SkeletonCard lines={2} />}

              {student?.jobMatches?.length ? (
                student.jobMatches.map((job, idx) => (
                  <motion.div
                    key={job.title + idx}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="bg-[#0b1524] p-4 rounded-xl border border-[#122033] cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open job ${job.title}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className="text-[var(--electric)] font-medium">${job.rate}/hr</span>
                    </div>
                    <p className="text-sm text-gray-400">{job.creator}</p>
                  </motion.div>
                ))
              ) : null}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <FileVideo size={20} className="text-[var(--electric)]" />
                <h3 className="text-lg font-semibold">Portfolio</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {!student && <SkeletonCard lines={2} />}

                {student?.portfolio?.map((p, i) => (
                  <motion.article
                    key={p.title + i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-[#0b1524] p-4 rounded-xl border border-[#122033]"
                  >
                    <h4 className="font-semibold mb-2">{p.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">{p.description}</p>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--electric)] text-sm hover:underline"
                    >
                      View Project →
                    </a>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="text-center">
            <div
              className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(180deg, rgba(31,182,255,0.08), rgba(212,175,55,0.06))" }}
            >
              <Badge size={24} className="text-[var(--electric)]" />
            </div>

            <motion.h2 initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="text-2xl font-bold mb-2">
              Success!
            </motion.h2>

            <p className="text-gray-300">Your \"Video Editing\" badge has been awarded.</p>
            <p className="text-sm text-gray-400 mt-2">This will increase your visibility to creators looking for video editors.</p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg font-semibold shadow-sm"
                style={{ background: `linear-gradient(90deg, ${palette.gold}, ${palette.electric})`, color: "#041018" }}
              >
                Got it!
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <style jsx>{`
        :root {
          --electric: ${palette.electric};
          --gold: ${palette.gold};
        }
      `}</style>
    </div>
  );
}