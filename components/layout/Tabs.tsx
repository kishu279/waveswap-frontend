"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

import { SendTab, SendPanel } from "@/components/tabs/SendTab";
import { SwapTab, SwapTabContent } from "@/components/tabs/SwapTab";
import { BridgeTab } from "@/components/tabs/BridgeTab";
import { StakeTab } from "@/components/tabs/StakeTab";
import { HistoryTab } from "@/components/tabs/HistoryTab";

type TabId = "send" | "swap" | "bridge" | "stake" | "history";

interface Tab {
    id: TabId;
    label: string;
    title: string;
    component: ReactNode;
}

const tabs: Tab[] = [
    { id: "send", label: "send", title: "Send", component: <SendTab /> },
    { id: "swap", label: "swap", title: "Swap", component: <SwapTabContent /> },
    { id: "bridge", label: "bridge", title: "Bridge", component: <BridgeTab /> },
    { id: "stake", label: "stake", title: "Stake", component: <StakeTab /> },
    { id: "history", label: "history", title: "History", component: <HistoryTab /> },
];

export function Tabs() {
    const [activeTab, setActiveTab] = useState<TabId>("send");

    const activeTabData = tabs.find((t) => t.id === activeTab);

    const isSwapTab = activeTab === "swap";
    const isSendTab = activeTab === "send";
    const isCompactTab = isSwapTab || isSendTab;

    return (
        <div className="flex gap-8 min-h-[calc(100vh-160px)]">
            {/* Left Side - Heading and Description */}
            <div className="flex-1 pt-8">
                {/* Animated Title */}
                <div className="h-24 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={activeTab}
                            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -40, x: 40, filter: "blur(8px)", scale: 1.5 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 10,
                            }}
                            className="font-outfit text-6xl font-bold text-white absolute"
                        >
                            {activeTabData?.title.split("").map((letter, letterIndex) => (
                                <motion.span
                                    key={letter + letterIndex}
                                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{
                                        delay: letterIndex * 0.05,
                                        duration: 0.2,
                                    }}
                                    className="inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTabData?.component}
                </div>
            </div>

            {/* Right Side - Tab Navigation + Action Panel */}
            <div className="w-[480px] flex flex-col gap-4">
                {/* Tab Navigation */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-1 border border-zinc-700 rounded-4xl p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative px-4 py-1.5 text-sm font-medium transition-colors",
                                    activeTab === tab.id
                                        ? "text-white"
                                        : "text-zinc-500 hover:text-zinc-300"
                                )}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-zinc-800 rounded-4xl"
                                        transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Panel - No border for all tabs */}
                <div className="flex-1 pt-2 flex justify-center">
                    {activeTab === "send" && <SendPanel />}
                    {activeTab === "swap" && <SwapTab />}
                    {activeTab === "bridge" && <BridgePanel />}
                    {activeTab === "stake" && <StakePanel />}
                    {activeTab === "history" && <HistoryPanel />}
                </div>
            </div>
        </div>
    );
}

// SendPanel is now imported from SendTab

// Swap Panel
function SwapPanel() {
    return (
        <div className="space-y-4">
            <div className="flex gap-2 mb-4">
                <button className="px-4 py-2 bg-zinc-800 rounded-lg text-white text-sm">Market</button>
                <button className="px-4 py-2 text-zinc-500 text-sm hover:text-white transition-colors">Limit</button>
                <button className="px-4 py-2 text-zinc-500 text-sm hover:text-white transition-colors">Recurring</button>
            </div>

            <div className="border border-zinc-700 rounded-xl p-4 bg-zinc-900/50">
                <p className="text-sm text-zinc-400 mb-2">Sell</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                        <span>USDC</span>
                        <span className="text-zinc-400">▼</span>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl text-zinc-300">0.00</p>
                        <p className="text-sm text-zinc-500">$0</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-10 h-10 border border-zinc-700 rounded-full flex items-center justify-center bg-zinc-900">
                    <span>⇅</span>
                </div>
            </div>

            <div className="border border-zinc-700 rounded-xl p-4 bg-zinc-900/50">
                <p className="text-sm text-zinc-400 mb-2">Buy</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
                        <span>SOL</span>
                        <span className="text-zinc-400">▼</span>
                    </div>
                    <p className="text-sm text-zinc-500">$0</p>
                </div>
            </div>

            <button className="w-full py-4 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors">
                Connect
            </button>
        </div>
    );
}

