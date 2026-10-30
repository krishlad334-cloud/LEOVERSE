import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | light
  size = 'md', // sm | md | lg
  to = null,
  href = null,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  icon: Icon = null,
  iconPosition = 'right',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-[0.08em] uppercase transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2.5 space-x-2',
    md: 'text-xs md:text-sm px-6 py-3.5 space-x-2.5',
    lg: 'text-sm px-8 py-4 space-x-3',
  };

  const variantStyles = {
    primary: 'bg-[#252522] text-[#FAF9F6] hover:bg-[#383733] active:bg-[#1a1a18]',
    secondary: 'bg-[#EAE5DC] text-[#242321] hover:bg-[#DCD5CA] active:bg-[#cfc7b9]',
    outline: 'bg-transparent text-[#242321] border border-[#242321] hover:bg-[#242321] hover:text-[#FAF9F6]',
    lightOutline: 'bg-transparent text-[#FAF9F6] border border-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#252522]',
    ghost: 'bg-transparent text-[#242321] hover:text-[#77746E] p-0 tracking-[0.1em]',
    lightGhost: 'bg-transparent text-[#FAF9F6] hover:text-[#EAE5DC] p-0 tracking-[0.1em]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedClasses}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`group ${combinedClasses}`} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${combinedClasses}`}
    >
      {content}
    </button>
  );
};

export default Button;
