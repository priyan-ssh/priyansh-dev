import { Layout, Database, Smartphone, Code } from 'lucide-react';

export const SITE_CONFIG = {
    title: 'priyanssh.dev',
    prompt: 'visitor@priyanssh.dev:~$',
};

export const SOCIAL_LINKS = {
    email: 'hello@priyanssh.dev',
    github: 'https://github.com/priyansh',
    linkedin: 'https://linkedin.com/in/priyansh',
    twitter: 'https://twitter.com/priyansh',
};

export const ASSETS = {
    backgroundNoise: 'https://grainy-gradients.vercel.app/noise.svg',
};

export const CONTENT = {
    skills: [
        { icon: Layout, title: 'Frontend', desc: 'React, Vue, Tailwind' },
        { icon: Database, title: 'Backend', desc: 'Node.js, .NET, PostgreSQL' },
        { icon: Smartphone, title: 'Mobile', desc: 'React Native, Flutter' },
        { icon: Code, title: 'Architecture', desc: 'Microservices, Docker' },
    ],
    projects: [
        {
            id: 'ecommerce-platform',
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution built with Next.js, Stripe, and Supabase.',
            tech: ['Next.js', 'TypeScript', 'Stripe', 'Supabase'],
            link: '#',
            github: '#',
        },
        {
            id: 'ai-task-manager',
            title: 'AI Task Manager',
            description: 'Smart task management app that uses AI to prioritize and categorize tasks.',
            tech: ['React', 'Python', 'OpenAI API', 'FastAPI'],
            link: '#',
            github: '#',
        },
        {
            id: 'chat-app',
            title: 'Real-time Chat App',
            description: 'Scalable chat application supporting thousands of concurrent users.',
            tech: ['Node.js', 'Socket.io', 'Redis', 'Docker'],
            link: '#',
            github: '#',
        },
    ],
    experience: [
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
    ],
    education: [
        {
            year: '2015 - 2019',
            degree: 'B.S. Computer Science',
            school: 'University of Technology',
        },
    ],
};
