import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-section-primary disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-section-primary text-white hover:opacity-90 active:scale-[0.98]',
    secondary: 'bg-section-accent text-brand-text-dark hover:opacity-90 active:scale-[0.98]',
    outline: 'border-2 border-section-primary text-section-primary hover:bg-section-primary hover:text-white active:scale-[0.98]',
    ghost: 'text-section-primary hover:bg-section-surface active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
