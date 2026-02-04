// Token Selection
function selectToken(element) {
    // Remove selected class from all tokens
    document.querySelectorAll('.token-item').forEach(item => {
        item.classList.remove('selected');
    });

    // Add selected class to clicked token
    element.classList.add('selected');

    // Enable continue button
    document.getElementById('continueBtn').disabled = false;
}

// Tab Navigation
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Wave Canvas Animation
class WaveCanvas {
    constructor() {
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.time = 0;

        this.resize();
        this.initWaves();
        this.setupMouseTracking();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight * 0.5;
    }

    initWaves() {
        // Create multiple wave layers
        this.waves = [
            {
                amplitude: 40,
                frequency: 0.008,
                speed: 0.02,
                color: 'rgba(255, 107, 74, 0.4)',
                yOffset: 0.3
            },
            {
                amplitude: 30,
                frequency: 0.012,
                speed: 0.025,
                color: 'rgba(139, 116, 208, 0.3)',
                yOffset: 0.4
            },
            {
                amplitude: 25,
                frequency: 0.015,
                speed: 0.018,
                color: 'rgba(255, 138, 106, 0.25)',
                yOffset: 0.5
            },
            {
                amplitude: 35,
                frequency: 0.01,
                speed: 0.022,
                color: 'rgba(107, 90, 160, 0.2)',
                yOffset: 0.6
            }
        ];
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    drawWave(wave, phase) {
        const { amplitude, frequency, color, yOffset } = wave;
        const baseY = this.canvas.height * yOffset;

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);

        for (let x = 0; x <= this.canvas.width; x += 2) {
            // Base wave
            let y = Math.sin(x * frequency + phase) * amplitude;

            // Add secondary wave for complexity
            y += Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude * 0.3);

            // Mouse interaction
            const distX = Math.abs(x - this.mouseX);
            const distY = Math.abs(baseY - this.mouseY);
            const dist = Math.sqrt(distX * distX + distY * distY);
            const influence = Math.max(0, 1 - dist / 200);
            y += Math.sin(dist * 0.05 + phase * 2) * influence * 20;

            this.ctx.lineTo(x, baseY + y);
        }

        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();

        // Gradient fill
        const gradient = this.ctx.createLinearGradient(0, baseY - amplitude, 0, this.canvas.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Stroke the top edge
        this.ctx.strokeStyle = color.replace(/[\d.]+\)$/, '0.6)');
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    drawGrid() {
        const gridSize = 40;
        this.ctx.strokeStyle = 'rgba(255, 107, 74, 0.08)';
        this.ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            // Apply wave distortion to grid lines
            this.ctx.beginPath();
            for (let y = 0; y < this.canvas.height; y += 2) {
                const distort = Math.sin(y * 0.01 + this.time * 2) * 5;
                const px = x + distort;
                if (y === 0) {
                    this.ctx.moveTo(px, y);
                } else {
                    this.ctx.lineTo(px, y);
                }
            }
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            for (let x = 0; x < this.canvas.width; x += 2) {
                const distort = Math.sin(x * 0.01 + this.time * 2) * 5;
                const py = y + distort;
                if (x === 0) {
                    this.ctx.moveTo(x, py);
                } else {
                    this.ctx.lineTo(x, py);
                }
            }
            this.ctx.stroke();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid first
        this.drawGrid();

        // Draw waves from back to front
        this.waves.forEach((wave, index) => {
            const phase = this.time * wave.speed * 50;
            this.drawWave(wave, phase);
        });

        this.time += 0.016; // ~60fps
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize wave canvas when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WaveCanvas();

    // Animate elements on load
    animateOnLoad();
});

function animateOnLoad() {
    // Add staggered animation to token items
    document.querySelectorAll('.token-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'all 0.3s ease-out';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 600 + index * 100);
    });
}

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
