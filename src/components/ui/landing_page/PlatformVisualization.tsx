// components/PlatformVisualization.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";

// Import your logos
import gitHub from "../../../../public/images/logos/git-logo.png";

import canva from "../../../../public/images/logos/canva-logo.png";
import figma from "../../../../public/images/logos/figma-logo.png";
import leetcode from "../../../../public/images/logos/leetcode-logo.png";
import dribbble from "../../../../public/images/logos/dribbble-logo.png";
import hackerrank from "../../../../public/images/logos/HackerRank-logo.png";
import geeksforgeeks from "../../../../public/images/logos/gfg-logo.png";
import codeforces from "../../../../public/images/logos/codeforces-logo.png";
import dev from "../../../../public/images/logos/dev-logo.png";
import gumroad from "../../../../public/images/logos/gumroad-logo.png";
import hackeearth from "../../../../public/images/logos/Hackeearth-logo.png";
import hashnode from "../../../../public/images/logos/hashnode-logo.png";
import medium from "../../../../public/images/logos/medium-logo.png";
import producthunt from "../../../../public/images/logos/producthunt-logo.png";
import youtube from "../../../../public/images/logos/youtube-logo.png";
import substack from "../../../../public/images/logos/substack-logo.png";
import topcoder from "../../../../public/images/logos/Topcoder-logo.png";
import logo from "../../../../public/images/Logo.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Tool {
  name: string;
  icon: StaticImageData;
}

interface PlatformVisualizationProps {
  className?: string;
  height?: string;
  showConnections?: boolean;
  onToolClick?: (tool: Tool) => void;
  centerLogo?: StaticImageData;
  centerLogoAlt?: string;
}

const svgHeight = 600; // matches viewBox height
const bottomY = svgHeight * 0.83; // ~83% down the viewBox



