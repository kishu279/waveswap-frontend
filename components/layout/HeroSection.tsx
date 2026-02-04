"use client";

import { motion } from "motion/react";

export function HeroSection() {
    return (
        <div className="flex-1 pt-4 lg:pt-8">
            {/* Hero Title */}
            <motion.div
                initial={{ opacity: 0, filter: "blur(8px)", y: 40 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <h1
                    className="font-outfit text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.0] tracking-tighter mb-6"
                    style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.08)" }}
                >
                    <motion.span
                        className="block text-[#1A1A1A]"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        SEND
                    </motion.span>
                    <motion.span
                        className="block text-[#FF6B4A] italic font-extrabold"
                        style={{ textShadow: "3px 3px 0px rgba(255, 107, 74, 0.2)" }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        TOKENS
                    </motion.span>
                    <motion.span
                        className="block text-[#1A1A1A]"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        ANYWHERE.
                    </motion.span>
                </h1>
            </motion.div>

            {/* Description */}
            <motion.p
                className="text-base lg:text-lg text-black/80 max-w-lg font-rubik leading-relaxed font-semibold mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                Transfer tokens to any wallet address instantly. Low fees, maximum security, powered by institutional-grade infrastructure.
            </motion.p>

            {/* Features Section - Desktop Only */}
            <div className="hidden lg:block">
                <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="space-y-6"
                >
                    {/* Feature Tags */}
                    <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-rubik text-gray-700 shadow-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            Instant Delivery
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-rubik text-gray-700 shadow-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            Secure
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-rubik text-gray-700 shadow-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                            </svg>
                            Multi-Chain
                        </span>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="flex gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        <div>
                            <p className="font-outfit font-bold text-xl text-black">$2.4B+</p>
                            <p className="text-xs text-gray-500 font-rubik">Total Sent</p>
                        </div>
                        <div>
                            <p className="font-outfit font-bold text-xl text-black">1.2M+</p>
                            <p className="text-xs text-gray-500 font-rubik">Transactions</p>
                        </div>
                        <div>
                            <p className="font-outfit font-bold text-xl text-black">~12s</p>
                            <p className="text-xs text-gray-500 font-rubik">Avg. Time</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
