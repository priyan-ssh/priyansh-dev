
import os

content = """import React, { useState, useCallback } from 'react';

export type CommandType = 'help' | 'about' | 'projects' | 'contact' | 'clear' | 'unknown';

export interface TerminalEntry {
  type: 'command' | 'output';
  content: React.ReactNode;
  timestamp: number;
}

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = useCallback((entry: TerminalEntry) => {
    setHistory((prev) => [...prev, entry]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to display history
    addToHistory({
      type: 'command',
      content: trimmedCmd,
      timestamp: Date.now(),
    });

    // Add to command recall history
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
        // Other commands are handled by the consumer
        break;
    }
  }, [addToHistory, clearHistory]);

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
  };
};
"""

with open('src/hooks/useTerminal.ts', 'w') as f:
    f.write(content)

print("File written successfully.")
