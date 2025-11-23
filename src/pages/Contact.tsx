import { AsciiFrame } from '../components/AsciiFrame';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AsciiFrame title="CONTACT_INFO">
                <div className="space-y-4">
                    <p className="text-foreground/90">
                        Ready to initiate a handshake? Reach out via the following protocols:
                    </p>

                    <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-primary font-bold">Email:</span>
                        <a href="mailto:hello@priyanssh.dev" className="hover:underline">hello@priyanssh.dev</a>

                        <span className="text-primary font-bold">GitHub:</span>
                        <a href="https://github.com/priyansh" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/priyansh</a>

                        <span className="text-primary font-bold">LinkedIn:</span>
                        <a href="https://linkedin.com/in/priyansh" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/priyansh</a>

                        <span className="text-primary font-bold">Twitter:</span>
                        <a href="https://twitter.com/priyansh" target="_blank" rel="noopener noreferrer" className="hover:underline">@priyansh</a>
                    </div>
                </div>
            </AsciiFrame>
        </motion.div>
    );
};

export default Contact;
