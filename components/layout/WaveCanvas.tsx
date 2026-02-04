"use client";

import { useEffect, useRef } from "react";

export function WaveCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        // Fewer columns/rows for "zoomed in" bigger look
        const cols = 70;
        const rows = 40;

        const resize = () => {
            canvas.width = window.innerWidth;
            // Take up more vertical space (60% of screen height)
            canvas.height = window.innerHeight * 0.6;
        };

        const getHeight = (x: number, z: number, time: number): number => {
            const bounce = Math.sin(time * 1.5) * 0.2 + 1;

            // Larger scale waves (smaller frequency multipliers)
            const wave1 = Math.sin(x * 0.004 + time * 0.8) * Math.cos(z * 0.006 + time * 0.4) * 150 * bounce;
            const wave2 = Math.sin(x * 0.008 - time * 0.6) * Math.cos(z * 0.005 + time * 0.3) * 80;
            const wave3 = Math.cos(x * 0.006 + time * 0.9) * Math.sin(z * 0.008 - time * 0.5) * 60;

            // Broader peaks
            const peak1 = Math.exp(-Math.pow((x - 200) / 400, 2) - Math.pow((z - 300) / 300, 2)) * 200;
            const peak2 = Math.exp(-Math.pow((x - 1200) / 500, 2) - Math.pow((z - 400) / 350, 2)) * 250;

            return wave1 + wave2 + wave3 + peak1 + peak2;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = timeRef.current;

            // Make the grid wider than the screen to hide edges
            const gridWidth = canvas.width * 1.5;
            const cellW = gridWidth / cols;
            const cellH = (canvas.height * 1.5) / rows;
            const xOffset = (canvas.width - gridWidth) / 2;

            const grid: { sx: number; sy: number; h: number }[][] = [];

            for (let r = 0; r < rows; r++) {
                grid[r] = [];
                for (let c = 0; c < cols; c++) {
                    // World coordinates
                    const wx = c * cellW + xOffset;
                    const wz = r * cellH;

                    const h = getHeight(wx, wz, time);

                    // Perspective projection
                    // As r increases (closer to bottom of screen), things appear closer/larger
                    const progress = r / rows;
                    const perspective = 0.5 + Math.pow(progress, 1.5) * 1.5; // Stronger perspective curve

                    // Expand outwards as we get closer to bottom
                    const centerOffset = wx - canvas.width / 2;
                    const sx = canvas.width / 2 + centerOffset * perspective;

                    // Map Z to Y, subtract height with perspective scaling
                    // Shifted down to bottom
                    const sy = canvas.height * 0.35 + r * (canvas.height / rows) * 0.8 - h * perspective * 0.6;

                    grid[r][c] = { sx, sy, h };
                }
            }

            // Draw back to front
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Fetch current theme colors dynamically
            const styles = getComputedStyle(document.documentElement);
            const primary = styles.getPropertyValue('--primary').trim();
            const accent = styles.getPropertyValue('--accent').trim();
            const muted = styles.getPropertyValue('--muted-foreground').trim();

            for (let r = 0; r < rows - 1; r++) {
                // Fade out at the back (top of canvas)
                const depthAlpha = Math.pow(r / rows, 0.5); // Non-linear alpha for smoother fade
                const lineWidth = 0.5 + (r / rows) * 1.0; // Thinner lines

                for (let c = 0; c < cols - 1; c++) {
                    const p1 = grid[r][c];
                    const p2 = grid[r][c + 1];
                    const p3 = grid[r + 1][c];
                    // const p4 = grid[r + 1][c + 1]; // Diagonal point

                    const avgH = (p1.h + p2.h + p3.h) / 3;

                    // Calculate intensity based on height
                    const t = avgH > 100 ? Math.min(1, (avgH - 100) / 100) : avgH < -50 ? Math.min(1, (-avgH - 50) / 80) : 0;

                    if (avgH > 100) {
                        // Peaks - Use Primary Theme Color (Blue)
                        ctx.strokeStyle = `color-mix(in srgb, ${primary} ${Math.round(t * 100)}%, ${muted})`;
                        ctx.globalAlpha = depthAlpha * (0.3 + t * 0.5);
                    } else if (avgH < -50) {
                        // Valleys - Use Accent Theme Color
                        ctx.strokeStyle = `color-mix(in srgb, ${accent} ${Math.round(t * 100)}%, ${muted})`;
                        ctx.globalAlpha = depthAlpha * 0.3;
                    } else {
                        // Base Mesh - Use Muted Theme Color
                        ctx.strokeStyle = muted;
                        ctx.globalAlpha = depthAlpha * 0.15;
                    }

                    ctx.lineWidth = lineWidth;

                    // Draw Mesh
                    ctx.beginPath();
                    // Horizontal
                    ctx.moveTo(p1.sx, p1.sy);
                    ctx.lineTo(p2.sx, p2.sy);
                    // Vertical
                    ctx.lineTo(grid[r + 1][c + 1].sx, grid[r + 1][c + 1].sy);
                    // Diagonal (optional, keeping it simple wireframe for cleaner look or adding back triangle)
                    // Let's do the triangle style requested
                    ctx.lineTo(p1.sx, p1.sy);
                    // Also connect vertical left
                    ctx.moveTo(p1.sx, p1.sy);
                    ctx.lineTo(p3.sx, p3.sy);
                    ctx.stroke();
                }
            }

            timeRef.current += 0.01;
            animationId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed bottom-0 left-0 w-full pointer-events-none z-[1]"
            style={{
                height: "60vh",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
            }}
        />
    );
}
