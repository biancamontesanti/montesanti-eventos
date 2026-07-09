import React from 'react';

type MarqueeProps = {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
};

export default function Marquee({
  children,
  reverse = false,
  duration = 28,
  className = '',
}: MarqueeProps) {
  return (
    <div className={`relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className}`}>
      <div
        className="flex min-w-full shrink-0 items-center justify-around gap-6 py-3"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex min-w-full shrink-0 items-center justify-around gap-6 py-3"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
