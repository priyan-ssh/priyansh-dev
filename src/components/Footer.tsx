import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background py-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <span className="font-heading font-bold text-xl text-foreground">priyanssh.dev</span>
                    <p className="text-sm text-muted-foreground">
                        Building digital experiences that matter.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} priyanssh.dev. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
