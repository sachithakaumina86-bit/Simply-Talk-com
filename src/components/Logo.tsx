import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = false,
  size = 'md',
}) => {
  const isDark = variant === 'dark';
  const isWhite = variant === 'white';

  const markSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Logo Avatar / Badge */}
      <img
        src="/logo.jpeg"
        alt="SimplyTalk Logo"
        width={markSize}
        height={markSize}
        loading="eager"
        decoding="async"
        className="rounded-full object-cover shrink-0 shadow-xs ring-1 ring-emerald-500/20 hover:scale-105 transition-transform duration-300"
      />

      {/* Wordmark and optional tagline */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${textSize} ${
            isWhite ? 'text-white' : isDark ? 'text-white' : 'text-[#1F2433]'
          }`}
        >
          Simply<span className="text-[#14C3A2]">Talk</span>
        </span>
        {showTagline && (
          <span
            className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 ${
              isWhite ? 'text-slate-300' : isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Chat · Learn · Grow
          </span>
        )}
      </div>
    </div>
  );
};
