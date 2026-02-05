"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiArrowRight, FiStar } from "react-icons/fi";

// Token data with balances - colors reference CSS variables from tokens.css
const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "12.45", color: "var(--token-eth)" },
    { symbol: "USDC", name: "USD Coin", balance: "5,432.00", color: "var(--token-usdc)" },
    { symbol: "USDT", name: "Tether", balance: "1,234.50", color: "var(--token-usdt)" },
    { symbol: "SOL", name: "Solana", balance: "0.00498", color: "var(--token-sol)" },
];

type Step = 1 | 2 | 3 | 4;

// Left side content - descriptive text (legacy, not used with new design)
export function SendTab() {
    return null;
}

// Right side panel - the actual send interface with neo-brutalist styling
export function SendPanel() {
    const [step, setStep] = useState<Step>(1);
    const [selectedToken, setSelectedToken] = useState<typeof tokens[0] | null>(null);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const selectToken = (token: typeof tokens[0]) => {
        setSelectedToken(token);
        setStep(2);
    };

    const canContinue = selectedToken !== null;

    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg"
            style={{ background: "var(--color-bg-white)" }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ background: "var(--gradient-coral)" }}
                        >
                            <FiStar className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span 
                            className="font-outfit font-bold text-sm uppercase tracking-wide"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Transfer Funds
                        </span>
                    </div>
                    <span 
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-rubik font-medium text-xs tracking-wide uppercase"
                        style={{ 
                            background: "rgba(255,107,74,0.1)", 
                            border: "1px solid rgba(255,107,74,0.3)", 
                            color: "var(--color-brand-coral)" 
                        }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span 
                                className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75" 
                                style={{ background: "var(--color-brand-coral)" }} 
                            />
                            <span 
                                className="relative inline-flex rounded-full h-2 w-2" 
                                style={{ background: "var(--color-brand-coral)" }} 
                            />
                        </span>
                        Live Network
                    </span>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3, 4].map((s, index) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors"
                                style={{ 
                                    background: step >= s ? "var(--color-text-primary)" : "var(--color-gray-100)",
                                    color: step >= s ? "var(--color-bg-white)" : "var(--color-gray-400)"
                                }}
                            >
                                {s}
                            </div>
                            {index < 3 && (
                                <div 
                                    className="w-8 h-0.5 rounded" 
                                    style={{ background: "var(--color-gray-200)" }} 
                                />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <p className="text-sm font-rubik" style={{ color: "var(--color-text-muted)" }}>
                                Select a token to send
                            </p>

                            {/* Token List */}
                            <div className="space-y-2">
                                {tokens.map((token, index) => (
                                    <motion.button
                                        key={token.symbol}
                                        onClick={() => selectToken(token)}
                                        className="w-full flex items-center justify-between p-4 rounded-xl neo-border transition-all"
                                        style={{ 
                                            borderColor: selectedToken?.symbol === token.symbol 
                                                ? "var(--color-brand-coral)" 
                                                : "var(--color-border-primary)",
                                            background: selectedToken?.symbol === token.symbol 
                                                ? "rgba(255,107,74,0.05)" 
                                                : "var(--color-bg-cream-mid)"
                                        }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                                style={{ background: token.color }}
                                            >
                                                {token.symbol.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-outfit font-semibold" style={{ color: "var(--color-text-primary)" }}>
                                                    {token.name}
                                                </p>
                                                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                                    {token.symbol}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-rubik font-medium" style={{ color: "var(--color-text-secondary)" }}>
                                            {token.balance}
                                        </p>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Continue Button */}
                            <button
                                onClick={() => selectedToken && setStep(2)}
                                disabled={!canContinue}
                                className={`relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm btn-coral-gradient ${!canContinue ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <FiArrowRight className="w-4 h-4" />
                                <span>Continue</span>
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-rubik" style={{ color: "var(--color-text-muted)" }}>
                                    Enter recipient address
                                </p>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-xs transition-colors"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    ← Back
                                </button>
                            </div>

                            <div 
                                className="p-4 rounded-xl neo-border"
                                style={{ 
                                    borderColor: "var(--color-border-primary)",
                                    background: "var(--color-bg-cream-mid)"
                                }}
                            >
                                <span className="text-xs font-rubik" style={{ color: "var(--color-text-muted)" }}>To</span>
                                <input
                                    type="text"
                                    placeholder="Wallet address or ENS name"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    className="w-full bg-transparent outline-none font-outfit font-semibold mt-1"
                                    style={{ color: "var(--color-text-primary)" }}
                                />
                            </div>

                            <button
                                onClick={() => recipient && setStep(3)}
                                disabled={!recipient}
                                className={`relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm btn-coral-gradient ${!recipient ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <FiArrowRight className="w-4 h-4" />
                                <span>Continue</span>
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-rubik" style={{ color: "var(--color-text-muted)" }}>
                                    Enter amount
                                </p>
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-xs transition-colors"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    ← Back
                                </button>
                            </div>

                            <div 
                                className="p-6 rounded-xl text-center neo-border"
                                style={{ 
                                    borderColor: "var(--color-border-primary)",
                                    background: "var(--color-bg-cream-mid)"
                                }}
                            >
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-transparent outline-none font-outfit font-bold text-4xl text-center"
                                    style={{ color: "var(--color-text-primary)" }}
                                />
                                <p className="text-sm font-rubik mt-2" style={{ color: "var(--color-text-muted)" }}>
                                    {selectedToken?.symbol} • Balance: {selectedToken?.balance}
                                </p>
                            </div>

                            <button
                                onClick={() => amount && parseFloat(amount) > 0 && setStep(4)}
                                disabled={!amount || parseFloat(amount) <= 0}
                                className={`relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm btn-coral-gradient ${!amount || parseFloat(amount) <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <FiArrowRight className="w-4 h-4" />
                                <span>Review</span>
                            </button>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-rubik" style={{ color: "var(--color-text-muted)" }}>
                                    Review transaction
                                </p>
                                <button
                                    onClick={() => setStep(3)}
                                    className="text-xs transition-colors"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    ← Back
                                </button>
                            </div>

                            <div 
                                className="p-4 rounded-xl space-y-3 neo-border"
                                style={{ 
                                    borderColor: "var(--color-border-primary)",
                                    background: "var(--color-bg-cream-mid)"
                                }}
                            >
                                <div className="flex justify-between">
                                    <span className="font-rubik text-sm" style={{ color: "var(--color-text-muted)" }}>Sending</span>
                                    <span className="font-outfit font-bold" style={{ color: "var(--color-text-primary)" }}>
                                        {amount} {selectedToken?.symbol}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-rubik text-sm" style={{ color: "var(--color-text-muted)" }}>To</span>
                                    <span className="font-rubik text-sm" style={{ color: "var(--color-text-primary)" }}>
                                        {recipient.slice(0, 8)}...{recipient.slice(-6)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-rubik text-sm" style={{ color: "var(--color-text-muted)" }}>Network Fee</span>
                                    <span className="font-rubik text-sm" style={{ color: "var(--color-text-primary)" }}>~$0.12</span>
                                </div>
                            </div>

                            <button
                                className="relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm btn-coral-gradient"
                            >
                                <span>Confirm & Send</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
