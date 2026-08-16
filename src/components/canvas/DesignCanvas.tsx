import React, { useState, useRef } from 'react';
import { useStudio } from '../../context/StudioContext';
import { AnnotationOverlay } from './AnnotationOverlay';
import { CanvasControls } from './CanvasControls';

export const DesignCanvas: React.FC = () => {
  const {
    activeDesign,
    critiqueReport,
    activePinId,
    hoveredPinId,
    setActivePinId,
    setHoveredPinId,
    zoom,
    stage,
  } = useStudio();

  const [showPins, setShowPins] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!activeDesign) return null;

  // Annotations are relevant especially when in CRITIQUE stage, but can be viewed whenever critique exists
  const hasAnnotations = !!(critiqueReport?.annotations && critiqueReport.annotations.length > 0);
  const pinsVisible = showPins && hasAnnotations && (stage === 'CRITIQUE' || showPins);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '480px',
        backgroundColor: '#050609',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(19, 22, 35, 0.6) 0%, rgba(5, 6, 9, 1) 100%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 32px 32px, 32px 32px',
      }}
    >
      {/* Visual Canvas Scalable Frame */}
      <div
        style={{
          transform: `scale(${zoom})`,
          transition: 'transform var(--transition-fast)',
          transformOrigin: 'center center',
          maxWidth: '85%',
          maxHeight: '85%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          backgroundColor: '#07080d',
        }}
      >
        <img
          src={activeDesign.url}
          alt={activeDesign.name}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '76vh',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic Annotation Overlay */}
        <AnnotationOverlay
          annotations={critiqueReport?.annotations || []}
          activePinId={activePinId}
          hoveredPinId={hoveredPinId}
          onPinClick={(id) => setActivePinId(id)}
          onPinHover={(id) => setHoveredPinId(id)}
          visible={pinsVisible}
        />
      </div>

      {/* Floating Canvas Controls */}
      <CanvasControls
        showPins={showPins}
        onTogglePins={() => setShowPins(!showPins)}
        hasPins={hasAnnotations}
      />
    </div>
  );
};
