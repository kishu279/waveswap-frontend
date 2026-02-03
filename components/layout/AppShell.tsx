"use client";

import { ReactNode } from "react";

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen w-full text-white relative">
            {/* Background Image */}
            <div
                className="fixed inset-0 -z-10 bg-black bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/wave_swap_bg.png)',
                }}
            />
            <div className="w-full 2xl:max-w-[1800px] mx-auto px-24 py-8 min-h-screen relative z-10">
                {children}
            </div>
        </div>
    );
}
