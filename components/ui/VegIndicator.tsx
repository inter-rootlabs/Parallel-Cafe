import React from 'react';

/** Indian standard veg indicator — green square border with a green dot inside */
export default function VegIndicator({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 border border-green-600 rounded-sm flex-shrink-0 ${className}`}
      aria-label="Vegetarian"
      role="img"
    >
      <span className="block w-2 h-2 bg-green-600 rounded-full" />
    </span>
  );
}
