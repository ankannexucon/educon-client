import React, { useState } from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState("login"); 
  const [role, setRole] = useState("student");

  const handleAuthToggle = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const roles = [
    { label: "Student", value: "student" },
    { label: "Agency", value: "agency" },
    { label: "University", value: "university" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-500 via-white-700 to-indigo-900 p-4">
      <div
        className="bg-white/95 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center transform transition-all duration-700 hover:scale-[1.02] hover:shadow-blue-300"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          {authMode === "login" ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          {authMode === "login"
            ? "Login to your account to continue your journey."
            : "Sign up to explore opportunities and connect globally."}
        </p>

        {/* Role Tabs */}
        <div className="flex justify-center mb-6 space-x-2">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`px-4 py-1 rounded-full font-semibold text-sm transition-all duration-300 ${
                role === r.value
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="flex flex-col gap-3 text-left">
          {authMode === "signup" && (
            <input
              type="text"
              placeholder={
                role === "student"
                  ? "Student Name"
                  : role === "agency"
                  ? "Agency Name"
                  : "University Name"
              }
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          )}

          <input
            type="email"
            placeholder={
              role === "university"
                ? "University Email"
                : role === "agency"
                ? "Agency Email"
                : "Student Email"
            }
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          {authMode === "signup" && (
            <input
              type="tel"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              maxLength={10}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          )}

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-bold py-2 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
            <FaGoogle className="text-blue-500" /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-blue-100 transition">
            <FaLinkedin className="text-blue-800" /> Continue with LinkedIn
          </button>
        </div>

        {/* Toggle */}
        <p className="mt-4 text-gray-600 text-sm">
          {authMode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={handleAuthToggle}
            className="text-blue-700 font-semibold hover:underline"
          >
            {authMode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
