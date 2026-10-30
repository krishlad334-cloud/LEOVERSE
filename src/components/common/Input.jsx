import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  name,
  id,
  required = false,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const inputId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs uppercase tracking-[0.08em] font-medium text-[#242321] mb-2"
        >
          {label} {required && <span className="text-[#9B7D72]">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-3 bg-transparent border text-sm text-[#242321] placeholder-[#77746E]/60 focus:outline-none transition-colors duration-200 ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-[#D8D2C8] focus:border-[#242321]'
        } disabled:bg-[#EAE5DC]/50 disabled:cursor-not-allowed`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-[#77746E]">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
