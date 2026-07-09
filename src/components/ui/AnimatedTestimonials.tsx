'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type AnimatedTestimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  width: number;
  height: number;
};

type AnimatedTestimonialsProps = {
  testimonials: AnimatedTestimonial[];
  autoplay?: boolean;
};

export default function AnimatedTestimonials({ testimonials, autoplay = true }: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoplay || testimonials.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [autoplay, testimonials.length]);

  const activeTestimonial = testimonials[active];

  const goToPrevious = () => {
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[minmax(280px,0.9fr)_1.1fr] md:gap-14">
      <div className="relative flex min-h-[360px] w-full items-center justify-center overflow-visible md:min-h-[590px]">
        <div className="relative flex w-full items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeTestimonial.src}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="flex w-full items-center justify-center"
            >
              <div className="max-w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-2 shadow-2xl">
                <Image
                  src={activeTestimonial.src}
                  alt={activeTestimonial.name}
                  width={activeTestimonial.width}
                  height={activeTestimonial.height}
                  priority={active === 0}
                  className="h-auto max-h-[340px] w-auto max-w-full rounded-md object-contain md:max-h-[560px]"
                  sizes="(max-width: 768px) 92vw, 520px"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="min-h-[300px] md:min-h-[360px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeTestimonial.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/50 md:text-sm">Equipe Montesanti</p>
            <h3 className="mt-3 text-3xl font-light text-white md:mt-4 md:text-5xl">{activeTestimonial.name}</h3>
            <p className="mt-3 text-base text-white/60 md:text-lg">{activeTestimonial.designation}</p>
            <p className="mt-6 text-base leading-relaxed text-white/75 md:mt-8 md:text-xl">
              {activeTestimonial.quote}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={goToPrevious}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
            aria-label="Ver integrante anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
            aria-label="Ver próxima integrante"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
