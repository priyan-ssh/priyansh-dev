import type { ReactNode } from 'react';

interface AsciiFrameProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

export function AsciiFrame({ children, title, className = '' }: AsciiFrameProps) {
    return (
        <div className={`font-mono ${className}`}>
            <div className="text-primary">
                +{title ? `-[ ${title} ]-` : ''}{'-'.repeat(title ? 60 - title.length - 6 : 60)}+
            </div>
            <div className="border-l border-r border-primary px-4 py-2 max-w-[62ch]">
                {children}
            </div>
            <div className="text-primary">
                +{'-'.repeat(60)}+
            </div>
        </div>
    );
}
