import { useEffect, useState } from 'react';
import type { TerminalEntry } from '../hooks/useTerminal';
import { SITE_CONFIG } from '../data/config';

interface CommandOutputProps {
    history: TerminalEntry[];
}

const TypingEffect = ({ content }: { content: React.ReactNode }) => {
    // If content is not a string (e.g. React component), render immediately
    if (typeof content !== 'string') {
        return <div className="animate-in fade-in duration-300">{content}</div>;
    }

    const [displayedContent, setDisplayedContent] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < content.length) {
                setDisplayedContent((prev) => prev + content.charAt(index));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(timer);
            }
        }, 10); // Adjust speed here

        return () => clearInterval(timer);
    }, [content]);

    return (
        <span>
            {displayedContent}
            {!isComplete && <span className="animate-pulse">_</span>}
        </span>
    );
};

export function CommandOutput({ history }: CommandOutputProps) {
    return (
        <div className="space-y-2 mb-4">
            {history.map((entry, index) => (
                <div key={index} className="break-words">
                    {entry.type === 'command' ? (
                        <div className="flex items-center gap-2">
                            <span className="text-green-500 font-bold whitespace-nowrap">{SITE_CONFIG.prompt}</span>
                            <span>{entry.content}</span>
                        </div>
                    ) : (
                        <div className="text-foreground/90 ml-4 md:ml-8">
                            {/* Only animate the last entry if it's a string output */}
                            {index === history.length - 1 && typeof entry.content === 'string' ? (
                                <TypingEffect content={entry.content} />
                            ) : (
                                entry.content
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
