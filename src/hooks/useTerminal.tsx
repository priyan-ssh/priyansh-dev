import React, { useState, useCallback } from 'react';
import { CONTENT } from '../data/config';

export type CommandType = 'help' | 'about' | 'projects' | 'contact' | 'clear' | 'cd' | 'home' | 'unknown';
export type ViewType = 'home' | 'about' | 'projects' | 'contact' | 'project-detail';

export interface TerminalEntry {
  type: 'command' | 'output';
  content: React.ReactNode;
  timestamp: number;
}

export const useTerminal = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  // History per view
  const [histories, setHistories] = useState<Record<string, TerminalEntry[]>>({
    home: [],
    about: [],
    projects: [],
    contact: [],
  });

  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Helper to get current history key
  const getHistoryKey = useCallback(() => {
    if (currentView === 'project-detail' && currentProject) {
      return `project-${currentProject}`;
    }
    return currentView;
  }, [currentView, currentProject]);

  const addToHistory = useCallback((entry: TerminalEntry) => {
    const key = getHistoryKey();
    setHistories((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), entry]
    }));
  }, [getHistoryKey]);

  const clearHistory = useCallback(() => {
    const key = getHistoryKey();
    setHistories((prev) => ({
      ...prev,
      [key]: []
    }));
  }, [getHistoryKey]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setInput('');

    // Add command to current view's history
    addToHistory({
      type: 'command',
      content: trimmedCmd,
      timestamp: Date.now(),
    });

    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmedCmd.split(' ');
    const lowerCmd = command.toLowerCase();

    // Navigation Commands
    if (lowerCmd === 'cd') {
      const target = args[0];

      if (!target || target === '~' || target === 'home') {
        if (currentView !== 'home') {
          setHistories(prev => ({ ...prev, [currentView]: [] })); // Clear current view history
          setCurrentView('home');
          setCurrentProject(null);
        }
      } else if (target === '..') {
        if (currentView === 'project-detail') {
          setHistories(prev => ({ ...prev, [`project-${currentProject}`]: [] })); // Clear project detail history on exit
          setCurrentView('projects');
          setCurrentProject(null);
        } else if (currentView !== 'home') {
          setHistories(prev => ({ ...prev, [currentView]: [] })); // Clear current view history
          setCurrentView('home');
        }
      } else if (target === 'about') {
        if (currentView !== 'about') {
          setCurrentView('about');
        }
      } else if (target === 'projects') {
        if (currentView !== 'projects') {
          setCurrentView('projects');
        }
      } else if (target === 'contact') {
        if (currentView !== 'contact') {
          setCurrentView('contact');
        }
      } else {
        // Check for nested project path (e.g., projects/chat-app)
        let projectId = target;
        if (target.startsWith('projects/')) {
          projectId = target.replace('projects/', '');
        }

        // Check for project
        const project = CONTENT.projects.find(p =>
          p.id === projectId || p.title.toLowerCase().replace(/\s+/g, '-') === projectId
        );

        if (project) {
          if (currentView !== 'project-detail' || currentProject !== project.id) {
            setCurrentView('project-detail');
            setCurrentProject(project.id);
          }
        } else {
          addToHistory({
            type: 'output',
            content: <div className="text-red-500">cd: no such file or directory: {target}</div>,
            timestamp: Date.now(),
          });
        }
      }
      return;
    }

    // Direct View Commands
    if (['about', 'projects', 'contact'].includes(lowerCmd)) {
      if (currentView !== lowerCmd) {
        setCurrentView(lowerCmd as ViewType);
      }
      return;
    }

    if (lowerCmd === 'home') {
      if (currentView !== 'home') {
        setHistories(prev => ({ ...prev, [currentView]: [] })); // Clear current view history
        setCurrentView('home');
      }
      return;
    }

    // Standard Commands
    switch (lowerCmd) {
      case 'help':
        addToHistory({
          type: 'output',
          content: (
            <div className="grid grid-cols-[120px_1fr] gap-2 text-sm md:text-base">
              <span className="text-primary font-bold">about</span>
              <span>Navigate to About Me</span>
              <span className="text-primary font-bold">projects</span>
              <span>Navigate to Projects</span>
              <span className="text-primary font-bold">contact</span>
              <span>Navigate to Contact</span>
              <span className="text-primary font-bold">clear</span>
              <span>Clear terminal</span>
            </div>
          ),
          timestamp: Date.now(),
        });
        break;
      case 'clear':
        clearHistory();
        break;
      default:
        addToHistory({
          type: 'output',
          content: <div className="text-red-500">command not found: {command}</div>,
          timestamp: Date.now(),
        });
        break;
    }
  }, [addToHistory, clearHistory, currentView, currentProject]);

  return {
    history: histories[getHistoryKey()] || [],
    input,
    setInput,
    executeCommand,
    addToHistory,
    clearHistory,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    currentView,
    currentProject,
    cwd: currentView === 'home' ? '~' : currentView === 'project-detail' ? `~/projects/${currentProject}` : `~/${currentView}`,
    navigateHistory: (direction: 'up' | 'down') => {
      if (commandHistory.length === 0) return;

      let newIndex = historyIndex;
      if (direction === 'up') {
        newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      } else {
        newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
      }

      setHistoryIndex(newIndex);
      if (newIndex === -1) {
        setInput('');
      } else {
        setInput(commandHistory[newIndex]);
      }
    }
  };
};
