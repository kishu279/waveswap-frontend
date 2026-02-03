"use client";

import { useEffect, useRef } from "react";

export function GridBeamBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            {/* Grid pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Beam animations */}
            <Beam delay={0} duration={8} startX={10} />
            <Beam delay={2} duration={6} startX={30} />
            <Beam delay={4} duration={10} startX={50} />
            <Beam delay={1} duration={7} startX={70} />
            <Beam delay={3} duration={9} startX={90} />

            {/* Horizontal beams */}
            <HorizontalBeam delay={0.5} duration={8} startY={20} />
            <HorizontalBeam delay={2.5} duration={7} startY={50} />
            <HorizontalBeam delay={4.5} duration={9} startY={80} />

            {/* Subtle gradient overlay for depth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                }}
            />

            {/* Edge glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 150px 50px rgba(59, 130, 246, 0.05)',
                }}
            />
        </div>
    );
}

// Vertical beam component
function Beam({ delay, duration, startX }: { delay: number; duration: number; startX: number }) {
    return (
        <div
            className="absolute w-px h-[200px] pointer-events-none"
            style={{
                left: `${startX}%`,
                top: '-200px',
                background: 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8), transparent)',
                animation: `beam-vertical ${duration}s ease-in-out ${delay}s infinite`,
                filter: 'blur(1px)',
                boxShadow: '0 0 20px 2px rgba(99, 102, 241, 0.4)',
            }}
        />
    );
}

// Horizontal beam component
function HorizontalBeam({ delay, duration, startY }: { delay: number; duration: number; startY: number }) {
    return (
        <div
            className="absolute h-px w-[200px] pointer-events-none"
            style={{
                top: `${startY}%`,
                left: '-200px',
                background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8), transparent)',
                animation: `beam-horizontal ${duration}s ease-in-out ${delay}s infinite`,
                filter: 'blur(1px)',
                boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.3)',
            }}
        />
    );
}

// Canvas-based grid with beams (alternative, more performant for many beams)
export function GridBeamCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        interface BeamData {
            x: number;
            y: number;
            length: number;
            speed: number;
            direction: 'vertical' | 'horizontal';
            color: string;
        }

        const beams: BeamData[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        // Initialize beams
        const colors = [
            'rgba(99, 102, 241, 0.6)',   // Indigo
            'rgba(139, 92, 246, 0.6)',   // Purple
            'rgba(59, 130, 246, 0.6)',   // Blue
        ];

        for (let i = 0; i < 6; i++) {
            beams.push({
                x: Math.random() * canvas.width,
                y: -200,
                length: 150 + Math.random() * 100,
                speed: 1 + Math.random() * 2,
                direction: 'vertical',
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        for (let i = 0; i < 4; i++) {
            beams.push({
                x: -200,
                y: Math.random() * canvas.height,
                length: 150 + Math.random() * 100,
                speed: 1 + Math.random() * 2,
                direction: 'horizontal',
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        const drawGrid = () => {
            const gridSize = 60;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            drawGrid();

            // Draw and update beams
            beams.forEach(beam => {
                const gradient = beam.direction === 'vertical'
                    ? ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length)
                    : ctx.createLinearGradient(beam.x, beam.y, beam.x + beam.length, beam.y);

                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.5, beam.color);
                gradient.addColorStop(1, 'transparent');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.shadowBlur = 20;
                ctx.shadowColor = beam.color;

                ctx.beginPath();
                if (beam.direction === 'vertical') {
                    ctx.moveTo(beam.x, beam.y);
                    ctx.lineTo(beam.x, beam.y + beam.length);
                    beam.y += beam.speed;
                    if (beam.y > canvas.height) {
                        beam.y = -beam.length;
                        beam.x = Math.random() * canvas.width;
                    }
                } else {
                    ctx.moveTo(beam.x, beam.y);
                    ctx.lineTo(beam.x + beam.length, beam.y);
                    beam.x += beam.speed;
                    if (beam.x > canvas.width) {
                        beam.x = -beam.length;
                        beam.y = Math.random() * canvas.height;
                    }
                }
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-black"
        />
    );
}
