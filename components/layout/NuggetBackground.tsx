"use client";

import { useEffect, useRef } from "react";

export function NuggetBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base black background */}
            <div className="absolute inset-0 bg-black" />

            {/* Dot grid pattern */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Grid lines (subtle) */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Blue/indigo edge glow - top */}
            <div
                className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 0%, transparent 100%)',
                }}
            />

            {/* Blue/indigo edge glow - bottom */}
            <div
                className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(99, 102, 241, 0.15) 0%, transparent 100%)',
                }}
            />

            {/* Blue/indigo edge glow - left */}
            <div
                className="absolute top-0 left-0 bottom-0 w-64 pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, rgba(59, 130, 246, 0.12) 0%, transparent 100%)',
                }}
            />

            {/* Blue/indigo edge glow - right */}
            <div
                className="absolute top-0 right-0 bottom-0 w-64 pointer-events-none"
                style={{
                    background: 'linear-gradient(to left, rgba(99, 102, 241, 0.12) 0%, transparent 100%)',
                }}
            />

            {/* Corner gradient accents */}
            <div
                className="absolute -top-32 -left-32 w-96 h-96 pointer-events-none rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                }}
            />
            <div
                className="absolute -bottom-32 -right-32 w-96 h-96 pointer-events-none rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                }}
            />

            {/* Animated floating orbs (subtle) */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" />
            <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-indigo-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
    );
}

// 3D Wireframe Torus - Optional (heavier, uses canvas)
export function WireframeTorus() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let angle = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        const drawTorus = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const R = Math.min(canvas.width, canvas.height) * 0.25; // Major radius
            const r = R * 0.35; // Minor radius

            ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
            ctx.lineWidth = 1;

            // Draw torus wireframe rings
            for (let i = 0; i < 24; i++) {
                const theta = (i / 24) * Math.PI * 2;
                ctx.beginPath();

                for (let j = 0; j <= 32; j++) {
                    const phi = (j / 32) * Math.PI * 2;

                    // 3D to 2D projection with rotation
                    const x3d = (R + r * Math.cos(phi)) * Math.cos(theta);
                    const y3d = (R + r * Math.cos(phi)) * Math.sin(theta);
                    const z3d = r * Math.sin(phi);

                    // Rotate around Y axis
                    const rotatedX = x3d * Math.cos(angle) - z3d * Math.sin(angle);
                    const rotatedZ = x3d * Math.sin(angle) + z3d * Math.cos(angle);

                    // Rotate around X axis (tilt)
                    const tiltAngle = 0.4;
                    const finalY = y3d * Math.cos(tiltAngle) - rotatedZ * Math.sin(tiltAngle);
                    const finalZ = y3d * Math.sin(tiltAngle) + rotatedZ * Math.cos(tiltAngle);

                    // Project to 2D
                    const scale = 600 / (600 + finalZ);
                    const x2d = centerX + rotatedX * scale;
                    const y2d = centerY + finalY * scale;

                    if (j === 0) {
                        ctx.moveTo(x2d, y2d);
                    } else {
                        ctx.lineTo(x2d, y2d);
                    }
                }

                ctx.stroke();
            }

            angle += 0.003;
            animationId = requestAnimationFrame(drawTorus);
        };

        drawTorus();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-5 pointer-events-none opacity-60"
        />
    );
}
