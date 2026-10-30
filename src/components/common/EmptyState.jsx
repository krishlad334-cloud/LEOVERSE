import React from 'react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#242321] mb-6">
          <Icon className="w-8 h-8 stroke-[1.25]" />
        </div>
      )}
      <h3 className="text-xl font-medium tracking-tight text-[#242321] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[#77746E] leading-relaxed mb-8">
          {description}
        </p>
      )}
      {actionLabel && (actionTo || onAction) && (
        <Button to={actionTo} onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
