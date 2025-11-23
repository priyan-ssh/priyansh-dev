import { AsciiFrame } from '../components/AsciiFrame';
import { motion } from 'framer-motion';

const experience = [
    {
        year: '2023 - Present',
        role: 'Senior Full Stack Developer',
        company: 'Tech Solutions Inc.',
        description: 'Leading development of enterprise cloud applications.',
    },
    {
        year: '2021 - 2023',
        role: 'Full Stack Developer',
        company: 'Digital Innovations',
        description: 'Built scalable microservices and React frontends.',
    },
    {
        year: '2019 - 2021',
        role: 'Junior Developer',
        company: 'StartUp Hub',
        description: 'Collaborated on MVP development for various clients.',
    },
];

const education = [
    {
        year: '2015 - 2019',
        degree: 'B.S. Computer Science',
        school: 'University of Technology',
    },
];

const About = () => {
    return (
        <div className="space-y-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-2">_ABOUT_ME_</h2>
                <p className="text-muted-foreground">
                    Full-stack developer with a passion for building scalable, high-performance applications.
                    Specializing in .NET, Node.js, and React ecosystems.
                </p>
            </div>

            <AsciiFrame title="EXPERIENCE_LOG">
                <div className="space-y-6">
                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2"
                        >
                            <div className="text-primary font-bold">[{job.year}]</div>
                            <div>
                                <div className="font-bold text-foreground">{job.role} @ {job.company}</div>
                                <div className="text-muted-foreground text-sm">{job.description}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </AsciiFrame>

            <AsciiFrame title="EDUCATION_DB">
                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2">
                            <div className="text-primary font-bold">[{edu.year}]</div>
                            <div>
                                <div className="font-bold text-foreground">{edu.degree}</div>
                                <div className="text-muted-foreground text-sm">{edu.school}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </AsciiFrame>
        </div>
    );
};

export default About;
