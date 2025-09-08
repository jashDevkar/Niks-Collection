"use client";

import { Heart, Search, Menu, X, User } from "lucide-react";
import React, { useState } from "react";
import "./navbar.css";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice.js";

export default function Navbar() {
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);




  const links = [
    { name: "Home", link: "/" },
    { name: "Rakhis", link: "#" },
    { name: "Baby rakhis", link: "#" },
    { name: "Broch", link: "#" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="flex fixed left-0 right-0 justify-around  items-center py-4 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
      {/* Logo */}
      <h1 className="text-xl bg-gradient-to-br from-pink-700 to-pink-500 bg-clip-text text-transparent font-semibold">
        Niks Collections
      </h1>

      {/* Desktop Links */}
      <ul className="gap-4 hidden md:flex">
        {links.map((item, index) => (
          <li
            key={index}
            className={`font-medium ${pathName === item.link ? "text-pink-600" : "text-gray-700"
              } font-semibold tracking-wide nav-link after:bg-pink-600`}
          >
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>

      {/* Right Side (Desktop & Icons) */}
      <div className="flex gap-[15px] items-center">
        <div className="hover:bg-pink-600 hover:text-white hover:rounded-xl p-2 cursor-pointer hidden md:block">
          <Search
            className="w-5 h-5"
            onClick={() => setIsSearching((prev) => !prev)}
          />
        </div>

        <div className="hover:bg-pink-600 hover:text-white hover:rounded-xl p-2 cursor-pointer">
          <Heart className="w-5 h-5" />
        </div>

        {/* Desktop Auth */}
        {loading ? (
          <div>Loading...</div>
        ) : isAuthenticated ? (
          <div
            className="relative hidden md:block"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className={`flex items-center gap-2 cursor-pointer  p-2 ${showDropdown? "bg-pink-600 text-white hover:text-white":null} hover:text-pink-600  rounded-xl`}>
              <User className="w-5 h-5" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-fit bg-white shadow-md rounded-lg  p-2 z-50">
                <p className="px-3 py-2 text-sm text-gray-700 border-b">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            className="bg-pink-600 text-white rounded-xl  hidden md:block"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-100 md:hidden 
        transform transition-all duration-300 ease-in-out 
        ${isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4">
          {links.map((item, index) => (
            <li
              key={index}
              className="font-medium text-gray-700 nav-link after:bg-pink-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <a href={item.link}>{item.name}</a>
            </li>
          ))}

          
          {loading ? (
            <li className="text-gray-500">Loading...</li>
          ) : isAuthenticated ? (
            <li className="w-full  ">
              <div className="bg-transparent p-3 rounded-lg  flex flex-col items-center border-t-1 border-gray-500 mx-10">
                <p className="text-sm font-medium text-gray-700 mb-2">{user.email}</p>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center text-sm text-red-600 hover:bg-gray-100 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li className="w-full px-4">
              <Button
                className="bg-pink-600 text-white w-full rounded-xl p-2"
                onClick={() => {
                  router.push("/login");
                  setIsMenuOpen(false);
                }}
              >
                Login
              </Button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
