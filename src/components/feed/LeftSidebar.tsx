"use client";
import { TrendingUp, Briefcase, FileText, Users, Mail, Search, Plus } from "lucide-react";

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative">
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Mano Sundar M</h3>
            <p className="text-sm text-gray-500">6 followers • 5 following</p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="text-center">
            <div className="font-semibold text-gray-900">124</div>
            <div>Connections</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">47</div>
            <div>Posts</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">89</div>
            <div>Reactions</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <nav className="space-y-2">
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
              className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
          Quick Actions
        </h4>
        <div className="space-y-2">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">55</span>
            </div>
            <span className="text-sm font-medium text-gray-700">New Opportunities</span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-sm font-bold">12</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Pending Invites</span>
          </button>
        </div>
      </div>

      {/* Project Showcase */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4">
        <div className="text-center mb-3">
          <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 rounded"></div>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Built a cool project?</h4>
          <p className="text-xs text-gray-600 mb-3">
            Show off your projects on your Peerlist profile.
          </p>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Footer Links */}
      <div className="mt-auto pt-6 border-t border-gray-200">
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
  );
}