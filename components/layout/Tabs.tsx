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

type TabId = "send" | "swap" | "bridge" | "stake" | "history";

interface Tab {
  id: TabId;
  label: string;
  title: string;
  icon: ReactNode;
  component: ReactNode;
}

interface HeroContent {
  line1: string;
  line2: string;
  line3: string;
  description: string;
  tags: string[];
  stats: { value: string; label: string }[];
}

const heroContent: Record<TabId, HeroContent> = {
  send: {
    line1: "SEND",
    line2: "TOKENS",
    line3: "ANYWHERE.",
    description:
      "Transfer tokens to any wallet address instantly. Low fees, maximum security, powered by institutional-grade infrastructure.",
    tags: ["⚡ Instant Delivery", "🛡️ Secure", "🌐 Multi-Chain"],
    stats: [
      { value: "$2.4B+", label: "Total Sent" },
      { value: "1.2M+", label: "Transactions" },
      { value: "~12s", label: "Avg. Time" },
    ],
  },
  swap: {
    line1: "SWAP",
    line2: "ASSETS",
    line3: "INSTANTLY.",
    description:
      "Exchange tokens at the best rates. Aggregated liquidity from multiple DEXs ensures optimal pricing.",
    tags: ["⚡ Best Rates", "🌐 Multi-DEX", "🛡️ MEV Protected"],
    stats: [
      { value: "$8.2B+", label: "Total Volume" },
      { value: "4.5M+", label: "Swaps" },
      { value: "$12M+", label: "Savings" },
    ],
  },
  bridge: {
    line1: "BRIDGE",
    line2: "CHAINS",
    line3: "SEAMLESSLY.",
    description:
      "Move assets across blockchains with ease. Support for all major networks with fast finality.",
    tags: ["🌐 10+ Chains", "⚡ Fast Finality", "🛡️ Audited"],
    stats: [
      { value: "$1.8B+", label: "Bridged Volume" },
      { value: "890K+", label: "Bridges" },
      { value: "~2min", label: "Avg. Time" },
    ],
  },
  stake: {
    line1: "STAKE &",
    line2: "EARN",
    line3: "REWARDS.",
    description:
      "Put your assets to work. Stake tokens and earn competitive yields with flexible lock periods.",
    tags: ["✨ Auto-Compound", "🛡️ Non-Custodial", "⚡ Flexible"],
    stats: [
      { value: "$420M+", label: "Total Staked" },
      { value: "52K+", label: "Stakers" },
      { value: "8.2%", label: "Avg. APR" },
    ],
  },
  history: {
    line1: "TRACK",
    line2: "EVERY",
    line3: "TRANSACTION.",
    description:
      "Complete visibility into your activity. Review past transactions, pending actions, and account history.",
    tags: ["🌐 All Networks", "📊 Exportable", "⚡ Real-time"],
    stats: [
      { value: "24", label: "This Month" },
      { value: "342", label: "All Time" },
      { value: "$12.4K", label: "Volume" },
    ],
  },
};

const tabs: Tab[] = [
  {
    id: "send",
    label: "Send",
    title: "Send",
    icon: <FiSend className="w-4 h-4" />,
    component: <SendTab />,
  },
  {
    id: "swap",
    label: "Swap",
    title: "Swap",
    icon: <FiArrowDown className="w-4 h-4" />,
    component: <SwapTabContent />,
  },
  {
    id: "bridge",
    label: "Bridge",
    title: "Bridge",
    icon: <FiLink className="w-4 h-4" />,
    component: <BridgeTab />,
  },
  {
    id: "stake",
    label: "Stake",
    title: "Stake",
    icon: <FiLock className="w-4 h-4" />,
    component: <StakeTab />,
  },
  {
    id: "history",
    label: "History",
    title: "History",
    icon: <FiClock className="w-4 h-4" />,
    component: <HistoryTab />,
  },
];

