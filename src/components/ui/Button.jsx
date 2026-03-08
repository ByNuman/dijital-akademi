import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Button({
    children,
    variant = 'primary',
    className,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-black active:scale-95";

    const variants = {
        primary: "bg-brand-gold text-brand-black hover:bg-brand-gold-dark gold-glow",
        outline: "border-2 border-brand-gold text-white hover:bg-brand-gold hover:text-brand-black",
        ghost: "text-white hover:bg-white/10",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}
