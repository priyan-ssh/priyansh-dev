import { AsciiFrame } from '../components/AsciiFrame';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution built with Next.js, Stripe, and Supabase.',
        tech: ['Next.js', 'TypeScript', 'Stripe', 'Supabase'],
        link: '#',
        github: '#',
    },
    {
        title: 'AI Task Manager',
        description: 'Smart task management app that uses AI to prioritize and categorize tasks.',
        tech: ['React', 'Python', 'OpenAI API', 'FastAPI'],
        link: '#',
        github: '#',
    },
    {
        title: 'Real-time Chat App',
        description: 'Scalable chat application supporting thousands of concurrent users.',
        tech: ['Node.js', 'Socket.io', 'Redis', 'Docker'],
        link: '#',
        github: '#',
    },
];

const Projects = () => {
    return (
        <div className="space-y-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-2">_PROJECTS_</h2>
                <p className="text-muted-foreground">A collection of my recent work.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <AsciiFrame title={project.title}>
                            <div className="space-y-4">
                                <p className="text-foreground/90">{project.description}</p>

                                <div>
                                    <span className="text-primary font-bold">Tech Stack:</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-muted-foreground">[{t}]</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-2">
                                    <a href={project.link} className="text-primary hover:underline hover:text-primary/80">[Live Demo]</a>
                                    <a href={project.github} className="text-primary hover:underline hover:text-primary/80">[Source Code]</a>
                                </div>
                            </div>
                        </AsciiFrame>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
