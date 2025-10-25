"use client";

import { useState } from "react";
import { 
  Search, Bell, MessageCircle, ChevronDown, Edit3, 
  Bookmark, Users, Briefcase, FileText, Mail, 
  Settings, CheckCircle, Globe, Plus, TrendingUp,
  Dribbble, Youtube, Github, Twitter, Linkedin
} from "lucide-react";

export default function PeerlistUI() {
  const [activeTab, setActiveTab] = useState("work");
  const [activeNav, setActiveNav] = useState("search");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Expertisor</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search Peerlist"
                className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
              <Edit3 className="h-4 w-4" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5" />
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <MessageCircle className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative">
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 pt-20 flex">
        {/* Left Sidebar */}
        <aside className="w-64 fixed h-[calc(100vh-5rem)] overflow-y-auto">
          {/* User Profile Snippet */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Mano Sundar M</h3>
                <p className="text-sm text-gray-500">6 followers • 5 following</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            {[
              { id: "scroll", icon: TrendingUp, label: "Scroll" },
              { id: "launchpad", icon: Briefcase, label: "Launchpad" },
              { id: "articles", icon: FileText, label: "Articles" },
              { id: "jobs", icon: Users, label: "Jobs" },
              { id: "inbox", icon: Mail, label: "Inbox" },
              { id: "search", icon: Search, label: "Search" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button className="flex items-center space-x-3 w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">55</span>
                </div>
                <span className="text-sm font-medium text-gray-700">New Opportunities</span>
              </button>
              <button className="flex items-center space-x-3 w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">XX</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Pending Invites</span>
              </button>
            </div>
          </div>

          {/* Project Showcase */}
          <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="text-center mb-3">
              <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-500 rounded"></div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Built a cool project?</h4>
              <p className="text-xs text-gray-600 mb-3">
                Show off your projects on your Peerlist profile.
              </p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-3 mb-4">
              {["Ads", "Blog", "Tools", "Store", "Help", "Support", "Legal"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-400">© 2023 Peerlist, Inc.</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 max-w-3xl px-8">
          {/* User Header */}
          <div className="mb-8">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative">
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">Mano Sundar M</h1>
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
                
                <p className="text-gray-600 mb-3">
                  Started as a kid breaking remote cars, now building scalable tech solutions. 
                  Love mentoring & sharing insights
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span>Joined 01 Jul 2025</span>
                  <span>•</span>
                  <span className="text-green-600 font-medium">REMOTE</span>
                  <span>•</span>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    manosundar.profilio...
                  </span>
                </div>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Kubernetes", "Docker Products", "Personal Development", 
                    "Project Planning", "Personal Branding", "DevOps",
                    "Mobile Application Development", "Full-Stack Development",
                    "User Interface Design", "CircleCI"
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: "work", label: "Work" },
                { id: "resume", label: "Resume" },
                { id: "collections", label: "Collections" },
                { id: "articles", label: "Articles" },
                { id: "posts", label: "Posts" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Showcase Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Showcase your work from:
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: "Dribbble", icon: Dribbble },
                { name: "Medium", icon: FileText },
                { name: "Hashnode", icon: Globe },
                { name: "Substack", icon: Mail },
                { name: "DEV", icon: Briefcase },
                { name: "YouTube", icon: Youtube },
                { name: "Gumroad", icon: ShoppingBag },
                { name: "RSS feed", icon: Rss },
                { name: "CodeForces", icon: Code },
                { name: "ADPlist", icon: Users }
              ].map((platform) => (
                <button
                  key={platform.name}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                >
                  <platform.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="text-sm text-gray-700 flex-1 text-left">{platform.name}</span>
                  <Plus className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 fixed right-0 h-[calc(100vh-5rem)] overflow-y-auto border-l border-gray-200 px-6 py-4">
          {/* User Profile Snippet */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span className="font-medium text-gray-900">Mano Sundar M</span>
          </div>

          {/* Quick Links */}
          <div className="space-y-1 mb-8">
            {[
              { icon: Settings, label: "Settings" },
              { icon: Bookmark, label: "Bookmarks" },
              { icon: Briefcase, label: "Job Preferences" },
              { icon: CheckCircle, label: "Verification" },
              { icon: Globe, label: "Custom Domain", badge: "Not Connected" },
              { icon: Users, label: "Invite and Earn", badge: "New", badgeColor: "green" }
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.badgeColor === "green" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Profile Analytics */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Profile Analytics</h4>
              <span className="text-xs text-gray-500">last 7 days</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <span className="font-semibold text-gray-900">5</span>
                  <span className="text-green-500 text-xs">+5</span>
                </div>
                <span className="text-xs text-gray-500">Views</span>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 text-sm">0</div>
                <span className="text-xs text-gray-500">Clicks</span>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 text-sm">0</div>
                <span className="text-xs text-gray-500">Followers</span>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-lg p-3 mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
              </div>
              <div className="h-20 bg-gradient-to-t from-blue-50 to-white rounded border border-gray-100 relative">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
                <div className="absolute bottom-0 left-1/4 w-0.5 h-3/4 bg-blue-500"></div>
                <div className="absolute bottom-0 left-1/2 w-0.5 h-1/2 bg-blue-500"></div>
                <div className="absolute bottom-0 left-3/4 w-0.5 h-1/4 bg-blue-500"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>6</span>
              </div>
            </div>

            <button className="w-full bg-gray-900 hover:bg-black text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics Dashboard</span>
            </button>
          </div>

          {/* Profile Highlights */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Profile Highlights</h4>
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              Currently working at Presidio as a...
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Additional icons needed
function ShoppingBag(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function Rss(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  );
}

function Code(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}