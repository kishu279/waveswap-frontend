"use client";

import { FiSearch } from "react-icons/fi";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between gap-4 mb-6">
            {/* Logo */}
            <div className="flex-shrink-0">
                <span className="font-outfit text-xl font-semibold tracking-wide">
                    WAVETEK
                </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="search the orb"
                        className="w-full bg-transparent border border-zinc-700 rounded-4xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                </div>
            </div>

            {/* Connect Wallet Button */}
            <button className="flex-shrink-0 border border-zinc-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-900 transition-colors">
                connect wallet
            </button>
        </nav>
    );
}
