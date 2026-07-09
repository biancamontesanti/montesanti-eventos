'use client';

import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type VideoItem = {
  id: number;
  url: string;
  title: string;
  poster?: string;
};

const cloudinaryVideos: VideoItem[] = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/pom0sldv/video/upload/v1783622708/video2_yuwl1k.mp4',
    title: 'Evento 01',
    poster: '/images/event1.jpg',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/pom0sldv/video/upload/v1783622708/video1_u3qzue.mp4',
    title: 'Evento 02',
    poster: '/images/event2.JPG',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/pom0sldv/video/upload/v1783622710/video7_g4aklm.mp4',
    title: 'Evento 03',
    poster: '/images/event3.JPG',
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/pom0sldv/video/upload/v1783622711/video5_tevu31.mp4',
    title: 'Evento 04',
    poster: '/images/event4.JPG',
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/pom0sldv/video/upload/v1783622712/video6_gda21p.mp4',
    title: 'Evento 05',
    poster: '/images/event5.JPG',
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/pom0sldv/video/upload/f_mp4,q_auto/v1783622894/EDIT_1_ANIVERS%C3%81RIO_wlr0ow.mp4',
    title: 'Aniversário',
    poster: '/images/event6.JPG',
  },
];

function parseVideosFromEnv(): VideoItem[] {
  const rawUrls = process.env.NEXT_PUBLIC_VIDEO_URLS;
  const rawPosters = process.env.NEXT_PUBLIC_VIDEO_POSTERS;

  if (!rawUrls) return [];

  const posters = rawPosters?.split(',').map((poster) => poster.trim()) ?? [];

  return rawUrls
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)
    .map((url, index) => ({
      id: index + 1,
      url,
      title: `Evento ${String(index + 1).padStart(2, '0')}`,
      poster: posters[index],
    }));
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const videos = useMemo(() => {
    const hostedVideos = parseVideosFromEnv();
    if (hostedVideos.length > 0) return hostedVideos;
    return cloudinaryVideos;
  }, []);

  if (videos.length === 0) {
    return (
      <section id="portfolio" className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-white/50">Portfólio</p>
          <h2 className="mt-4 text-3xl font-light text-white md:text-5xl">Registros em vídeo</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Novos registros serão publicados em breve.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-6 md:py-10 bg-gradient-to-b from-transparent via-black/20 to-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-hide md:gap-4">
          {videos.map((video) => (
            <VideoPreview
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="absolute right-4 top-4 z-[60] rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
            aria-label="Fechar vídeo"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <VideoPlayer video={selectedVideo} />
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function VideoPreview({ video, onClick }: { video: VideoItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    element.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.play().catch(() => undefined);
          } else {
            element.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative h-[300px] w-[168px] flex-none snap-start overflow-hidden rounded-lg bg-black/20 text-left shadow-lg md:h-[356px] md:w-[200px]"
      aria-label={`Abrir vídeo ${video.title}`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video.url}
        poster={video.poster}
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
            <Play className="h-6 w-6" />
          </span>
        </div>
      </div>
    </button>
  );
}

function VideoPlayer({ video }: { video: VideoItem }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => setIsPlaying(false));
  }, [video.url]);

  const togglePlay = () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      element.play().catch(() => undefined);
      setIsPlaying(true);
    } else {
      element.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) return;

    element.muted = !element.muted;
    setIsMuted(element.muted);
  };

  return (
    <div className="relative h-[78vh] max-h-[760px] w-full max-w-[430px] overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video.url}
        poster={video.poster}
        playsInline
        controls={false}
      />

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent p-4">
        <button
          type="button"
          onClick={togglePlay}
          className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
          aria-label={isMuted ? 'Ativar som' : 'Silenciar vídeo'}
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
