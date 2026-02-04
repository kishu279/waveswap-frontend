"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Token data
const tokens = [
    { symbol: "USDC", name: "USD Coin", icon: "💵", color: "#2775CA" },
    { symbol: "SOL", name: "Solana", icon: "◎", color: "#9945FF" },
    { symbol: "ETH", name: "Ethereum", icon: "⟠", color: "#627EEA" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "#F7931A" },
];

interface TokenInputProps {
    label: string;
    token: typeof tokens[0];
    amount: string;
    usdValue: string;
    onAmountChange?: (value: string) => void;
    isOutput?: boolean;
}

function TokenInput({ label, token, amount, usdValue, onAmountChange, isOutput }: TokenInputProps) {
    return (
        <div 
            className="rounded-2xl p-4"
            style={{ 
                background: "var(--color-bg-cream-mid)", 
                border: "1px solid var(--color-border-secondary)" 
            }}
        >
            <div className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>{label}</div>
            <div className="flex items-center justify-between">
                <button 
                    className="flex items-center gap-2 rounded-full px-3 py-2 transition-colors"
                    style={{ background: "var(--color-bg-cream-dark)" }}
                >
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: token.color }}
                    >
                        {token.icon}
                    </div>
                    <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{token.symbol}</span>
                    <svg className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="text-right">
                    {isOutput ? (
                        <div className="text-3xl font-light" style={{ color: "var(--color-text-primary)" }}>{amount}</div>
                    ) : (
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => onAmountChange?.(e.target.value)}
                            placeholder="0.00"
                            className="text-3xl font-light bg-transparent text-right w-32 outline-none"
                            style={{ color: "var(--color-text-primary)" }}
                        />
                    )}
                    <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>${usdValue}</div>
                </div>
            </div>
        </div>
    );
}

// Left side content - just descriptive text
export function SwapTabContent() {
    return (
        <div className="space-y-4">
            <p className="text-3xl leading-relaxed font-light" style={{ color: "var(--color-text-secondary)" }}>
                swap your bags
            </p>
            <p className="text-3xl leading-relaxed font-light" style={{ color: "var(--color-text-muted)" }}>
                like a degen
            </p>
            <p className="text-xl mt-8" style={{ color: "var(--color-text-muted)" }}>
                🔄 Turn your shitcoins into slightly different shitcoins. Financial freedom has never felt this chaotic.
            </p>
        </div>
    );
}

