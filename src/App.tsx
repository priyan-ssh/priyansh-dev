import { useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { TerminalInput } from './components/TerminalInput';
import { CommandOutput } from './components/CommandOutput';
import { useTerminal } from './hooks/useTerminal';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  const {
    history,
    executeCommand,
    input,
    setInput,
    cwd,
    currentView,
    currentProject,
  } = useTerminal();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, currentView]);

  const getPrompt = () => {
    return `visitor@priyanssh.dev:${cwd}$`;
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <div className="mb-8 font-mono text-sm md:text-base -mt-32 md:-mt-48">
              <Home />
              <div className="mt-8 p-4 border border-primary/20 rounded bg-primary/5">
                <p>Welcome to priyanssh.dev Terminal [Version 1.0.0]</p>
                <p>(c) 2025 Priyansh Soniya. All rights reserved.</p>
              </div>
            </div>
            <CommandOutput history={history} />
          </>
        );
      case 'about':
        return (
          <>
            <About />
            <CommandOutput history={history} />
          </>
        );
      case 'projects':
        return (
          <>
            <Projects />
            <CommandOutput history={history} />
          </>
        );
      case 'contact':
        return (
          <>
            <Contact />
            <CommandOutput history={history} />
          </>
        );
      case 'project-detail':
        return (
          <>
            {currentProject && <ProjectDetail projectId={currentProject} />}
            <CommandOutput history={history} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto w-full min-h-[calc(100vh-4rem)] flex flex-col pb-20">
        <div className="flex-grow">
          {renderView()}
        </div>

        <div className="mt-4 sticky bottom-0 bg-background/95 backdrop-blur pt-2 pb-1">
          <TerminalInput
            onSubmitCommand={executeCommand}
            onAutocomplete={setInput}
            prompt={getPrompt()}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=""
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </Layout>
  );
}

export default App;
