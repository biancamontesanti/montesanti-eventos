// components/sections/Hero.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import InfiniteScrollTitle from './InfiniteScrollTitle';

type GalleryImage = {
  id: number;
  pos: { x: number; y: number };
  mobilePos?: { x: number; y: number };
  seed: number;
  src: string;
  title: string;
  layout?: 'portrait' | 'landscape' | 'square';
  emphasis?: 'featured';
};

type AnimatedGalleryImage = GalleryImage & {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 20, pos: { x: 0.14, y: 0.18 }, mobilePos: { x: 0.26, y: 0.14 }, seed: 6.1, src: '/images/gallery-new/montesanti-gallery-01.jpg', title: 'Doces e velas' },
  { id: 6, pos: { x: 0.18, y: 0.44 }, mobilePos: { x: 0.32, y: 0.42 }, seed: 5.5, src: '/images/event6.JPG', title: 'Detalhes', emphasis: 'featured' },
  { id: 8, pos: { x: 0.78, y: 0.42 }, mobilePos: { x: 0.68, y: 0.56 }, seed: 4.7, src: '/images/event8.JPG', title: 'Momentos', emphasis: 'featured' },
  { id: 29, pos: { x: 0.84, y: 0.16 }, mobilePos: { x: 0.72, y: 0.18 }, seed: 12.6, src: '/images/gallery-new/montesanti-gallery-10.jpg', title: 'Parabéns' },
  { id: 14, pos: { x: 0.35, y: 0.18 }, mobilePos: { x: 0.5, y: 0.26 }, seed: 1.4, src: '/images/event14.JPEG', title: 'Experiência', layout: 'landscape' },
  { id: 5, pos: { x: 0.5, y: 0.4 }, mobilePos: { x: 0.5, y: 0.5 }, seed: 3.4, src: '/images/event5.JPG', title: 'Celebração' },
  { id: 26, pos: { x: 0.32, y: 0.58 }, mobilePos: { x: 0.28, y: 0.72 }, seed: 10.3, src: '/images/gallery-new/montesanti-gallery-07.jpg', title: 'Buffet' },
  { id: 2, pos: { x: 0.65, y: 0.18 }, mobilePos: { x: 0.72, y: 0.78 }, seed: 2.1, src: '/images/event15.JPEG', title: 'Mesa posta' },
  { id: 17, pos: { x: 0.64, y: 0.6 }, mobilePos: { x: 0.45, y: 0.84 }, seed: 2.7, src: '/images/event17.jpg', title: 'Elegância' },
  { id: 3, pos: { x: 0.1, y: 0.68 }, seed: 4.2, src: '/images/event3.JPG', title: 'Recepção' },
  { id: 4, pos: { x: 0.88, y: 0.64 }, seed: 1.3, src: '/images/event4.JPG', title: 'Decoração' },
  { id: 7, pos: { x: 0.9, y: 0.32 }, seed: 2.6, src: '/images/event7.JPG', title: 'Ambientação' },
  { id: 9, pos: { x: 0.74, y: 0.82 }, seed: 1.8, src: '/images/event9.JPG', title: 'Convidados' },
  { id: 10, pos: { x: 0.48, y: 0.22 }, seed: 3.9, src: '/images/event10.JPG', title: 'Produção' },
  { id: 12, pos: { x: 0.18, y: 0.84 }, seed: 2.2, src: '/images/event12.JPG', title: 'Cerimonial' },
  { id: 15, pos: { x: 0.9, y: 0.84 }, seed: 3.5, src: '/images/event2.JPG', title: 'Montagem' },
  { id: 16, pos: { x: 0.28, y: 0.34 }, seed: 5.6, src: '/images/event11.JPG', title: 'Flores' },
  { id: 18, pos: { x: 0.44, y: 0.74 }, seed: 4.8, src: '/images/event18.JPG', title: 'Mesa de doces' },
  { id: 19, pos: { x: 0.58, y: 0.28 }, seed: 1.9, src: '/images/event1.jpg', title: 'Montesanti Eventos' },
  { id: 22, pos: { x: 0.1, y: 0.52 }, seed: 7.4, src: '/images/gallery-new/montesanti-gallery-03.jpg', title: 'Decoração autoral' },
  { id: 23, pos: { x: 0.84, y: 0.74 }, seed: 8.2, src: '/images/gallery-new/montesanti-gallery-04.jpg', title: 'Mesa de apoio' },
  { id: 28, pos: { x: 0.36, y: 0.88 }, seed: 11.9, src: '/images/gallery-new/montesanti-gallery-09.jpg', title: 'Convidados a mesa' },
  { id: 30, pos: { x: 0.56, y: 0.86 }, mobilePos: { x: 0.72, y: 0.34 }, seed: 13.4, src: '/images/gallery-new/montesanti-gallery-11.jpg', title: 'Celebração ao vivo' },
];

const getFrameClassName = (layout: GalleryImage['layout'], emphasis?: GalleryImage['emphasis']) => {
  if (emphasis === 'featured') {
    return 'w-36 h-52 sm:w-40 sm:h-56 md:w-56 md:h-80 lg:w-64 lg:h-[22rem]';
  }

  if (layout === 'landscape') {
    return 'w-40 h-28 sm:w-48 sm:h-32 md:w-64 md:h-40 lg:w-72 lg:h-44';
  }

  if (layout === 'square') {
    return 'w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56';
  }

  return 'w-28 h-40 sm:w-32 sm:h-44 md:w-40 md:h-56 lg:w-48 lg:h-64';
};

