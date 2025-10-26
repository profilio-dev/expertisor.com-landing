"use client";

import React from "react";
import { Rocket, Mail } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function LaunchingSoon() {


  return (
    <div className={`min-h-screen bg-black flex items-center justify-center p-6 ${montserrat.className}`}>
      <div className="text-center max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Rocket className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Expertisor</h1>

        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="inline-flex items-center bg-gray-800 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-gray-300">Launching Soon</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Something amazing is coming
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We're building the next generation portfolio platform for professionals. 
            
          </p>
        </div>

        {/* Email Signup */}
        {/* <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            <button className="px-6 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div> */}

        {/* Footer */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Expertisor. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}