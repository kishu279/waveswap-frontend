"use client";

import { useEffect, useRef } from "react";

interface Wave {
    amplitude: number;
    frequency: number;
    speed: number;
    color: string;
    yOffset: number;
}

export function WaveCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const waves: Wave[] = [
            { amplitude: 40, frequency: 0.008, speed: 0.02, color: "rgba(255, 107, 74, 0.4)", yOffset: 0.3 },
            { amplitude: 30, frequency: 0.012, speed: 0.025, color: "rgba(139, 116, 208, 0.3)", yOffset: 0.4 },
            { amplitude: 25, frequency: 0.015, speed: 0.018, color: "rgba(255, 138, 106, 0.25)", yOffset: 0.5 },
            { amplitude: 35, frequency: 0.01, speed: 0.022, color: "rgba(107, 90, 160, 0.2)", yOffset: 0.6 },
        ];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.5;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const drawGrid = () => {
            const gridSize = 40;
            ctx.strokeStyle = "rgba(255, 107, 74, 0.08)";
            ctx.lineWidth = 1;

            // Vertical lines with wave distortion
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                for (let y = 0; y < canvas.height; y += 2) {
                    const distort = Math.sin(y * 0.01 + timeRef.current * 2) * 5;
                    const px = x + distort;
                    if (y === 0) {
                        ctx.moveTo(px, y);
                    } else {
                        ctx.lineTo(px, y);
                    }
                }
                ctx.stroke();
            }

            // Horizontal lines with wave distortion
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 2) {
                    const distort = Math.sin(x * 0.01 + timeRef.current * 2) * 5;
                    const py = y + distort;
                    if (x === 0) {
                        ctx.moveTo(x, py);
                    } else {
                        ctx.lineTo(x, py);
                    }
                }
                ctx.stroke();
            }
        };

        const drawWave = (wave: Wave, phase: number) => {
            const { amplitude, frequency, color, yOffset } = wave;
            const baseY = canvas.height * yOffset;
            const mouse = mouseRef.current;

            ctx.beginPath();
            ctx.moveTo(0, canvas.height);

            for (let x = 0; x <= canvas.width; x += 2) {
                // Base wave
                let y = Math.sin(x * frequency + phase) * amplitude;
                // Secondary wave for complexity
                y += Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude * 0.3);

                // Mouse interaction
                const distX = Math.abs(x - mouse.x);
                const distY = Math.abs(baseY - mouse.y);
                const dist = Math.sqrt(distX * distX + distY * distY);
                const influence = Math.max(0, 1 - dist / 200);
                y += Math.sin(dist * 0.05 + phase * 2) * influence * 20;

                ctx.lineTo(x, baseY + y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();

            // Gradient fill
            const gradient = ctx.createLinearGradient(0, baseY - amplitude, 0, canvas.height);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fill();

            // Stroke the top edge
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, "0.6)");
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawGrid();

            waves.forEach((wave) => {
                const phase = timeRef.current * wave.speed * 50;
                drawWave(wave, phase);
            });

            timeRef.current += 0.016;
            animationId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        document.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            document.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed bottom-0 left-0 w-full h-[50vh] pointer-events-none z-0"
            style={{
                maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 100%)",
            }}
        />
    );
}
