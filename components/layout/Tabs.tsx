"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { FiSend, FiArrowDown, FiLink, FiLock, FiClock } from "react-icons/fi";

import { SendTab, SendPanel } from "@/components/tabs/SendTab";
import { SwapTab, SwapTabContent } from "@/components/tabs/SwapTab";
import { BridgeTab } from "@/components/tabs/BridgeTab";
import { StakeTab } from "@/components/tabs/StakeTab";
import { HistoryTab } from "@/components/tabs/HistoryTab";
import { HeroSection } from "./HeroSection";

type TabId = "send" | "swap" | "bridge" | "stake" | "history";

interface Tab {
    id: TabId;
    label: string;
    title: string;
    icon: ReactNode;
    component: ReactNode;
}

const tabs: Tab[] = [
    { id: "send", label: "Send", title: "Send", icon: <FiSend className="w-4 h-4" />, component: <SendTab /> },
    { id: "swap", label: "Swap", title: "Swap", icon: <FiArrowDown className="w-4 h-4" />, component: <SwapTabContent /> },
    { id: "bridge", label: "Bridge", title: "Bridge", icon: <FiLink className="w-4 h-4" />, component: <BridgeTab /> },
    { id: "stake", label: "Stake", title: "Stake", icon: <FiLock className="w-4 h-4" />, component: <StakeTab /> },
    { id: "history", label: "History", title: "History", icon: <FiClock className="w-4 h-4" />, component: <HistoryTab /> },
];

export function Tabs() {
    const [activeTab, setActiveTab] = useState<TabId>("send");

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)]">
            {/* Left Side - Hero Section */}
            <HeroSection />

            {/* Right Side - Tab Navigation + Action Panel */}
            <div className="w-full lg:w-[480px] flex flex-col gap-4">
                {/* Tab Navigation */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: -15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div
                        className="inline-flex items-center gap-1.5 rounded-full p-2 neo-border"
                        style={{ background: "#FFFFFF" }}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative flex items-center gap-2 px-5 py-3 text-sm font-outfit font-bold transition-all rounded-full",
                                    activeTab === tab.id
                                        ? "text-[#1A1A1A]"
                                        : "text-[#1A1A1A] hover:bg-gray-100"
                                )}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabBg"
                                        className="absolute inset-0 rounded-full neo-border-sm"
                                        style={{ background: "#F5F0EB" }}
                                        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                                    />
                                )}
                                <span className="relative z-10 hidden sm:block">{tab.icon}</span>
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Action Panel */}
                <motion.div
                    className="flex-1 pt-2"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, filter: "blur(4px)", x: 30, scale: 0.96 }}
                            animate={{ opacity: 1, filter: "blur(0px)", x: 0, scale: 1 }}
                            exit={{ opacity: 0, filter: "blur(4px)", x: -30, scale: 0.96 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            {activeTab === "send" && <SendPanel />}
                            {activeTab === "swap" && <SwapPanel />}
                            {activeTab === "bridge" && <BridgePanel />}
                            {activeTab === "stake" && <StakePanel />}
                            {activeTab === "history" && <HistoryPanel />}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Mobile Features Section */}
                <div className="lg:hidden mt-4">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-rubik text-gray-700 shadow-sm">
                                ⚡ Instant Delivery
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-rubik text-gray-700 shadow-sm">
                                🛡️ Secure
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-rubik text-gray-700 shadow-sm">
                                🌐 Multi-Chain
                            </span>
                        </div>
                        <div className="flex gap-6">
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
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Swap Panel
function SwapPanel() {
    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg"
            style={{ background: "rgba(255, 255, 255, 0.95)" }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8A6A] to-[#FF6B4A] flex items-center justify-center">
                            <FiArrowDown className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-black uppercase tracking-wide">
                            Swap Tokens
                        </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-rubik font-medium text-xs tracking-wide uppercase bg-[rgba(255,107,74,0.1)] border border-[rgba(255,107,74,0.3)] text-[#FF6B4A]">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6B4A] animate-ping opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B4A]" />
                        </span>
                        Live
                    </span>
                </div>
                <SwapTab />
            </div>
        </motion.div>
    );
}

// Bridge Panel
function BridgePanel() {
    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg"
            style={{ background: "rgba(255, 255, 255, 0.95)" }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B74D0] to-[#6B5AA0] flex items-center justify-center">
                            <FiLink className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-black uppercase tracking-wide">
                            Bridge Assets
                        </span>
                    </div>
                </div>
                <div className="text-center py-12">
                    <p className="text-gray-500 font-rubik">Cross-chain bridge coming soon</p>
                </div>
            </div>
        </motion.div>
    );
}

// Stake Panel
function StakePanel() {
    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg"
            style={{ background: "rgba(255, 255, 255, 0.95)" }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                            <FiLock className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-black uppercase tracking-wide">
                            Stake Tokens
                        </span>
                    </div>
                </div>
                <div className="text-center py-12">
                    <p className="text-gray-500 font-rubik">Staking pools coming soon</p>
                </div>
            </div>
        </motion.div>
    );
}

// History Panel
function HistoryPanel() {
    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg"
            style={{ background: "rgba(255, 255, 255, 0.95)" }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                            <FiClock className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-black uppercase tracking-wide">
                            Transaction History
                        </span>
                    </div>
                </div>
                <div className="text-center py-12">
                    <p className="text-gray-500 font-rubik">No transactions yet</p>
                </div>
            </div>
        </motion.div>
    );
}