export function Tabs() {
  const [activeTab, setActiveTab] = useState<TabId>("send");

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)]">
      {/* Left Side - Dynamic Hero Section */}
      <div className="flex-1 pt-4 lg:pt-8 mt-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, filter: "blur(8px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Hero Title */}
            <h1
              className="font-outfit text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.0] tracking-tighter mb-6"
              style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.08)" }}
            >
              <motion.span
                className="block"
                style={{ color: "var(--color-text-primary)" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {heroContent[activeTab].line1}
              </motion.span>
              <motion.span
                className="block italic font-extrabold"
                style={{
                  color: "var(--color-brand-coral)",
                  textShadow: "3px 3px 0px rgba(255, 107, 74, 0.2)",
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {heroContent[activeTab].line2}
              </motion.span>
              <motion.span
                className="block"
                style={{ color: "var(--color-text-primary)" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {heroContent[activeTab].line3}
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              className="text-base lg:text-lg max-w-lg font-rubik leading-relaxed font-semibold mb-8"
              style={{ color: "var(--color-text-secondary)" }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {heroContent[activeTab].description}
            </motion.p>

            {/* Features Section - Desktop Only */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="space-y-6"
              >
                {/* Feature Tags */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {heroContent[activeTab].tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-rubik shadow-sm"
                      style={{
                        background: "var(--color-bg-white)",
                        border: "1px solid var(--color-gray-200)",
                        color: "var(--color-text-secondary)",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="flex gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  {heroContent[activeTab].stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                    >
                      <p
                        className="font-outfit font-bold text-xl"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {stat.value}
                      </p>
                      <p
                        className="text-xs font-rubik"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side - Tab Navigation + Action Panel */}
      <div className="w-full lg:w-[480px] flex flex-col gap-4">
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Desktop Tab Navigation (≥ 460px) - Original Design */}
          <div
            className="tab-nav-desktop items-center gap-1.5 rounded-full p-2 neo-border"
            style={{ background: "var(--color-bg-white)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-3 text-sm font-outfit font-bold transition-all rounded-full",
                  activeTab === tab.id ? "" : "hover:bg-gray-100",
                )}
                style={{ color: "var(--color-text-primary)" }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-full neo-border-sm"
                    style={{ background: "var(--color-bg-cream-mid)" }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Tab Navigation (< 600px) - Icon Only, Like ThemeToggle */}
          <div className="tab-nav-mobile items-center justify-center gap-2 flex-row">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative w-11 h-11 rounded-full neo-border flex items-center justify-center transition-all",
                  activeTab === tab.id ? "" : "hover:scale-105",
                )}
                style={{
                  background:
                    activeTab === tab.id
                      ? "var(--color-bg-cream-mid)"
                      : "var(--color-bg-white)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={tab.label}
              >
                <span
                  className="relative z-10"
                  style={{
                    color:
                      activeTab === tab.id
                        ? "var(--color-brand-coral)"
                        : "var(--color-brand-lavender)",
                  }}
                >
                  {tab.icon}
                </span>
              </motion.button>
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)", x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-2">
                {heroContent[activeTab].tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-rubik shadow-sm"
                    style={{
                      background: "var(--color-bg-white)",
                      border: "1px solid var(--color-gray-200)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-6">
                {heroContent[activeTab].stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="font-outfit font-bold text-xl"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs font-rubik"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
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
      style={{ background: "var(--color-bg-white)" }}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-lavender), var(--color-brand-lavender-dark))",
              }}
            >
              <FiArrowDown className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-outfit font-bold text-sm uppercase tracking-wide"
              style={{ color: "var(--color-text-primary)" }}
            >
              Swap Tokens
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-rubik font-medium text-xs tracking-wide uppercase"
            style={{
              background: "rgba(255,107,74,0.1)",
              border: "1px solid rgba(255,107,74,0.3)",
              color: "var(--color-brand-coral)",
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
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-lavender), var(--color-brand-lavender-dark))",
              }}
            >
              <FiLink className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-outfit font-bold text-sm uppercase tracking-wide"
              style={{ color: "var(--color-text-primary)" }}
            >
              Cross-Chain Bridge
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-rubik font-medium text-xs tracking-wide uppercase"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "var(--color-success)",
            }}
          >
            Active •
          </span>
        </div>

        {/* FROM Chain */}
        <div className="mb-4">
          <span
            className="text-xs font-rubik uppercase mb-2 block"
            style={{ color: "var(--color-text-muted)" }}
          >
            From
          </span>
          <button
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all"
            style={{ borderColor: "var(--color-gray-100)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-lavender), var(--color-brand-lavender-dark))",
                }}
              >
                E
              </div>
              <span
                className="font-outfit font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Ethereum
              </span>
            </div>
            <svg
              className="w-5 h-5"
              style={{ color: "var(--color-gray-400)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-2">
          <div
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: "var(--color-gray-100)",
              background: "var(--color-bg-white)",
            }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: "var(--color-gray-400)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* TO Chain */}
        <div className="mb-4">
          <span
            className="text-xs font-rubik uppercase mb-2 block"
            style={{ color: "var(--color-text-muted)" }}
          >
            To
          </span>
          <button
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all"
            style={{ borderColor: "var(--color-gray-100)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(to bottom right, var(--token-arb), var(--token-usdc))" }}
              >
                A
              </div>
              <span
                className="font-outfit font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Arbitrum
              </span>
            </div>
            <svg
              className="w-5 h-5"
              style={{ color: "var(--color-gray-400)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Asset */}
        <div className="mb-4">
          <span
            className="text-xs font-rubik uppercase mb-2 block"
            style={{ color: "var(--color-text-muted)" }}
          >
            Asset
          </span>
          <button
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all"
            style={{ borderColor: "var(--color-gray-100)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-lavender), var(--color-brand-lavender-dark))",
                }}
              >
                E
              </div>
              <span
                className="font-outfit font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Ethereum
              </span>
            </div>
            <svg
              className="w-5 h-5"
              style={{ color: "var(--color-gray-400)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <span
            className="text-xs font-rubik uppercase mb-2 block"
            style={{ color: "var(--color-text-muted)" }}
          >
            Amount
          </span>
          <input
            type="text"
            placeholder="0.00"
            className="w-full p-4 rounded-xl border-2 font-rubik text-2xl placeholder:text-gray-300 outline-none transition-all"
            style={{
              borderColor: "var(--color-gray-100)",
              color: "var(--color-text-primary)",
              background: "transparent",
            }}
          />
        </div>

        {/* Button */}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-outfit font-bold text-sm btn-coral-gradient">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          Bridge Assets
        </button>
      </div>
    </motion.div>
  );
}

// Stake Panel
function StakePanel() {
  const stakingPools = [
    {
      symbol: "E",
      name: "ETH Pool",
      type: "Flexible",
      tvl: "$180M",
      apr: "4.5%",
      color: "var(--color-brand-lavender)",
    },
    {
      symbol: "U",
      name: "USDC Pool",
      type: "30 Days",
      tvl: "$120M",
      apr: "8.2%",
      color: "var(--token-usdc)",
    },
    {
      symbol: "W",
      name: "WAVE Pool",
      type: "90 Days",
      tvl: "$80M",
      apr: "12.5%",
      color: "var(--color-brand-coral)",
    },
  ];

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
              <FiLock className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-outfit font-bold text-sm uppercase tracking-wide"
              style={{ color: "var(--color-text-primary)" }}
            >
              Staking Pools
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-rubik font-medium text-xs tracking-wide uppercase"
            style={{
              background: "rgba(255,107,74,0.1)",
              border: "1px solid rgba(255,107,74,0.3)",
              color: "var(--color-brand-coral)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-brand-coral)" }}
            />
            Rewards Active
          </span>
        </div>

        {/* Pool List */}
        <div className="space-y-3 mb-6">
          {stakingPools.map((pool, index) => (
            <motion.button
              key={pool.name}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all"
              style={{ borderColor: "var(--color-gray-100)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${pool.color}, ${pool.color}dd)`,
                  }}
                >
                  {pool.symbol}
                </div>
                <div className="text-left">
                  <p
                    className="font-outfit font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {pool.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {pool.type} • TVL: {pool.tvl}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="font-outfit font-bold"
                  style={{ color: "var(--color-success)" }}
                >
                  {pool.apr}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  APR
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Button */}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-outfit font-bold text-sm btn-coral-gradient">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          Select a Pool
        </button>
      </div>
    </motion.div>
  );
}

// History Panel
function HistoryPanel() {
  const transactions = [
    {
      type: "Swap",
      from: "ETH",
      to: "USDC",
      amount: "0.5 ETH",
      time: "2 mins ago",
      icon: "↕",
      color: "var(--color-brand-lavender)",
    },
    {
      type: "Send",
      from: "",
      to: "0x1234...5678",
      amount: "500 USDC",
      time: "1 hour ago",
      icon: "↗",
      color: "var(--color-brand-coral)",
    },
    {
      type: "Bridge",
      from: "Ethereum",
      to: "Arbitrum",
      amount: "1.2 ETH",
      time: "3 hours ago",
      icon: "∞",
      color: "var(--token-arb)",
    },
    {
      type: "Swap",
      from: "USDT",
      to: "ETH",
      amount: "1,000 USDT",
      time: "Yesterday",
      icon: "↕",
      color: "var(--color-brand-lavender)",
    },
  ];

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
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-lavender), var(--color-brand-lavender-dark))",
              }}
            >
              <FiClock className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-outfit font-bold text-sm uppercase tracking-wide"
              style={{ color: "var(--color-text-primary)" }}
            >
              Recent Activity
            </span>
          </div>
          <button
            className="font-rubik font-medium text-sm hover:underline"
            style={{ color: "var(--color-brand-lavender)" }}
          >
            View All
          </button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <motion.div
              key={index}
              className="w-full flex items-center justify-between p-4 rounded-xl transition-all"
              style={{ background: "var(--color-bg-cream-mid)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${tx.color}40, ${tx.color}20)`,
                    color: tx.color,
                  }}
                >
                  {tx.icon}
                </div>
                <div className="text-left">
                  <p
                    className="font-outfit font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {tx.type}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {tx.type === "Send"
                      ? `To ${tx.to}`
                      : `${tx.from} → ${tx.to}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="font-outfit font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {tx.amount}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-success)" }}
                >
                  ✓ {tx.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <button
          className="w-full mt-4 py-3 font-rubik font-medium text-sm transition-colors"
          style={{ color: "var(--color-text-muted)" }}
        >
          Load More Transactions
        </button>
      </div>
    </motion.div>
  );
}
