import { motion } from 'framer-motion';
import { Section } from '../components/Section';

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <Section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />

                <div className="text-center z-10 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <pre className="text-[0.5rem] md:text-xs lg:text-sm font-mono text-primary leading-none mb-8 select-none block">
                            {`
  _____  _____  _______     __     _   _  _____  _    _ 
 |  __ \\|  __ \\|_   _\\ \\   / //\\  | \\ | |/ ____|| |  | |
 | |__) | |__) | | |  \\ \\_/ //  \\ |  \\| | (___  | |__| |
 |  ___/|  _  /  | |   \\   // /\\ \\| . \` |\\___ \\ |  __  |
 | |    | | \\ \\ _| |_   | |/ ____ \\ |\\  |____) || |  | |
 |_|    |_|  \\_\\_____|  |_/_/    \\_\\_| \\_|_____/|_|  |_|
`}
                        </pre>
                        <h2 className="text-2xl md:text-4xl font-bold text-muted-foreground mb-6">
                            Full Stack Developer
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            I'm Priyansh, a full-stack developer crafting premium web experiences.
                            Specializing in .NET, Node.js, and modern React applications.
                        </p>

                        <div className="text-sm text-muted-foreground/80 font-mono">
                            Type <span className="text-primary font-bold">help</span> to get started.
                        </div>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
            </Section>

        </>
    );
}
