import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { SITE_CONFIG, SOCIAL_LINKS } from '../data/config';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [location] = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/">
                    <a className="flex items-center gap-2 font-heading font-bold text-xl text-foreground hover:text-primary transition-colors">
                        <Code2 className="w-8 h-8 text-primary" />
                        <span>{SITE_CONFIG.title}</span>
                    </a>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <a
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    location === item.href ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                {item.label}
                            </a>
                        </Link>
                    ))}
                    <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        Hire Me
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <a
                                className={cn(
                                    'text-base font-medium transition-colors hover:text-primary',
                                    location === item.href ? 'text-primary' : 'text-muted-foreground'
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
