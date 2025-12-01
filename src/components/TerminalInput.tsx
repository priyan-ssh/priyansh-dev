import { useEffect, useRef, useState, type InputHTMLAttributes } from 'react';
import { CONTENT } from '../data/config';

interface TerminalInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSubmitCommand: (command: string) => void;
    onAutocomplete?: (value: string) => void;
    prompt?: string;
}

export const TerminalInput = ({ onSubmitCommand, onAutocomplete, prompt = 'visitor@priyanssh.dev:~$', ...props }: TerminalInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [suggestion, setSuggestion] = useState('');
    const [cursorPos, setCursorPos] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    // Auto-focus logic
    useEffect(() => {
        const handleClick = () => {
            inputRef.current?.focus();
            setIsFocused(true);
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Calculate suggestion based on input
    useEffect(() => {
        const val = props.value?.toString() || '';
        if (!val) {
            setSuggestion('');
            return;
        }

        const commands = ['help', 'about', 'projects', 'contact', 'clear', 'home'];

        // Check for cd commands
        if (val.startsWith('cd ')) {
            const partial = val.slice(3);
            if (partial) {
                // Check for "projects/" prefix
                if (partial.startsWith('projects/')) {
                    const projectPart = partial.replace('projects/', '');
                    const project = CONTENT.projects.find(p =>
                        p.id.startsWith(projectPart) ||
                        p.title.toLowerCase().replace(/\s+/g, '-').startsWith(projectPart)
                    );
                    if (project) {
                        const match = project.id.startsWith(projectPart) ? project.id : project.title.toLowerCase().replace(/\s+/g, '-');
                        setSuggestion(`cd projects/${match}`);
                        return;
                    }
                }

                // Check for direct project match
                const project = CONTENT.projects.find(p =>
                    p.id.startsWith(partial) ||
                    p.title.toLowerCase().replace(/\s+/g, '-').startsWith(partial)
                );
                if (project) {
                    const match = project.id.startsWith(partial) ? project.id : project.title.toLowerCase().replace(/\s+/g, '-');
                    setSuggestion(`cd ${match}`);
                    return;
                }

                // Suggest "projects/" if typing "pro"
                if ('projects/'.startsWith(partial)) {
                    setSuggestion('cd projects/');
                    return;
                }
            }
        }

        const match = commands.find(c => c.startsWith(val.toLowerCase()));
        if (match && match !== val.toLowerCase()) {
            setSuggestion(match);
        } else {
            setSuggestion('');
        }
    }, [props.value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmitCommand(e.currentTarget.value);
            e.currentTarget.value = '';
            setSuggestion('');
            setCursorPos(0);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (suggestion) {
                onAutocomplete?.(suggestion);
                setSuggestion('');
                // Move cursor to end
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.selectionStart = inputRef.current.selectionEnd = suggestion.length;
                        setCursorPos(suggestion.length);
                    }
                }, 0);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // Update cursor position after history navigation
            setTimeout(() => {
                if (inputRef.current) {
                    setCursorPos(inputRef.current.selectionStart || 0);
                }
            }, 0);
        }
    };

    const updateCursor = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setCursorPos(e.currentTarget.selectionStart || 0);
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <span className="text-primary font-bold whitespace-nowrap">{prompt}</span>
            <div className="relative w-full group">
                <input
                    ref={inputRef}
                    type="text"
                    className="bg-transparent border-none outline-none text-foreground w-full font-mono caret-transparent relative z-10 placeholder:text-gray-700/50"
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onSelect={updateCursor}
                    onClick={updateCursor}
                    onKeyUp={updateCursor}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Type command here..."
                    {...props}
                />

                {/* Ghost Text Overlay */}
                {suggestion && isFocused && (
                    <div className="absolute inset-0 pointer-events-none flex items-center whitespace-pre font-mono z-0">
                        <span className="invisible">{props.value || ''}</span>
                        <span className="text-gray-500 opacity-50">{suggestion.slice((props.value as string)?.length || 0)}</span>
                    </div>
                )}

                {/* Block Cursor Overlay */}
                {isFocused && (
                    <div className="absolute inset-0 pointer-events-none flex items-center whitespace-pre font-mono z-20">
                        <span className="invisible">{props.value?.toString().slice(0, cursorPos)}</span>
                        <span className="bg-primary text-primary-foreground cursor-blink h-[1.2em] w-[0.6em] -mt-1 inline-block align-middle"></span>
                    </div>
                )}
            </div>
        </div>
    );
};
