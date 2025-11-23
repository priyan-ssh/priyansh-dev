import type { TerminalEntry } from '../hooks/useTerminal';

interface CommandOutputProps {
    history: TerminalEntry[];
}

export function CommandOutput({ history }: CommandOutputProps) {
    return (
        <div className="space-y-2 mb-4">
            {history.map((entry, index) => (
                <div key={index} className="break-words">
                    {entry.type === 'command' ? (
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold whitespace-nowrap">visitor@priyansh.dev:~$</span>
                            <span>{entry.content}</span>
                        </div>
                    ) : (
                        <div className="text-foreground/90 ml-4 md:ml-8">
                            {entry.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
