import { useEffect, useState, useRef } from 'react';
import { CONTENT } from '../data/config';
import { AsciiFrame } from '../components/AsciiFrame';
import { motion } from 'framer-motion';

interface ProjectDetailProps {
    projectId: string;
}

const TypingText = ({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
    const [displayed, setDisplayed] = useState('');
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1));
                i++;
                if (i === text.length) {
                    clearInterval(interval);
                    onCompleteRef.current?.();
                }
            }, 10); // Typing speed
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayed}</span>;
};

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
    const project = CONTENT.projects.find(p => p.id === projectId);
    const [step, setStep] = useState(0);

    if (!project) {
        return <div className="text-red-500">Error: Project not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-2">~/projects/{project.id}</h2>
                <p className="text-muted-foreground">
                    <TypingText text="Reading project manifest..." onComplete={() => setStep(1)} />
                </p>
            </div>

            {step >= 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <AsciiFrame title={project.title}>
                        <div className="space-y-6 py-2">
                            <div>
                                <span className="text-primary font-bold block mb-2">DESCRIPTION</span>
                                <p className="text-foreground/90 leading-relaxed">
                                    <TypingText text={project.description} delay={300} onComplete={() => setStep(2)} />
                                </p>
                            </div>

                            {step >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <span className="text-primary font-bold block mb-2">TECH_STACK</span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <motion.span
                                                key={t}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="text-sm border border-primary/30 px-2 py-0.5 rounded text-muted-foreground"
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6"
                                >
                                    <span className="text-primary font-bold block mb-2">LINKS</span>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <span className="text-muted-foreground w-24">Live Demo:</span>
                                            <a href={project.link} className="text-primary hover:underline">{project.link}</a>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-muted-foreground w-24">Source:</span>
                                            <a href={project.github} className="text-primary hover:underline">{project.github}</a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </AsciiFrame>

                    <div className="text-muted-foreground text-sm mt-8 border-t border-primary/20 pt-4 animate-in fade-in duration-1000 delay-1000 fill-mode-forwards opacity-0" style={{ animationDelay: '2s' }}>
                        <p>Type <span className="text-primary font-bold">cd ..</span> to return to projects directory.</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
