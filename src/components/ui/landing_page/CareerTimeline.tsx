"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

const CareerTimeline = () => {
  const timelineData = [
    { year: "2012", event: "I lost my job", isHighlighted: true },
    { year: "2013", event: "Started freelancing" },

    { year: "2020", event: "Tech Lead" },
    { year: "2022", event: "Director of Engineering" },
    { year: "2024", event: "Present Success", isPresent: true }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
     

      {/* Timeline Container */}
      <div className="relative bg-white rounded-2xl p-6 sm:p-8 ">
        {/* Main Timeline Line */}
        <div className="absolute left-8 right-8 top-1/2 transform -translate-y-1/2">
          <div className="w-full border-t-2 border-dotted border-blue-300"></div>
        </div>

        {/* Timeline Markers */}
        <div className="relative flex justify-between items-center">
          {timelineData.map((item, index) => (
            <div key={index} className="flex flex-col items-center relative flex-1">
              {/* Year Label */}
              <div className="mb-8 sm:mb-10">
                <span className="text-gray-700 font-semibold text-sm sm:text-base bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                  {item.year}
                </span>
              </div>

              {/* Marker Container */}
              <div className="relative">
                {/* Main Marker */}
                <div 
                  className={`relative flex items-center justify-center rounded-full border-2 border-white shadow-lg ${
                    item.isHighlighted
                      ? "bg-red-500 w-6 h-6 sm:w-7 sm:h-7"
                      : item.isPresent
                      ? "bg-green-500 w-8 h-8 sm:w-10 sm:h-10"
                      : "bg-blue-500 w-5 h-5 sm:w-6 sm:h-6"
                  }`}
                >
                  {/* Present Marker Icon */}
                  {item.isPresent && (
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>

                {/* Connecting Line */}
                {index < timelineData.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent transform translate-y-[-1px] z-0"></div>
                )}
              </div>

              {/* Event Label */}
              <div className="mt-5 sm:mt-8 max-w-[100px] sm:max-w-[120px] text-center ">
                <span className="text-gray-700  text-[8px] sm:text-sm leading-tight bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm inline-block">
                  {item.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center space-x-6  text-gray-600 text-[10px]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full border border-white shadow-sm"></div>
          <span>Career Start</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full border border-white shadow-sm"></div>
          <span>Milestones</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full border border-white shadow-sm flex items-center justify-center">
            <TrendingUp className="w-2 h-2 text-white" />
          </div>
          <span>Current Role</span>
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;