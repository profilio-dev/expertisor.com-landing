"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Play,
  Check,
  Zap,
  Smartphone,
  LayoutTemplate,
  BookOpen,
  BarChart3,
  CheckCircle,
  XCircle,
  Users,
  Star,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import boxBg from "../../../public/images/box1.svg";
import gitHub from "../../../public/images/logos/git-logo.png";
import canva from "../../../public/images/logos/canva-logo.png";
import figma from "../../../public/images/logos/figma-logo.png";
import leetcode from "../../../public/images/logos/leetcode-logo.png";
import Image from "next/image";
import PlatformVisualization from "@/components/ui/landing_page/PlatformVisualization";
import logo from "../../../public/images/Logo.svg";
import step1 from "../../../public/images/Step-1.svg";
import step2 from "../../../public/images/Step-2.svg";
import step3 from "../../../public/images/Step Container.svg";
import frame1 from "../../../public/images/Frame.svg";
import frame2 from "../../../public/images/Frame-2.svg";
import frame3 from "../../../public/images/Frame-3.svg";
import bg from "../../../public/images/Background.svg";
import { SERVER_URL } from "@/constants/siteConfig";
import people from "../../../public/images/image-container.svg";
import { Montserrat } from "next/font/google";

// import axios from "axios";
import { useRouter } from "next/navigation";
import axios from "axios";

