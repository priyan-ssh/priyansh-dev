import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';

interface CardProps extends HTMLAttributes<HTMLDivElement> { }

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-xl transition-all hover:border-white/20 hover:bg-white/10',
                className
            )}
            {...props}
        />
    );
});

Card.displayName = 'Card';

export { Card };
