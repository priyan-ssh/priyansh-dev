import { useEffect, useState, useRef, type ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [booted, setBooted] = useState(false);

    const [bootStep, setBootStep] = useState(0);

    useEffect(() => {
        const steps = [
            { t: 0, s: 0 },
            { t: 800, s: 1 },
            { t: 1600, s: 2 },
            { t: 2400, s: 3 },
            { t: 3000, s: 4 } // Boot complete
        ];

        steps.forEach(({ t, s }) => {
            setTimeout(() => {
                if (s === 4) setBooted(true);
                else setBootStep(s);
            }, t);
        });
    }, []);

    if (!booted) {
        return (
            <div className="fixed inset-0 bg-black z-50">
                <MatrixRain />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-primary font-mono text-xl md:text-2xl bg-black/80 p-8 rounded-lg border border-primary/20 backdrop-blur-sm leading-loose w-[90%] md:w-[600px]">
                        <div className="flex justify-between">
                            <span>INITIALIZING SYSTEM...</span>
                            {bootStep >= 1 && <span className="text-green-500">[OK]</span>}
                        </div>
                        {bootStep >= 1 && (
                            <div className="flex justify-between animate-in fade-in slide-in-from-left-2 duration-300">
                                <span>LOADING KERNEL...</span>
                                {bootStep >= 2 && <span className="text-green-500">[OK]</span>}
                            </div>
                        )}
                        {bootStep >= 2 && (
                            <div className="flex justify-between animate-in fade-in slide-in-from-left-2 duration-300">
                                <span>MOUNTING FILESYSTEM...</span>
                                {bootStep >= 3 && <span className="text-green-500">[OK]</span>}
                            </div>
                        )}
                        {bootStep >= 3 && (
                            <div className="animate-pulse mt-2 text-center text-primary/80">
                                ESTABLISHING UPLINK...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-mono overflow-hidden relative crt">
            <div className="scanline" />
            <div className="relative z-10 p-4 md:p-8 h-screen overflow-y-auto flex flex-col">
                {children}
            </div>
        </div>
    );
}

function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = [];
        const chars = '0123456789ABCDEF';

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start at random heights above
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));

                // Randomly brighter characters
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#fff';
                } else {
                    ctx.fillStyle = '#0f0';
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="block w-full h-full opacity-60" />;
}
