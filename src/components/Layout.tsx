import { useEffect, useState, type ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setBooted(true), 2000); // Simulate boot sequence
        return () => clearTimeout(timer);
    }, []);

    if (!booted) {
        return (
            <div className="fixed inset-0 bg-black text-primary font-mono flex items-center justify-center text-2xl">
                <div className="animate-pulse">
                    INITIALIZING SYSTEM...
                    <br />
                    LOADING KERNEL...
                    <br />
                    ESTABLISHING UPLINK...
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
