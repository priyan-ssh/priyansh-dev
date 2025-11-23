import React, { useState, useCallback } from 'react';

export type CommandType = 'help' | 'about' | 'projects' | 'contact' | 'clear' | 'unknown';

export interface TerminalEntry {
  type: 'command' | 'output';
  content: React.ReactNode;
  timestamp: number;
}

interface InteractiveSession {
  isActive: boolean;
  stepId: string;
  data: Record<string, string>;
  onInput: (input: string, session: InteractiveSession) => InteractiveSession | null; // Return null to end session
}

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [interactiveSession, setInteractiveSession] = useState<InteractiveSession | null>(null);

  const addToHistory = useCallback((entry: TerminalEntry) => {
    setHistory((prev) => [...prev, entry]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const availableCommands = ['help', 'about', 'projects', 'contact', 'clear'];

  const handleAutocomplete = useCallback(() => {
    if (!input.trim()) return;
    const matchingCommands = availableCommands.filter(cmd => cmd.startsWith(input.trim().toLowerCase()));
    if (matchingCommands.length === 1) {
      setInput(matchingCommands[0]);
    }
  }, [input]);

  // Expose a way to start an interactive session
  const startInteractiveSession = useCallback((initialSession: InteractiveSession) => {
    setInteractiveSession(initialSession);
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    // If in interactive mode, pass input to the session handler
    if (interactiveSession && interactiveSession.isActive) {
      // Add user input to history
      addToHistory({
        type: 'command',
        content: cmd, // In interactive mode, we might want to mask this if it was a password, but for now it's fine
        timestamp: Date.now(),
      });

      const nextSession = interactiveSession.onInput(cmd, interactiveSession);
      if (nextSession) {
        setInteractiveSession(nextSession);
      } else {
        setInteractiveSession(null);
      }
      setInput('');
      return;
    }

    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setInput('');

    addToHistory({
      type: 'command',
      content: trimmedCmd,
      timestamp: Date.now(),
    });

    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const [command] = trimmedCmd.split(' ');

    switch (command.toLowerCase()) {
      case 'help':
        addToHistory({
          type: 'output',
          content: (
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-primary font-bold">about</span>
              <span>Who am I?</span>
              <span className="text-primary font-bold">projects</span>
              <span>View my work</span>
              <span className="text-primary font-bold">contact</span>
              <span>Get in touch</span>
              <span className="text-primary font-bold">clear</span>
              <span>Clear terminal</span>
              <span className="text-primary font-bold">help</span>
              <span>Show this help</span>
            </div>
          ),
          timestamp: Date.now(),
        });
        break;
      case 'clear':
        clearHistory();
        break;
      default:
        // Other commands are handled by the consumer via the returned executeCommand
        // But wait, the consumer calls THIS executeCommand.
        // We need a way to let the App.tsx handle the specific page commands if we don't handle them here.
        // OR we handle them here if we move the logic back.
        // For now, we'll just let the default case fall through and the App.tsx logic will handle it?
        // No, App.tsx calls this function.
        // So we should return the command type or something?
        // Actually, the previous implementation relied on App.tsx overriding the handler or checking the command.
        // But App.tsx calls `executeCommand` from the hook.
        // If we want App.tsx to handle 'about', 'projects', etc., we need to expose a way to register handlers or just return the parsed command.

        // Let's stick to the pattern: This hook handles generic terminal logic.
        // Specific commands like 'about' need to be intercepted by the caller BEFORE calling this executeCommand,
        // OR this executeCommand needs to accept a callback for unknown commands.

        // Refactor: The App.tsx handles the command parsing and calls logic.
        // BUT, we want the hook to manage the history and state.
        // So, let's make `executeCommand` accept an optional `onUnknown` callback?
        // Or better, let's just export a `processCommand` that does the history stuff, and let the user decide what to do.
        break;
    }
  }, [addToHistory, clearHistory, interactiveSession]);

  return {
    history,
    input,
    setInput,
    executeCommand,
    addToHistory,
    clearHistory,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    handleAutocomplete,
    startInteractiveSession,
    interactiveSession
  };
};
