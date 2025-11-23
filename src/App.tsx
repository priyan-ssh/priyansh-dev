import { useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { TerminalInput } from './components/TerminalInput';
import { CommandOutput } from './components/CommandOutput';
import { useTerminal } from './hooks/useTerminal';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  const {
    history,
    executeCommand,
    addToHistory,
    handleAutocomplete,
    startInteractiveSession,
    interactiveSession,
    input,
    setInput
  } = useTerminal();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Override executeCommand to handle specific page components
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === 'about') {
      executeCommand(cmd);
      addToHistory({
        type: 'output',
        content: <About />,
        timestamp: Date.now(),
      });
    } else if (trimmedCmd === 'projects') {
      executeCommand(cmd);
      addToHistory({
        type: 'output',
        content: <Projects />,
        timestamp: Date.now(),
      });
    } else if (trimmedCmd === 'contact') {
      executeCommand(cmd);
      addToHistory({
        type: 'output',
        content: <Contact />,
        timestamp: Date.now(),
      });

      // Start interactive form
      setTimeout(() => {
        addToHistory({
          type: 'output',
          content: <div className="text-primary mt-4">Initializing secure transmission protocol...<br />Please enter your details:</div>,
          timestamp: Date.now(),
        });

        startInteractiveSession({
          isActive: true,
          stepId: 'name',
          data: {} as Record<string, string>,
          onInput: (input, session) => {
            if (session.stepId === 'name') {
              return {
                ...session,
                stepId: 'email',
                data: { ...session.data, name: input }
              };
            }
            if (session.stepId === 'email') {
              return {
                ...session,
                stepId: 'message',
                data: { ...session.data, email: input }
              };
            }
            if (session.stepId === 'message') {
              // Form complete
              const finalData: Record<string, string> = { ...session.data, message: input };
              addToHistory({
                type: 'output',
                content: (
                  <div className="text-green-400 mt-2">
                    Transmission received.<br />
                    Name: {finalData.name}<br />
                    Email: {finalData.email}<br />
                    Message: {finalData.message}<br />
                    <span className="text-primary font-bold">We will be in touch.</span>
                  </div>
                ),
                timestamp: Date.now(),
              });
              return null; // End session
            }
            return null;
          }
        });
      }, 500);

    } else {
      executeCommand(cmd);
    }
  };

  const getPrompt = () => {
    if (!interactiveSession?.isActive) return 'visitor@priyanssh.dev:~$';
    switch (interactiveSession.stepId) {
      case 'name': return 'Name:';
      case 'email': return 'Email:';
      case 'message': return 'Message:';
      default: return '>';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8 font-mono text-sm md:text-base">
          <p>Welcome to priyanssh.dev Terminal [Version 1.0.0]</p>
          <p>(c) 2025 Priyansh Soniya. All rights reserved.</p>
          <br />
          <p>Type <span className="text-primary font-bold">'help'</span> to see available commands.</p>
        </div>

        <CommandOutput history={history} />

        <TerminalInput
          onSubmitCommand={handleCommand}
          onAutocomplete={handleAutocomplete}
          prompt={getPrompt()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={interactiveSession?.isActive ? '' : "Type a command..."}
        />
        <div ref={bottomRef} />
      </div>
    </Layout>
  );
}

export default App;
