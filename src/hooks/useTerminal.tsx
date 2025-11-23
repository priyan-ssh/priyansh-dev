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

const availableCommands = ['help', 'about', 'projects', 'contact', 'clear'];

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
