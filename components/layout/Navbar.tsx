"use client";

import { FiSearch, FiArrowRight } from "react-icons/fi";
import { motion } from "motion/react";

export function Navbar() {
    return (
        <motion.nav
            className="flex items-center justify-between gap-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center relative neo-border"
                    style={{
                        background: "linear-gradient(135deg, #1A1A1A 0%, #333333 100%)",
                    }}
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path
                            d="M2 12C4 8 6 10 8 12C10 14 12 10 14 12C16 14 18 10 20 12C22 14 22 12 22 12"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M2 17C4 13 6 15 8 17C10 19 12 15 14 17C16 19 18 15 20 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.5"
                        />
                    </svg>
                </div>
                <span
                    className="font-outfit text-2xl font-black tracking-tight text-[#1A1A1A]"
                    style={{ textShadow: "2px 2px 0px rgba(0, 0, 0, 0.1)" }}
                >
                    WAVETEK
                </span>
            </div>

            {/* Search Box */}
            <div
                className="hidden md:flex items-center rounded-full overflow-visible neo-border"
                style={{
                    background: "#FFFFFF",
                    width: 320,
                }}
            >
                <div className="flex items-center w-full px-5 py-3.5">
                    <div className="flex-shrink-0 mr-4">
                        <FiSearch className="w-[22px] h-[22px] text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tokens, pools, wallets..."
                        className="flex-1 bg-transparent outline-none font-rubik text-base font-semibold text-[#1A1A1A] placeholder:text-gray-500 min-w-0"
                    />
                </div>
            </div>

            {/* Connect Wallet Button */}
            <button
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-outfit font-bold text-base text-white relative overflow-hidden neo-border neo-hover btn-coral"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent shimmer" />
                <svg className="text-current" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-3" />
                    <circle cx="18" cy="12" r="2" />
                </svg>
                <span className="hidden sm:inline relative z-10">Connect Wallet</span>
                <span className="hidden sm:inline relative z-10">
                    <FiArrowRight className="w-4 h-4" />
                </span>
            </button>
        </motion.nav>
    );
}
