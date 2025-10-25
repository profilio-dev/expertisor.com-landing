"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Loader2, CheckCircle, XCircle, RotateCcw, Mail, Shield, ArrowLeft, Sparkles } from "lucide-react";
import { SERVER_URL } from "@/constants/siteConfig";
import { useRouter } from "next/navigation";
import { OTPVerificationRequest } from "@/models/OtpVerificationRequest";
import { userReservation } from "@/models/userReservation";
import boxBg from "../../../../public/images/box1.svg";
import logo from "../../../../public/images/Logo.svg";

interface VerifyOtpProps {
  username: string;
}

export default function VerifyOtpClient({ username }: VerifyOtpProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && otpRequested) {
      const countdown = setTimeout(() => setTimer(prev => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (otpRequested) {
      setResendEnabled(true);
    }
  }, [timer, otpRequested]);

  // Email validation
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "Email is required.";
    if (!regex.test(value)) return "Please enter a valid email address.";
    return "";
  };

  // OTP input focus
  useEffect(() => {
    if (otpRequested) inputsRef.current[0]?.focus();
  }, [otpRequested]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value[0] || "";
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Request OTP
  const handleGetOtp = async () => {
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setEmailError("");
    setIsLoading(true);
    try {
      const req = new userReservation(username!, email);
      const res = await axios.post(`${SERVER_URL}/reserve-username/`, req);
      setStatus({ success: true, message: res.data.message });
      setOtpRequested(true);
      setTimer(30);
      setResendEnabled(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setStatus({ success: false, message: error.response.data.detail });
      } else {
        setStatus({ success: false, message: "Failed to send OTP. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setStatus({ success: false, message: "Please enter a 6-digit OTP." });
      return;
    }

    setIsLoading(true);
    try {
      const req = new OTPVerificationRequest(email, code);
      const res = await axios.post(`${SERVER_URL}/verify-otp`, req);
      setStatus({ success: true, message: res.data.message });
      setShowModal(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setStatus({ success: false, message: error.response.data.detail });
      } else {
        setStatus({ success: false, message: "Invalid or expired OTP. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (otpRequested) {
      setOtpRequested(false);
      setStatus(null);
    } else {
      router.back();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%),
          url(${boxBg.src})
        `,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute -top-16 left-0 flex items-center text-gray-600 hover:text-gray-900 transition-colors group mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Header Section */}
          <div className="bg-black p-6 text-center text-white">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
             
                <img
                src={logo.src}
                alt="Expertisor Logo"
                className="h-20 w-auto"
              />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {otpRequested ? "Verify Your Email" : "Secure Your Domain"}
            </h1>
            <p className="text-blue-100 text-sm">
              {otpRequested 
                ? `Enter the 6-digit code sent to ${email}`
                : `Claim ${username}.expertisor.com`
              }
            </p>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Email Input Section */}
            {!otpRequested && (
              <div className="space-y-6">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <span className="text-yellow-400 mr-2">✨</span>
                    {username}.expertisor.com
                  </div>
                </div>

                <div className="relative">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 text-black border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-300 hover:border-gray-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleGetOtp}
                  disabled={isLoading}
                  className="w-full bg-black text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Verification Code
                      <Mail className="w-4 h-4 ml-2" />
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* OTP Section */}
            {otpRequested && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-600 mb-2">
                    We sent a code to <span className="font-semibold text-gray-900">{email}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Enter the 6-digit verification code
                  </p>
                </div>

                {/* OTP Inputs */}
                <div className="flex justify-between space-x-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputsRef.current[idx] = el!;
                      }}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 border-2 border-gray-200 bg-gray-50 rounded-xl text-center text-xl font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 hover:border-gray-300"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  {resendEnabled ? (
                    <button
                      onClick={handleGetOtp}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center mx-auto transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Resend Verification Code
                    </button>
                  ) : (
                    <div className="flex items-center justify-center text-gray-500 text-sm">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resend code in <span className="font-semibold text-gray-700 ml-1">{timer}s</span>
                    </div>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full bg-black text-white py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center">
                      Verify & Claim Domain
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Status Message */}
            
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            <Shield className="w-3 h-3 mr-1" />
            Your information is secure and encrypted
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center w-full max-w-md animate-scale-in">
            {/* Success Icon */}
            <div className="relative inline-flex mb-6">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Success Content */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Congratulations! 🎉
            </h2>
            <p className="text-gray-600 mb-2">
              Your domain has been successfully reserved!
            </p>
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-4 rounded-xl mb-6">
              <span className="font-mono font-bold text-lg">
                {username}.expertisor.com
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Registered to <span className="font-semibold text-gray-700">{email}</span>
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/");
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-black to-yellow-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                Continue Building
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}