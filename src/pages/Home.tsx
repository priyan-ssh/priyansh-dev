import { motion } from 'framer-motion';
import { ArrowRight, Code, Layout, Smartphone, Database } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { Link } from 'wouter';

const skills = [
    { icon: <Layout className="w-6 h-6" />, title: 'Frontend', desc: 'React, Vue, Tailwind' },
    { icon: <Database className="w-6 h-6" />, title: 'Backend', desc: 'Node.js, .NET, PostgreSQL' },
    { icon: <Smartphone className="w-6 h-6" />, title: 'Mobile', desc: 'React Native, Flutter' },
    { icon: <Code className="w-6 h-6" />, title: 'Architecture', desc: 'Microservices, Docker' },
];

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
                        <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
                            Available for freelance work
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50">
                            Building Digital <br />
                            <span className="text-primary">Masterpieces</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            I'm Priyansh, a full-stack developer crafting premium web experiences.
                            Specializing in .NET, Node.js, and modern React applications.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/projects">
                                <Button size="lg" className="group">
                                    View Work
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg">
                                    Contact Me
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
            </Section>

            {/* Skills Section */}
            <Section className="bg-white/5">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
                    <p className="text-muted-foreground">Comprehensive toolset for modern development</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                                <p className="text-muted-foreground">{skill.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* CTA Section */}
            <Section>
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-accent p-12 md:p-24 text-center">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to start your project?
                        </h2>
                        <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
                            Let's collaborate to build something extraordinary that stands out in the digital landscape.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>
            </Section>
        </>
    );
}
