"use client";
import { useAuth } from "../context/AuthContext";
import mockData from "../mock/db.json";
import { Role, User } from "../types/user";
import { useRouter } from "next/navigation";
import { FaUserAstronaut, FaCrown, FaGraduationCap } from "react-icons/fa";

export default function HomePage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: Role) => {
    const user = mockData.users.find((u) => u.role === role) as User;
    if (user) {
      login(user);
      switch (role) {
        case "creator":
          router.push("/dashboard/creator");
          break;
        case "brand":
          router.push("/dashboard/brand");
          break;
        case "student":
          router.push("/dashboard/student");
          break;
      }
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/1.png')", // 👈 Update with your image filename
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay - adjusted opacity for better visibility */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Glowing background rings */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/10 animate-ping"></div>
      </div>

      {/* Title */}
      <div className="relative text-center z-10 mb-16">
        <h1 className="mx-auto mb-8 transition-transform duration-300 transform hover:scale-105 text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] text-[#b09b58] drop-shadow-[0_6px_18px_rgba(212,175,55,0.45)]">
          YouTuber Connect
        </h1>
        <p className="mt-3 text-gray-300 text-lg md:text-xl">
          Where Elite Creators Connect with Visionary Brands
        </p>
      </div>

      {/* Horizontal Cards */}
      <div className="relative z-10 flex flex-row flex-wrap justify-center gap-16 max-w-7xl w-full px-6">
        {/* Creator Card (changed border to solid blue) */}
        <div
          onClick={() => handleLogin("creator")}
          className="group bg-[#0b0b1f]/98 border-2 border-blue-500 rounded-2xl p-12 text-center backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,123,255,0.3)] cursor-pointer flex-1 min-w-[280px] max-w-[320px] min-h-[400px] flex flex-col items-center justify-center mx-4"
        >
          <FaUserAstronaut  className="mx-auto mb-8 transition-transform duration-300 transform hover:scale-110 text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-[#D4AF37] drop-shadow-[0_6px_18px_rgba(212,175,55,0.55)]" />
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
            Creator
          </h2>
          <p className="text-gray-400 text-sm">
            Showcase your talent and collaborate.
          </p>
        </div>

        {/* Brand Sponsor Card (changed border to solid blue) */}
        <div
          onClick={() => handleLogin("brand")}
          className="group bg-[#0b0b1f]/98 border-2 border-blue-500 rounded-2xl p-12 text-center backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] cursor-pointer flex-1 min-w-[280px] max-w-[320px] min-h-[400px] flex flex-col items-center justify-center mx-4"
        >
          <FaCrown
            className="mx-auto mb-8 transition-transform duration-300 transform hover:scale-110 text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-[#D4AF37] drop-shadow-[0_6px_18px_rgba(212,175,55,0.55)]"
          />
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
            Brand Sponsor
          </h2>
          <p className="text-gray-400 text-sm">
            Discover top-tier talent for your campaigns.
          </p>
        </div>

        {/* Student Card (changed border to solid blue) */}
        <div
          onClick={() => handleLogin("student")}
          className="group bg-[#0b0b1f]/98 border-2 border-blue-500 rounded-2xl p-12 text-center backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] cursor-pointer flex-1 min-w-[280px] max-w-[320px] min-h-[400px] flex flex-col items-center justify-center mx-4"
        >
          <FaGraduationCap
            className="mx-auto mb-8 transition-transform duration-300 transform hover:scale-110 text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-[#D4AF37] drop-shadow-[0_6px_18px_rgba(212,175,55,0.55)]"
          />

          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
            Student
          </h2>
          <p className="text-gray-400 text-sm">
            Build your skills and connect with opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}