const shouldShowOnMobile = (id: number) => [2, 5, 6, 8, 14, 17, 20, 26, 29, 30].includes(id);

const Hero = () => {
  const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
      
      if (e.key === 'ArrowLeft' || e.key === '<') {
        const prevIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
        setSelectedImage(GALLERY_IMAGES[prevIndex]);
      } else if (e.key === 'ArrowRight' || e.key === '>') {
        const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
        setSelectedImage(GALLERY_IMAGES[nextIndex]);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]); // Add selectedImage to dependency array to access current image

  // Track mouse position relative to container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  // Animation calculations
  const animate = (t: number, seed: number) => ({
    baseX: Math.sin(t * 0.003 + seed) * 1.5,
    baseY: Math.cos(t * 0.004 + seed) * 1.5,
    rotate: Math.sin(t * 0.003 + seed) * 1,
    scale: 1 + Math.sin(t * 0.004 + seed) * 0.01,
  });

  // Mouse influence calculation
  const getMouseInfluence = (baseX: number, baseY: number) => {
    const dx = mousePos.x - baseX;
    const dy = mousePos.y - baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influence = Math.max(0, 1 - distance * 2);
    return {
      x: dx * influence * 5,
      y: dy * influence * 5
    };
  };

  // Image configuration
  const images: AnimatedGalleryImage[] = GALLERY_IMAGES.map(img => {
    const baseAnim = animate(time, img.seed);
    const mouseInf = getMouseInfluence(img.pos.x, img.pos.y);
    return {
      ...img,
      x: baseAnim.baseX + mouseInf.x,
      y: baseAnim.baseY + mouseInf.y,
      rotate: baseAnim.rotate,
      scale: baseAnim.scale
    };
  });

  return (
    <section id="home" className="relative h-[112svh] min-h-[720px] bg-black md:h-[118vh] md:min-h-[860px]">
      {/* Background with amber gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-black to-amber-950/90" /> */}

      {/* Gallery Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative h-[112svh] min-h-[720px] w-full overflow-hidden md:h-[118vh] md:min-h-[860px]"
      >
        {/* Title */}
        <div className="absolute  z-10 text-center">
        {/* <ScrollAnimations /> */}
        <InfiniteScrollTitle/>
        </div>

        <div className="absolute inset-0">
          {images.map((img) => (
            <div
              key={img.id}
              className={`hero-gallery-item absolute ${img.emphasis === 'featured' ? 'z-[2]' : 'z-[1]'} ${shouldShowOnMobile(img.id) ? '' : 'hidden md:block'}`}
              style={{
                '--hero-x': img.pos.x,
                '--hero-y': img.pos.y,
                '--hero-mobile-x': img.mobilePos?.x ?? img.pos.x,
                '--hero-mobile-y': img.mobilePos?.y ?? img.pos.y,
                transform: `translate(-50%, -50%) 
                          translate(${img.x}rem, ${img.y}rem)
                          rotate(${img.rotate}deg) 
                          scale(${img.scale})`,
                transition: 'transform 0.6s ease-out',
              } as React.CSSProperties}
            >
              <div 
                className="group relative transition-all duration-700 hover:z-50"
                onClick={() => setSelectedImage(img)}
              >
                <div className={`relative overflow-hidden rounded-2xl ${getFrameClassName(img.layout, img.emphasis)}
                              bg-transparent shadow-lg
                              transition-all duration-700 ease-out
                              hover:scale-[1.07] hover:-translate-y-2 hover:rotate-0
                              hover:shadow-xl
                              cursor-pointer`}>
                  <div className="relative w-full h-full">
                    <Image 
                      src={img.src}
                      alt={img.title}
                      fill
                      priority={img.emphasis === 'featured' || img.id === 20}
                      quality={92}
                      className="object-cover transition-transform duration-1000
                              group-hover:scale-[1.03]"
                      sizes={img.layout === 'landscape' ? '(max-width: 768px) 208px, (max-width: 1024px) 288px, 320px' : '(max-width: 768px) 128px, (max-width: 1024px) 192px, 224px'}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-h-[90vh] max-w-[90vw] bg-black rounded-2xl overflow-hidden
                         shadow-2xl flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white
                         hover:bg-black/70 transition-colors duration-300 z-10"
              >
                <X size={24} />
              </button>

              {/* Image wrapper */}
              <div className="relative flex max-h-[85vh] max-w-[85vw] items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width={1400}
                  height={2100}
                  className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
                  sizes="85vw"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white
                       hover:bg-black/70 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
                const prevIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
                setSelectedImage(GALLERY_IMAGES[prevIndex]);
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white
                       hover:bg-black/70 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id);
                const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
                setSelectedImage(GALLERY_IMAGES[nextIndex]);
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58vh] bg-gradient-to-b from-transparent via-black/75 to-black" />
      </div>
    </section>
  );
};

export default Hero;
