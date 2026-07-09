import React, { useState, useEffect, useRef } from 'react';

type DiagramNode = {
  id: number;
  label: string;
  description: string;
  x: number;
  y: number;
  side: 'left' | 'right';
};

const FloatingOrganicDiagram = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setIsMobile(width < 768);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getNodePositions = (): DiagramNode[] => {
    if (isMobile) {
      return [
        { id: 1, label: 'Planejamento', description: '', x: 30, y: 20, side: 'left' },
        { id: 2, label: 'Convites', description: '', x: 70, y: 20, side: 'right' },
        { id: 3, label: 'Catering', description: '', x: 70, y: 50, side: 'right' },
        { id: 4, label: 'Audiovisual', description: '', x: 30, y: 50, side: 'left' },
        { id: 5, label: 'Decoração', description: '', x: 30, y: 80, side: 'left' },
        { id: 6, label: 'Recepção', description: '', x: 70, y: 80, side: 'right' }
      ];
    }
    return [
      { id: 1, label: 'Planejamento', description: '', x: 25, y: 30, side: 'left' },
      { id: 2, label: 'Convites', description: '', x: 75, y: 30, side: 'right' },
      { id: 3, label: 'Catering', description: '', x: 65, y: 70, side: 'right' },
      { id: 4, label: 'Audiovisual', description: '', x: 35, y: 70, side: 'left' },
      { id: 5, label: 'Decoração', description: '', x: 20, y: 50, side: 'left' },
      { id: 6, label: 'Recepção', description: '', x: 80, y: 50, side: 'right' }
    ];
  };

  const getScaledValue = (baseValue: number) => {
    return isMobile ? baseValue * 1.5 : baseValue;
  };

  const baseNodes = getNodePositions();
  const nodes = baseNodes.map((node, index) => {
    const offset = time * 0.02 + index * (Math.PI / 3);
    const floatX = Math.sin(offset) * (isMobile ? 1.5 : 2);
    const floatY = Math.cos(offset * 0.5) * (isMobile ? 1.5 : 2);
    return {
      ...node,
      x: node.x + floatX,
      y: node.y + floatY
    };
  });

  const connections = nodes.flatMap((node, i) => 
    nodes.slice(i + 1).map(nextNode => ({
      id: `${node.id}-${nextNode.id}`,
      x1: node.x,
      y1: node.y,
      x2: nextNode.x,
      y2: nextNode.y,
      offset: Math.sin(time * 0.02 + i) * (isMobile ? 3 : 5)
    }))
  );

  return (
    
    <div ref={containerRef} className="w-full aspect-video relative min-h-[300px]">
      <svg 
        className="w-full h-full"
        viewBox="0 0 100 90"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="softNodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#8058ac', stopOpacity: 0.95 }} />
            <stop offset="100%" style={{ stopColor: '#a083c9', stopOpacity: 0.98 }} />
          </radialGradient>

          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8058ac', stopOpacity: 0.2 }} />
            <stop offset="50%" style={{ stopColor: '#a083c9', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#8058ac', stopOpacity: 0.2 }} />
          </linearGradient>
          
          <filter id="enhancedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feFlood floodColor="#a083c9" floodOpacity="0.2" result="colorFlood"/>
            <feComposite in="colorFlood" in2="coloredBlur" operator="in" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feFlood floodColor="#a083c9" floodOpacity="0.4"/>
            <feComposite in2="blur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a083c9', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#8058ac', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>

        {connections.map(conn => (
          <path
            key={conn.id}
            d={`M ${conn.x1} ${conn.y1} Q ${(conn.x1 + conn.x2) / 2 + conn.offset} 
               ${(conn.y1 + conn.y2) / 2 + conn.offset} ${conn.x2} ${conn.y2}`}
            stroke="url(#connectionGradient)"
            strokeWidth={getScaledValue(0.8)}
            fill="none"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.4;0.6;0.4"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        ))}

        {nodes.map((node, index) => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          >
            <g transform={`rotate(${Math.sin(time * 0.02 + index) * 5})`}>
              <rect
                x={getScaledValue(-12)}
                y={getScaledValue(-5)}
                width={getScaledValue(24)}
                height={getScaledValue(10)}
                rx={getScaledValue(5)}
                ry={getScaledValue(5)}
                fill="url(#softNodeGradient)"
                stroke="url(#borderGradient)"
                strokeWidth="0.5"
                filter={hoveredNode === node.id ? 'url(#outerGlow)' : 'url(#enhancedGlow)'}
                style={{
                  transform: `scale(${hoveredNode === node.id ? 1.1 : 1})`,
                  transition: 'all 0.3s ease-out'
                }}
              >
                <animate
                  attributeName="opacity"
                  values="0.95;1;0.95"
                  dur={`${2 + index * 0.5}s`}
                  repeatCount="indefinite"
                />
              </rect>

              <text
                className="fill-white text-center pointer-events-none font-light"
                textAnchor="middle"
                dy={getScaledValue(0.5)}
                fontSize={getScaledValue(2.5)}
                style={{ letterSpacing: '0.1em' }}
              >
                {node.label}
              </text>

              <g 
                transform={`translate(
                  ${node.side === 'left' ? getScaledValue(-16) : getScaledValue(16)},
                  ${getScaledValue(8) + Math.cos(time * 0.02 + index) * 0.5}
                )`}
                style={{
                  opacity: hoveredNode === node.id ? 0.9 : 0.7,
                  transition: 'opacity 0.3s ease-out'
                }}
              >
                <text
                  className="fill-white/90 text-center pointer-events-none font-light"
                  textAnchor="middle"
                  dy="0.5"
                  fontSize={getScaledValue(2)}
                >
                  {node.description}
                </text>
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FloatingOrganicDiagram;
