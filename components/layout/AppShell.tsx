"use client";

import { ReactNode } from "react";
import { WaveCanvas } from "./WaveCanvas";

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen w-full relative">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7] via-[#F5F3EF] to-[#EDE9E3]" />

                {/* Noise overlay */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Decorative glow orbs */}
                <div
                    className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.08]"
                    style={{ background: "radial-gradient(circle, #FF6B4A 0%, transparent 70%)" }}
                />
                <div
                    className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full opacity-[0.06]"
                    style={{ background: "radial-gradient(circle, #8B74D0 0%, transparent 70%)" }}
                />
                <div
                    className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
                    style={{ background: "radial-gradient(circle, #C4B5A0 0%, transparent 70%)" }}
                />

                {/* Decorative elements */}
                <div className="absolute top-20 right-1/4 w-32 h-32 rounded-full border border-black/5" />
                <div className="absolute bottom-32 right-20 w-4 h-4 rounded-full bg-coral/10" />
                <div className="absolute top-1/2 left-16 w-3 h-3 rounded-full bg-lavender-dark/10" />
            </div>

            {/* Wave Canvas */}
            <div className="fixed bottom-0 left-0 w-full translate-y-[calc(40%+50px)] z-[1]">
                <WaveCanvas />
            </div>

            {/* Main Content */}
            <div className="w-full 2xl:max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 py-8 min-h-screen relative z-10">
                {children}
            </div>
        </div>
    );
}
