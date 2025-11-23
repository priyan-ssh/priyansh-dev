import { forwardRef, useEffect, useRef, type InputHTMLAttributes } from 'react';

interface TerminalInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSubmitCommand: (command: string) => void;
    onAutocomplete?: () => void;
    prompt?: string;
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
    ({ onSubmitCommand, onAutocomplete, prompt = 'visitor@priyansh.dev:~$', ...props }, _ref) => {
        const inputRef = useRef<HTMLInputElement>(null);

        // Auto-focus logic
        useEffect(() => {
            const handleClick = () => inputRef.current?.focus();
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }, []);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                onSubmitCommand(e.currentTarget.value);
                e.currentTarget.value = '';
            } else if (e.key === 'Tab') {
                e.preventDefault();
                onAutocomplete?.();
            }
        };

        return (
            <div className="flex items-center gap-2 w-full">
                <span className="text-primary font-bold whitespace-nowrap">{prompt}</span>
                <input
                    ref={inputRef}
                    type="text"
                    className="bg-transparent border-none outline-none text-foreground w-full font-mono caret-primary"
                    autoFocus
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    spellCheck="false"
                    {...props}
                />
            </div>
        );
    }
);

TerminalInput.displayName = 'TerminalInput';