// Bridge Panel
function BridgePanel() {
    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            <div className="flex gap-2 mb-4">
                <button className="px-4 py-2 bg-lime-400 text-black rounded-lg text-sm font-semibold">Transfer</button>
                <button className="px-4 py-2 text-zinc-500 text-sm hover:text-white transition-colors">Liquidity</button>
                <button className="px-4 py-2 text-zinc-500 text-sm hover:text-white transition-colors">NFT</button>
            </div>

            <div className="border border-zinc-700 rounded-xl p-4 bg-zinc-900/50">
                <div className="flex justify-between mb-2">
                    <p className="text-sm text-zinc-400">From</p>
                    <div className="flex items-center gap-2 text-sm">
                        <span>Ethereum Mainnet</span>
                        <span className="text-zinc-400">▼</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-zinc-500">Amount:</p>
                        <p className="text-3xl font-semibold">9.8062</p>
                        <p className="text-sm text-zinc-500">≈ $9,865.96</p>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-green-500"></div>
                        <span>USDT</span>
                        <span className="text-zinc-400">▼</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-10 h-10 border border-zinc-700 rounded-full flex items-center justify-center bg-zinc-900">
                    <span>⇅</span>
                </div>
            </div>

            <div className="border border-zinc-700 rounded-xl p-4 bg-zinc-900/50">
                <div className="flex justify-between mb-2">
                    <p className="text-sm text-zinc-400">To</p>
                    <div className="flex items-center gap-2 text-sm">
                        <span>Avalanche Chain</span>
                        <span className="text-zinc-400">▼</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-zinc-500">You will receive:</p>
                        <p className="text-3xl font-semibold">9.799144</p>
                        <p className="text-sm text-zinc-500">≈ $9,863.91</p>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-green-500"></div>
                        <span>USDT</span>
                    </div>
                </div>
            </div>

            <button className="w-full py-4 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors">
                Confirm Transfer
            </button>
        </div>
    );
}

// Stake Panel
function StakePanel() {
    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            <div className="text-center mb-6">
                <p className="text-zinc-400">Sa=take IN for extra rewards.</p>
                <p className="text-2xl font-bold">APR <span className="text-purple-400">36.3%</span></p>
            </div>

            <div className="flex gap-2 mb-4">
                <button className="flex-1 py-3 bg-purple-600/30 border border-purple-500 rounded-xl text-white">Stake</button>
                <button className="flex-1 py-3 text-zinc-500 hover:text-white transition-colors">Unstake</button>
                <button className="flex-1 py-3 text-zinc-500 hover:text-white transition-colors">Withdraw</button>
            </div>

            <div className="border border-yellow-600/30 rounded-xl p-3 bg-yellow-950/20">
                <p className="text-yellow-500 text-sm">⚠️ Withdrawals become available 7 days after you unstake.</p>
            </div>

            <div className="border border-zinc-700 rounded-xl p-4 bg-zinc-900/50">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-zinc-400">You're Stake</p>
                        <p className="text-4xl font-bold">19.03</p>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                        <span>ETH</span>
                        <span className="text-zinc-400">▼</span>
                    </div>
                </div>
                <p className="text-sm text-zinc-500 text-right">$49,963.91 <span className="text-purple-400">Max</span></p>
            </div>

            <div className="flex justify-center">
                <div className="w-10 h-10 border border-zinc-700 rounded-full flex items-center justify-center bg-zinc-900">
                    <span>⇅</span>
                </div>
            </div>

            <div className="border border-zinc-700 rounded-xl p-4 bg-zinc-900/50">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-zinc-400">You'll receive</p>
                        <p className="text-4xl font-bold">938.24</p>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                        <span>STK</span>
                        <span className="text-zinc-400">▼</span>
                    </div>
                </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-zinc-600 to-zinc-400 text-white font-semibold rounded-xl">
                Stake Now 🔒
            </button>
        </div>
    );
}

// History Panel
function HistoryPanel() {
    const transactions = [
        { name: "Sarah Mitchell", date: "Today 10am", type: "Send", amount: "+$100.00", positive: true },
        { name: "Emily Johnson", date: "Yesterday 10am", type: "Send", amount: "+$80.00", positive: true },
        { name: "Michael Brown", date: "12 July", type: "Received", amount: "-$40.00", positive: false },
        { name: "Jessica Taylor", date: "14 July", type: "Received", amount: "-$20.00", positive: false },
        { name: "David Wilson", date: "18 July", type: "Send", amount: "+$70.00", positive: true },
        { name: "Sophia Davis", date: "20 July", type: "Send", amount: "+$160.00", positive: true },
    ];

    return (
        <div className="w-full max-w-md mx-auto space-y-2">
            <div className="flex gap-2 mb-4">
                <button className="px-4 py-2 bg-zinc-800 rounded-full text-white text-sm">All</button>
                <button className="px-4 py-2 border border-zinc-700 rounded-full text-zinc-500 text-sm hover:text-white transition-colors">Send</button>
                <button className="px-4 py-2 border border-zinc-700 rounded-full text-zinc-500 text-sm hover:text-white transition-colors">Received</button>
            </div>

            {transactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-zinc-700/50 rounded-xl hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.positive ? 'bg-green-500' : 'bg-red-400'}`}>
                            <span className="text-white font-bold">$</span>
                        </div>
                        <div>
                            <p className="font-semibold">{tx.name}</p>
                            <p className="text-sm text-zinc-500">{tx.date} • {tx.type}</p>
                        </div>
                    </div>
                    <p className={`font-semibold ${tx.positive ? 'text-green-400' : 'text-red-400'}`}>{tx.amount}</p>
                </div>
            ))}
        </div>
    );
}