// Configure Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [status, setStatus] = useState(""); // "available", "taken", "invalid", ""
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (!username.trim()) {
      setStatus("");
      setMessage("");
      return;
    }

    if(username.length < 3){
      setIsChecking(false);
      setStatus("invalid");
      setMessage(" Username must be at least 3 characters long.");
      return;
    }

    const delayDebounce = setTimeout(() => {
      checkUsername(username);
    }, 500);
    
    return () => clearTimeout(delayDebounce);
  }, [username]);

  // Function to call FastAPI endpoint
  const checkUsername = useCallback(async (name: string) => {
    try {
      setIsChecking(true);
      setStatus("");
      setMessage("");

      const res = await axios.post(`${SERVER_URL}/check-username/`, null, {
        params: { username: name },
      });
      console.log("Response:", res);
      if (res.status === 200) {
        setStatus("available");
        setMessage("Username is available!");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        setStatus("taken");
        setMessage(` ${err.response.data.detail}`);
      } else {
        setStatus("invalid");
        setMessage("⚠️ Unable to check username right now.");
      }
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleClaimNow = () => {
    if (status === "available") {
      router.push(`/verify-otp/${username}`);
    }
  };

  const isButtonDisabled =
    !username.trim() ||
    status === "taken" ||
    status === "invalid" ||
    isChecking;

  const avatars = [leetcode, figma, canva, gitHub];

  const faqs = [
    {
      question: "Do I need any technical skills to use Expertisor?",
      answer:
        "Not at all. Expertisor offers a no-code interface so you can build your portfolio quickly without technical knowledge.",
    },
    {
      question: "What makes Expertisor different from other portfolio tools?",
      answer:
        "Expertisor combines portfolio building with micro-learning and seamless platform integrations in one unified dashboard.",
    },
    {
      question: "Can I add projects and case studies to my profile?",
      answer:
        "Yes, you can easily add projects, case studies, and showcase your work from various platforms.",
    },
    {
      question: "Is Expertisor free to use?",
      answer:
        "Yes, Expertisor offers a free plan with essential features to get you started.",
    },
  ];

  const testimonials = [
    {
      name: "Jessica Lee",
      role: "Head of Design at Dropbox",
      text: "The best products are those that seamlessly integrate into your life, making you wonder how you ever lived without them.",
    },
    {
      name: "Alex Morgan",
      role: "Creative Director at CloudSync",
      text: "Top-notch products effortlessly blend into your daily routine, leaving you questioning how you managed before they came along.",
    },
    {
      name: "Mark Chen",
      role: "Co-Founder of Tech Startup",
      text: "A truly innovative product not only meets a need but also inspires its users to reimagine what's possible.",
    },
  ];

  const features = [
    {
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: "Portfolio Templates",
      description:
        "Choose from professional templates tailored to different roles and industries.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Responsive Design",
      description:
        "Your portfolio looks perfect on any device - mobile, tablet, or desktop.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Micro Learning",
      description:
        "Built-in learning modules to help you grow your skills while building your portfolio.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Unified Dashboard",
      description:
        "Track and showcase all your experiences and achievements in one clean dashboard.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Global Network" },
    { number: "8000+", label: "Portfolio Count" },
    { number: "88%", label: "Engagement Rate" },
  ];

  return (
    <div className={`min-h-screen bg-white overflow-x-hidden ${montserrat.className}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logo.src}
                alt="Expertisor Logo"
                className="h-8 w-auto mr-2 sm:h-10 sm:mr-3"
              />
              <span className="font-bold text-black text-base sm:text-lg">
                EXPERTISOR
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {[
                { name: "Home", href: "#" },
                { name: "Features", href: "#features" },
                { name: "Why us?", href: "#whyus" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "FAQ", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-md font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-yellow-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <button className="px-3 py-2 text-sm lg:px-4 lg:py-2 lg:text-base border text-black border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Log in
              </button>
              <button className="px-3 py-2 text-sm lg:px-4 lg:py-2 lg:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg border border-gray-300"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {[
                  "Home",
                  "Features",
                  "Why us?",
                  "Testimonials",
                  "Contact us",
                  "FAQ",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-700 hover:text-black font-medium py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Log in
                  </button>
                  <button className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium">
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 sm:pt-32 sm:pb-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 2)),
            url(${boxBg.src})
          `,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Integration Badge */}
          <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1 mb-6 sm:px-4 sm:py-2 sm:mb-8 max-w-xs sm:max-w-none mx-auto">
            <div className="flex -space-x-1 sm:-space-x-2 mr-2 sm:mr-3">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`User ${i + 1}`}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 text-left">
              Integrate with over 100 tools seamlessly in your portfolio.
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            CREATE YOUR PROFESSIONAL
            <br className="hidden sm:block" />
            <span className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
              PORTFOLIO
              <span className="bg-black text-yellow-400 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-2xl sm:text-3xl lg:text-4xl flex items-center gap-1 sm:gap-2 justify-center mt-2 sm:mt-0">
                FAST <Zap className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 font-normal">
            Showcase your work, and grow your presence online with Expertisor.
            The all in one portfolio website builder for every professional.
          </p>

          {/* Input Section */}
          <div className="max-w-xl mx-auto flex flex-col gap-2 sm:gap-3 px-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base font-normal"
                />
                <span className="text-gray-500 font-medium text-sm sm:text-base whitespace-nowrap">
                  .expertisor.com
                </span>
              </div>
              <button
                disabled={isButtonDisabled}
                onClick={handleClaimNow}
                className={`${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                } text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors shadow-lg text-sm sm:text-base whitespace-nowrap`}
              >
                {isChecking ? "Checking..." : "Claim Now"}
              </button>
            </div>

            {message && (
              <div
                className={`flex items-center mt-2 p-2 rounded-lg text-sm sm:text-base ${
                  status === "available"
                    ? "bg-green-100 text-green-700"
                    : status === "taken"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {status === "available" && (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {status === "taken" && <XCircle className="w-5 h-5 mr-2" />}
                {status !== "available" && status !== "taken" && (
                  <RotateCcw className="w-5 h-5 mr-2" />
                )}
                <span className="font-medium">{message}</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 sm:mt-16">
          <PlatformVisualization />
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-yellow-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="flex justify-center">
              <Image
                src={step1}
                alt="Step 1"
                className="w-full max-w-xs sm:max-w-none object-contain"
              />
            </div>

            {/* Step 2 */}
            <div className="flex justify-center">
              <Image
                src={step2}
                alt="Step 2"
                className="w-full max-w-xs sm:max-w-none object-contain"
              />
            </div>

            {/* Step 3 */}
            <div className="flex justify-center">
              <Image
                src={step3}
                alt="Step 3"
                className="w-full max-w-xs sm:max-w-none object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <div className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
                Features
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              EVERYTHING YOU NEED TO BUILD A STANDOUT PORTFOLIO
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 font-normal">
              From sleek templates to instant publishing, Expertisor gives you
              the tools to impress, connect, and grow.
            </p>
          </div>

          {/* First grid */}
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 mb-12 sm:mb-16 px-2">
            {/* Portfolio Templates */}
            <div className="bg-gradient-to-b from-yellow-50 to-white border border-yellow-100 rounded-xl p-6 sm:p-8 w-full lg:w-2/5">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Portfolio Templates
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base font-normal">
                Track and showcase all your experiences and achievements in one
                clean, centralized dashboard.
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Creative",
                  "Developer",
                  "Designer",
                  "Architecture",
                  "Minimal",
                  "Content Creator",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border ${
                      i === 2
                        ? "bg-yellow-400 border-yellow-500 text-black shadow-sm"
                        : "bg-yellow-50 border-yellow-200 text-gray-700"
                    }`}
                  >
                    {i === 2 && (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    )}
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsive Feature */}
            <div className="bg-gradient-to-b from-yellow-50 to-white border border-yellow-100 rounded-xl p-6 sm:p-8 w-full lg:w-4/5">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Responsive on Every Screen
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base font-normal">
                Your presence looks perfect, whether viewed on mobile, tablet,
                or desktop. Built to load fast and scroll smooth, wherever they
                find you.
              </p>
              <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
                <Image
                  src={frame1}
                  alt="Responsive design illustration"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Second grid */}
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 px-2">
            {/* Unified Dashboard */}
            <div className="bg-gradient-to-b from-yellow-50 to-white border border-yellow-100 rounded-xl p-6 sm:p-8 w-full lg:w-4/5">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Unified Dashboard
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base font-normal">
                Track and showcase all your experiences and achievements in one
                clean, centralized dashboard.
              </p>
              <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
                <Image
                  src={frame2}
                  alt="Unified dashboard illustration"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Micro Learning */}
            <div className="bg-gradient-to-b from-yellow-50 to-white border border-yellow-100 rounded-xl p-6 sm:p-8 w-full lg:w-2/5 mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Micro Learning
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base font-normal">
                Track and showcase all your experiences and achievements in one
                clean, centralized dashboard.
              </p>
              <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden">
                <Image
                  src={frame3}
                  alt="Micro learning illustration"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
              DEMO
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Build Your Professional Presence in Minutes
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 px-4 font-normal">
            Watch how easy it is to create a standout profile on Expertisor with
            no coding, no clutter, just clean, career-boosting visibility
          </p>

          <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" />
                </button>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 max-w-md mx-auto text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Learn to Build Your First Profile
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base font-normal">
                This quick demo walks you through creating your Expertisor
                profile from signup to showcase. It&apos;s seriously simple.
              </p>
              <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base">
                Let&apos;s Go
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 2)),
            url(${bg.src})
          `,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Impact So Far
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 font-normal">
                See how Expertisor is helping professionals build their brand,
                showcase their work, and get discovered every single day.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            WHAT OUR USERS SAY
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 px-4 font-normal">
            Discover how Expertisor has helped professionals showcase their work and advance their careers.
          </p>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 font-normal leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 font-medium">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="text-center lg:text-left">
              <div className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
                  FAQ
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="text-base sm:text-lg text-gray-600 font-normal">
                Still have questions? Reach out via our contact page or email.
                We&apos;ll respond within 24 hours.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setActiveFAQ(activeFAQ === index ? null : index)
                    }
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-sm sm:text-base pr-2">
                      {faq.question}
                    </span>
                    {activeFAQ === index ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {activeFAQ === index && (
                    <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600 text-sm sm:text-base font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Left content */}
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Ready to stand out from the crowd?
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 font-normal">
                  Create your Expertisor profile and showcase what truly sets
                  you apart.
                </p>
                <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
                  Create My Profile
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Right image */}
              <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-xl overflow-hidden">
                <Image
                  src={people}
                  alt="People illustration"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="whyus" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
                why us?
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Why choose Expertisor?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 font-normal">
              Expertisor helps you create a standout profile effortlessly,
              enhancing your visibility while you sharpen your skills with
              built-in micro learning.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      FEATURES
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-center text-sm font-semibold text-gray-900">
                      EXPERTISOR
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-center text-sm font-semibold text-gray-900">
                      OTHERS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      feature: "Custom Profiles",
                      expertisor: true,
                      others: false,
                    },
                    {
                      feature: "Project Showcases",
                      expertisor: true,
                      others: false,
                    },
                    {
                      feature: "Cross-Industry Networking",
                      expertisor: true,
                      others: true,
                    },
                    {
                      feature: "Built-in Micro Learning",
                      expertisor: true,
                      others: false,
                    },
                    {
                      feature: "Career Discovery",
                      expertisor: true,
                      others: true,
                    },
                    {
                      feature: "Profile Analytics",
                      expertisor: true,
                      others: true,
                    },
                    {
                      feature: "No-Code Editing",
                      expertisor: true,
                      others: false,
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <td className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        {row.expertisor ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        {row.others ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <Image
                  src={logo}
                  alt="Expertisor Logo"
                  className="h-8 w-auto mr-2 sm:h-10 sm:mr-3"
                />
                <span className="font-bold text-lg text-black sm:text-xl">EXPERTISOR</span>
              </div>
              <div className="flex space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                {["Twitter", "Facebook", "LinkedIn", "YouTube"].map(
                  (social, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </button>
                  )
                )}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm font-medium">
                © 2025 Expertisor. All Rights Reserved
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Products
              </h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="font-medium">Expertisor Academy</div>
                <div className="font-medium">Expertisor Jobs</div>
                <div className="font-medium">Expertisor Sites</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Resources
              </h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="font-medium">Blogs</div>
                <div className="font-medium">Articles</div>
                <div className="font-medium">Templates</div>
                <div className="font-medium">Micro Learning</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Company
              </h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="font-medium">Contact Us</div>
                <div className="font-medium">About Us</div>
                <div className="font-medium">Refund Policy</div>
                <div className="font-medium">FAQs</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}