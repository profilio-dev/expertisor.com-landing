"use client";
import { useState } from "react";
import PostCard from "./PostCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface Post {
  id: number;
  name: string;
  role: string;
  avatar: string;
  time: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface TrendingTag {
  name: string;
  posts: number;
}

interface SuggestedPerson {
  name: string;
  role: string;
  avatar: string;
}

export default function Feed() {
  const [activeFilter, setActiveFilter] = useState("relevant");

  const posts: Post[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer at TechCorp",
      avatar: "/images/avatar.png",
      time: "2h ago",
      content: "Excited to share my new project built with Next.js and Tailwind CSS! This has been an incredible learning experience and I'm proud of what we've accomplished. The performance improvements are significant!",
      tags: ["NextJS", "TailwindCSS", "WebDevelopment"],
      likes: 24,
      comments: 5,
      shares: 2,
      views: 128,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UI/UX Designer",
      avatar: "/images/avatar.png",
      time: "4h ago",
      content: "Just finished a major redesign for a client's mobile app! Focused on improving user experience and accessibility. Would love to hear your thoughts!",
      tags: ["UIUX", "Design", "MobileApp"],
      likes: 30,
      comments: 3,
      shares: 1,
      views: 95,
      isLiked: true,
      isBookmarked: true
    },
    {
      id: 3,
      name: "Alex Chen",
      role: "Senior Backend Engineer",
      avatar: "/images/avatar.png",
      time: "6h ago",
      content: "Deep dive into system architecture patterns for microservices. Sharing some insights about event-driven architecture and how it can improve scalability.",
      tags: ["Backend", "Microservices", "Architecture"],
      likes: 42,
      comments: 8,
      shares: 3,
      views: 210,
      isLiked: false,
      isBookmarked: false
    }
  ];

  const trendingTags: TrendingTag[] = [
    { name: "NextJS", posts: 1243 },
    { name: "TailwindCSS", posts: 892 },
    { name: "React", posts: 2156 },
    { name: "TypeScript", posts: 1678 },
    { name: "Python", posts: 1890 }
  ];

  const suggestedPeople: SuggestedPerson[] = [
    { name: "Sarah Wilson", role: "Product Manager", avatar: "/images/avatar.png" },
    { name: "Mike Johnson", role: "DevOps Engineer", avatar: "/images/avatar.png" },
    { name: "Priya Patel", role: "Full Stack Developer", avatar: "/images/avatar.png" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <LeftSidebar />
        <main className="flex-1 max-w-2xl">
          {/* Create Post Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <input
                type="text"
                placeholder="Share your thoughts..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-between text-gray-500">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                Media
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                Article
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                Poll
              </button>
            </div>
          </div>

          {/* Feed Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              {[
                { id: "relevant", label: "Most Relevant" },
                { id: "recent", label: "Most Recent" },
                { id: "top", label: "Top Posts" }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === filter.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        <RightSidebar trendingTags={trendingTags} suggestedPeople={suggestedPeople} />
      </div>
    </div>
  );
}