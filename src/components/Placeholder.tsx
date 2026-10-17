import React from 'react';
import { isPlaceholder } from '../data/placeholders';

interface PlaceholderProps {
  value: string | null | undefined;
  fallbackLabel?: string;
  className?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  value,
  fallbackLabel = 'Placeholder',
  className = '',
}) => {
  if (!value) return null;

  if (isPlaceholder(value)) {
    return (
      <span
        title={`Owner to replace: ${value}`}
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-amber-50 text-amber-800 border border-amber-300 shadow-xs ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5"></span>
        {value}
      </span>
    );
  }

  return <span className={className}>{value}</span>;
};
