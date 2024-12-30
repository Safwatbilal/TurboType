'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { useAuth } from "@/store/avibilty";

const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated, currentUser } = useAuth();
  const name = currentUser?.name;
  console.log(currentUser)
  const navLinks = [
    { icon: <FaTrophy size={20} />, path: "/contest" },
    {
      icon: <FaUser size={20} />,
      path: isAuthenticated ? `/profile/${name}` : "/signup",
    },
  ];

  return (
    <nav className="flex items-center justify-between text-white py-4 px-6">
      <motion.div
        className="text-2xl font-bold"
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, color: "#F39C12" }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            TurboType
          </motion.span>
        </Link>
      </motion.div>
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link key={link.path} href={link.path}>
            <motion.div
              className={`flex items-center gap-2 text-xl cursor-pointer ${pathname === link.path ? "font-bold" : ""}`}
              transition={{ duration: 0.5 }}
              whileHover={{ color: "#F39C12" }}
              whileTap={{ scale: 1.2 }} 
            >
              <span
                className={`p-2 rounded-full ${pathname === link.path ? "text-[#F39C12]" : "text-[#646669]"}`}
              >
                {link.icon}
              </span>
              {link.path.includes("profile") && isAuthenticated && (
                <span className="text-[#646669]">{name}</span>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Header;
