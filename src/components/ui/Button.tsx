import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.96]';

  const variantClasses = {
    primary:
      'gradient-primary text-white hover:shadow-glow-primary hover:brightness-110',
    secondary:
      'gradient-secondary text-white hover:brightness-110',
    danger:
      'gradient-danger text-white hover:shadow-glow-danger hover:brightness-110',
    success:
      'gradient-success text-white hover:shadow-glow-success hover:brightness-110',
    ghost:
      'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