const PlatformVisualization: React.FC<PlatformVisualizationProps> = ({
  className = "",
  height: propHeight, 
  showConnections = true,
  onToolClick,
  centerLogo = logo,
  centerLogoAlt = "Platform Hub",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const leftToolsRef = useRef<HTMLDivElement>(null);
  const rightToolsRef = useRef<HTMLDivElement>(null);
  const bottomToolsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [height, setHeight] = useState(propHeight || "310px");

    // Responsive height logic
  useEffect(() => {
    const updateHeight = () => {
      if (propHeight) {
        // If user passes a height prop, use it always
        setHeight(propHeight);
      } else if (window.innerWidth < 640) {
        setHeight("300px"); // sm
      } else if (window.innerWidth < 1024) {
        setHeight("600px"); // md
      } else {
        setHeight("580px"); // lg
      }
    };

    updateHeight(); // Set on mount
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [propHeight]);

  // LEFT: Dev/Design Tools
  const toolsLeft: Tool[] = [
    { name: "GitHub", icon: gitHub },
    { name: "Figma", icon: figma },
    { name: "Dribbble", icon: dribbble },
    { name: "Canva", icon: canva },
  ];

  // RIGHT: Coding Platforms
  const toolsRight: Tool[] = [
    { name: "LeetCode", icon: leetcode },
    { name: "Hackerrank", icon: hackerrank },
    { name: "Codeforces", icon: codeforces },
    { name: "GeeksforGeeks", icon: geeksforgeeks },
  ];

  // BOTTOM: Content Platforms
  const toolsBottom: Tool[] = [
    
    { name: "Dev.to", icon: dev },
    { name: "Hashnode", icon: hashnode },
    { name: "Medium", icon: medium },
    { name: "Product Hunt", icon: producthunt },
    { name: "YouTube", icon: youtube },
    { name: "Substack", icon: substack },
    { name: "Gumroad", icon: gumroad },
    
  ];






  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    // Kill any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Set initial states - FIX: Remove opacity 0 from containers
      gsap.set(hubRef.current, { opacity: 0, scale: 0 });

      // Section entrance animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hub animation
      if (hubRef.current) {
        gsap.fromTo(
          hubRef.current,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
            delay: 0.3,
            scrollTrigger: {
              trigger: hubRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Left tools animation - FIX: Use the container ref directly
      if (leftToolsRef.current) {
        const leftTools = leftToolsRef.current.querySelectorAll(".tool-item");
        gsap.fromTo(
          leftTools,
          { x: -100, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: leftToolsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Right tools animation - FIX: Use the container ref directly
      if (rightToolsRef.current) {
        const rightTools = rightToolsRef.current.querySelectorAll(".tool-item");
        gsap.fromTo(
          rightTools,
          { x: 100, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.7,
            scrollTrigger: {
              trigger: rightToolsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Bottom tools animation - FIX: Use the container ref directly
      if (bottomToolsRef.current) {
        const bottomTools =
          bottomToolsRef.current.querySelectorAll(".tool-item");
        gsap.fromTo(
          bottomTools,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.9,
            scrollTrigger: {
              trigger: bottomToolsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // SVG Connections animations
      if (showConnections && svgRef.current) {
        // Animate paths with draw effect
        gsap.fromTo(
          svgRef.current.querySelectorAll("path"),
          {
            strokeDashoffset: 100,
            opacity: 0,
            strokeWidth: 0,
          },
          {
            strokeDashoffset: 0,
            opacity: 1,
            strokeWidth: 2,
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.inOut",
            delay: 1.2,
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate dots with fade in and scale
        gsap.fromTo(
          svgRef.current.querySelectorAll("circle"),
          {
            opacity: 0,
            scale: 0,
            fill: "#3b82f6",
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.5)",
            delay: 1.5,
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Hover animations for tools
      const setupHoverAnimations = () => {
        const tools = document.querySelectorAll(".tool-item");
        tools.forEach((tool) => {
          tool.addEventListener("mouseenter", () => {
            gsap.to(tool, {
              scale: 1.15,
              y: -8,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          });

          tool.addEventListener("mouseleave", () => {
            gsap.to(tool, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          });
        });
      };

      // Setup hover animations after a brief delay to ensure elements are rendered
      setTimeout(setupHoverAnimations, 2000);
    }, sectionRef);

    return () => {
      ctx.revert(); // Cleanup GSAP context
      // Clean up hover event listeners
      const tools = document.querySelectorAll(".tool-item");
      tools.forEach((tool) => {
        tool.removeEventListener("mouseenter", () => {});
        tool.removeEventListener("mouseleave", () => {});
      });
    };
  }, [isMounted, showConnections]);

  const handleToolClick = (tool: Tool) => {
    if (onToolClick) {
      onToolClick(tool);
    }
  };

  if (!isMounted) {
    return (
      <div
        className={`relative w-full max-w-5xl mx-auto ${className}`}
        style={{ height }}
      >
        {/* Loading state */}
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      </div>
    );
  }

  return (
    
    <div
      className={`relative w-full max-w-5xl mx-auto ${className}`}
      style={{ height }}
      ref={sectionRef}
    >
      {/* Background elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-100 blur-3xl -z-10"
      />

      {/* Center hub */}
      <div
        ref={hubRef}
        className="absolute z-20"
        style={{
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-2xl shadow-xl grid place-items-center border border-slate-200">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center border-4 border-yellow-100">
            <Image
              src={centerLogo}
              alt={centerLogoAlt}
              className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
              priority
            />
          </div>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-yellow-300"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Left tools - FIX: Remove opacity-0 class */}
      <div
        ref={leftToolsRef}
        // className="absolute z-10 flex flex-col gap-4 sm:gap-6 md:gap-8"
        // style={{
        //   top: "45%",
        //   left: "15%",
        //   transform: "translateY(-50%)",
        // }}
        className="absolute z-10 flex flex-col gap-4 sm:gap-6 md:gap-8
    top-[45%] -translate-y-1/2
    left-[8%] sm:left-[15%] "
      >
        {toolsLeft.map((tool, i) => (
          <div
            key={i}
            className="tool-item w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-xl shadow-md grid place-items-center border border-slate-200 group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => handleToolClick(tool)}
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              className="w-5 sm:w-10 md:w-12 object-contain"
            />
            <div className="absolute -bottom-6 text-[10px] sm:text-xs font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {tool.name}
            </div>
          </div>
        ))}
      </div>

      {/* Right tools - FIX: Remove opacity-0 class */}
      <div
        ref={rightToolsRef}
        // className="absolute z-10 flex flex-col gap-4 sm:gap-6 md:gap-8"
        // style={{
        //   top: "45%",
        //   right: "15%",
        //   transform: "translateY(-50%)",
        // }}
        className="
    absolute z-10 flex flex-col gap-4 sm:gap-6 md:gap-8
    top-[45%] -translate-y-1/2
    right-[10%] sm:right-[15%] 
  "
      >
        {toolsRight.map((tool, i) => (
          <div
            key={i}
            className="tool-item w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-xl shadow-md grid place-items-center border border-slate-200 group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => handleToolClick(tool)}
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              className="w-5 sm:w-10 md:w-12 object-contain"
            />
            <div className="absolute -bottom-6 text-[10px] sm:text-xs font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {tool.name}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom tools - FIX: Remove opacity-0 class */}
      <div
        ref={bottomToolsRef}
        // className="absolute flex gap-2 sm:gap-3 md:gap-4 justify-center z-10 w-full px-4 
        //      bottom-[180px] sm:bottom-[80px] md:bottom-[50px] left-1/2 -translate-x-1/2"
        className="absolute flex gap-2 sm:gap-3 md:gap-4 justify-center z-10 w-full px-4 
             bottom-[calc(10%)] sm:bottom-[calc(8%)] md:bottom-[calc(5%)] left-1/2 -translate-x-1/2"

      >
        {toolsBottom.map((tool, i) => (
          <div
            key={i}
            className="tool-item w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg shadow-sm p-1 sm:p-2 grid place-items-center border border-slate-200 group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => handleToolClick(tool)}
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              className="w-6 sm:w-8 md:w-10 object-contain"
            />
            <div className="absolute -bottom-5 text-[9px] sm:text-xs font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {tool.name}
            </div>
          </div>
        ))}
      </div>

      {/* SVG Connections */}
      {showConnections && (
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow filter for yellow dots */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left connections */}
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`l-${i}`}
              d={`M 100 ${120 + i * 100} C 300 ${
                120 + i * 100
              }, 350 300, 400 300`}
              stroke="#e8e8eb" // grey line
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
            />
          ))}

          {/* Right connections */}
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`r-${i}`}
              d={`M 700 ${120 + i * 100} C 500 ${
                120 + i * 100
              }, 450 300, 400 300`}
              stroke="#e8e8eb" // grey line
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
            />
          ))}


          {/* Bottom connections */}


        {[...Array(9)].map((_, i) => {
        const x = 200 + i * 50;
        return (
            <path
            key={`b-${i}`}
            d={`M 400 300 Q 400 400, ${x} ${bottomY}`}
            stroke="#e8e8eb"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5 5"
            />
        );
        })}


          {/* Animated yellow moving dots (left) */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={`dot-l-${i}`}
              r="3"
              style={{ fill: "#454544" }}
              filter="url(#glow)"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path={`M 100 ${120 + i * 100} C 300 ${
                  120 + i * 100
                }, 350 300, 400 300`}
              />
            </circle>
          ))}

          {/* Animated yellow moving dots (right) */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={`dot-r-${i}`}
              r="3"
              style={{ fill: "#454544" }}
              filter="url(#glow)"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path={`M 700 ${120 + i * 100} C 500 ${
                  120 + i * 100
                }, 450 300, 400 300`}
              />
            </circle>
          ))}

          {/* Animated yellow moving dots (bottom) */}
{[...Array(9)].map((_, i) => {
  const x = 200 + i * 50;
  return (
    <circle
      key={`dot-b-${i}`}
      r="2.5"
      style={{ fill: "#454544" }}
      filter="url(#glow)"
    >
      <animateMotion
        dur="4s"
        repeatCount="indefinite"
        path={`M ${x} ${bottomY} Q 400 400, 400 300`}
      />
    </circle>
  );
})}

        </svg>
      )}
    </div>
    
  );
};

export default PlatformVisualization;