// Right side panel - the actual swap interface
export function SwapTab() {
    const [sellToken, setSellToken] = useState(tokens[0]); // USDC
    const [buyToken, setBuyToken] = useState(tokens[1]);   // SOL
    const [sellAmount, setSellAmount] = useState("0.00");
    const [isSwapping, setIsSwapping] = useState(false);
    const [swapKey, setSwapKey] = useState(0);

    const handleSwapTokens = () => {
        setIsSwapping(true);

        // Delay the actual swap to let animation play
        setTimeout(() => {
            setSellToken(buyToken);
            setBuyToken(sellToken);
            setSwapKey(prev => prev + 1);
            setIsSwapping(false);
        }, 300);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Order Type Tabs */}
            <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex rounded-full p-1" style={{ background: "var(--color-bg-cream-mid)" }}>
                    <button 
                        className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm"
                        style={{ background: "var(--color-success)", color: "var(--color-bg-cream)" }}
                    >
                        Market
                    </button>
                    <button 
                        className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors text-xs sm:text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Limit
                    </button>
                    <button 
                        className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors text-xs sm:text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Recurring
                    </button>
                </div>
                <div className="flex gap-1 sm:gap-2">
                    <button 
                        className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full border text-xs sm:text-sm transition-colors"
                        style={{ borderColor: "var(--color-border-secondary)", color: "var(--color-text-secondary)" }}
                    >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="hidden sm:inline">Paste CA</span>
                    </button>
                    <button 
                        className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full border text-xs sm:text-sm transition-all"
                        style={{ 
                            background: "linear-gradient(to right, rgba(139, 116, 208, 0.2), rgba(59, 130, 246, 0.2))",
                            borderColor: "var(--color-brand-lavender)",
                            color: "var(--color-text-primary)"
                        }}
                    >
                        ✨<span className="hidden sm:inline ml-1">Ultra</span>
                    </button>
                </div>
            </div>

            {/* Swap Container */}
            <div className="relative">
                {/* Token Inputs with Animation */}
                <div className="space-y-2">
                    <motion.div
                        key={`sell-${swapKey}`}
                        initial={swapKey > 0 ? { y: 80, opacity: 0, rotateX: -90 } : false}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.4
                        }}
                    >
                        <TokenInput
                            label="Sell"
                            token={sellToken}
                            amount={sellAmount}
                            usdValue="0"
                            onAmountChange={setSellAmount}
                        />
                    </motion.div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-3 relative z-10">
                        <motion.button
                            onClick={handleSwapTokens}
                            className="w-10 h-10 rounded-full border-4 flex items-center justify-center transition-colors group"
                            style={{ 
                                background: "var(--color-bg-cream-dark)", 
                                borderColor: "var(--color-bg-cream)" 
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={isSwapping ? { rotate: 180 } : { rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.svg
                                className="w-5 h-5"
                                style={{ color: "var(--color-success)" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </motion.svg>
                        </motion.button>
                    </div>

                    <motion.div
                        key={`buy-${swapKey}`}
                        initial={swapKey > 0 ? { y: -80, opacity: 0, rotateX: 90 } : false}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.4
                        }}
                    >
                        <TokenInput
                            label="Buy"
                            token={buyToken}
                            amount="0.00"
                            usdValue="0"
                            isOutput
                        />
                    </motion.div>
                </div>
            </div>

            {/* Connect Button */}
            <motion.button
                className="w-full mt-6 py-4 rounded-2xl font-semibold text-lg transition-colors"
                style={{ background: "var(--color-success)", color: "var(--color-bg-cream)" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                Connect
            </motion.button>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
                <button 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors"
                    style={{ 
                        background: "var(--color-bg-cream-mid)", 
                        borderColor: "var(--color-border-secondary)",
                        color: "var(--color-text-secondary)"
                    }}
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Show Chart
                </button>
                <button 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors"
                    style={{ 
                        background: "var(--color-bg-cream-mid)", 
                        borderColor: "var(--color-border-secondary)",
                        color: "var(--color-text-secondary)"
                    }}
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Show History
                </button>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div
                    className="rounded-2xl p-4"
                    style={{ 
                        background: "var(--color-bg-cream-mid)", 
                        border: "1px solid var(--color-border-secondary)" 
                    }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#2775CA] flex items-center justify-center text-sm">
                            💵
                        </div>
                        <div>
                            <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>USDC</div>
                            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>EPjF...Dt1v</div>
                        </div>
                        <div className="ml-auto text-right">
                            <div style={{ color: "var(--color-text-primary)" }}>$0.99969</div>
                            <div className="text-xs" style={{ color: "var(--color-success)" }}>0%</div>
                        </div>
                    </div>
                    <div className="h-12 flex items-end gap-0.5">
                        {[40, 35, 45, 30, 50, 55, 45, 60, 50, 45].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-sm"
                                style={{ height: `${h}%`, background: "rgba(239, 68, 68, 0.6)" }}
                            />
                        ))}
                    </div>
                    <a 
                        href="#" 
                        className="text-sm mt-2 inline-flex items-center gap-1 transition-colors"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Open Page ↗
                    </a>
                </motion.div>

                <motion.div
                    className="rounded-2xl p-4"
                    style={{ 
                        background: "var(--color-bg-cream-mid)", 
                        border: "1px solid var(--color-border-secondary)" 
                    }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#9945FF] flex items-center justify-center text-sm">
                            ◎
                        </div>
                        <div>
                            <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>SOL</div>
                            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>So11...1112</div>
                        </div>
                        <div className="ml-auto text-right">
                            <div style={{ color: "var(--color-text-primary)" }}>$102.38</div>
                            <div className="text-xs" style={{ color: "var(--color-error)" }}>-0.69%</div>
                        </div>
                    </div>
                    <div className="h-12 flex items-end gap-0.5">
                        {[60, 55, 50, 45, 40, 35, 38, 32, 30, 28].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-sm"
                                style={{ height: `${h}%`, background: "rgba(239, 68, 68, 0.6)" }}
                            />
                        ))}
                    </div>
                    <a 
                        href="#" 
                        className="text-sm mt-2 inline-flex items-center gap-1 transition-colors"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Open Page ↗
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
