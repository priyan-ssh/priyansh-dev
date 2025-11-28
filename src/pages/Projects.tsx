import { motion } from 'framer-motion';
import { CONTENT } from '../data/config';

const Projects = () => {
    return (
        <div className="space-y-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-2">_PROJECTS_</h2>
                <p className="text-muted-foreground">A collection of my recent work.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CONTENT.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative h-full bg-black border border-primary/20 p-6 rounded-lg flex flex-col justify-between hover:border-primary/50 transition-colors">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-primary font-mono">./{project.id}</h3>
                                    <span className="text-xs text-muted-foreground border border-primary/20 px-2 py-1 rounded">
                                        DIR
                                    </span>
                                </div>

                                <p className="text-foreground/80 mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.slice(0, 3).map((t) => (
                                        <span key={t} className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                                            {t}
                                        </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="text-xs text-muted-foreground px-2 py-1">
                                            +{project.tech.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                                <span className="text-xs text-muted-foreground font-mono">
                                    drwxr-xr-x
                                </span>
                                <div className="text-sm font-mono text-primary animate-pulse">
                                    cd {project.id}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
