"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

  if (!creator) return <div>Creator not found</div>;

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-black via-blue-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{creator.name}</h1>
        <div className="bg-black/60 border border-blue-800 rounded-xl p-6">
          <img 
            src={creator.avatar} 
            alt={creator.name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <div className="space-y-4">
            <p className="text-xl">Category: {creator.category}</p>
            <p className="text-xl">Subscribers: {creator.subscribers.toLocaleString()}</p>
            <p className="text-gray-300">{creator.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}