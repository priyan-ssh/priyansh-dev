import { AsciiFrame } from '../components/AsciiFrame';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../data/config';

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/80 to-accent/80 p-8 md:p-12 text-center mb-12 border border-white/10">
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                        Ready to start your project?
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                        Let's collaborate to build something extraordinary that stands out in the digital landscape.
                    </p>
                </div>
                <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]" />
            </div>

            <div className="max-w-2xl mx-auto">
                <AsciiFrame title="CONTACT_INFO">
                    <div className="grid gap-6 md:grid-cols-2 p-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-primary font-bold">Email:</span>
                            <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:underline hover:text-primary">{SOCIAL_LINKS.email}</a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-primary font-bold">GitHub:</span>
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">github.com/priyansh</a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-primary font-bold">LinkedIn:</span>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">linkedin.com/in/priyansh</a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-primary font-bold">Twitter:</span>
                            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">@priyansh</a>
                        </div>
                    </div>
                </AsciiFrame>
            </div>
        </motion.div>
    );
};

export default Contact;
