import React from 'react';
import { CritiqueAnnotationPin } from '../../types/critique';

interface AnnotationOverlayProps {
  annotations: CritiqueAnnotationPin[];
  activePinId: string | null;
  hoveredPinId: string | null;
  onPinClick: (id: string) => void;
  onPinHover: (id: string | null) => void;
  visible: boolean;
}

export const AnnotationOverlay: React.FC<AnnotationOverlayProps> = ({
  annotations,
  activePinId,
  hoveredPinId,
  onPinClick,
  onPinHover,
  visible,
}) => {
  if (!visible || !annotations || annotations.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {annotations.map((ann) => {
        const isSelected = activePinId === ann.id;
        const isHovered = hoveredPinId === ann.id;
        const isHighlighted = isSelected || isHovered;

        return (
          <React.Fragment key={ann.id}>
            {/* Highlight Box if available and active/hovered */}
            {ann.highlightBox && isHighlighted && (
              <div
                style={{
                  position: 'absolute',
                  left: `${ann.highlightBox.x}%`,
                  top: `${ann.highlightBox.y}%`,
                  width: `${ann.highlightBox.width}%`,
                  height: `${ann.highlightBox.height}%`,
                  border: '2px dashed var(--accent-gold)',
                  backgroundColor: 'rgba(229, 193, 88, 0.12)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 0 20px rgba(229, 193, 88, 0.3)',
                  transition: 'all var(--transition-normal)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Interactive Pin Marker */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onPinClick(ann.id);
              }}
              onMouseEnter={() => onPinHover(ann.id)}
              onMouseLeave={() => onPinHover(null)}
              style={{
                position: 'absolute',
                left: `${ann.pinLocation.x}%`,
                top: `${ann.pinLocation.y}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                zIndex: isHighlighted ? 30 : 25,
                transition: 'transform var(--transition-fast)',
              }}
            >
              {/* Radar pulse ring if active */}
              {isHighlighted && (
                <div
                  className="animate-pin-radar"
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '-6px',
                    right: '-6px',
                    bottom: '-6px',
                    borderRadius: '50%',
                    border: '2px solid var(--accent-gold)',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Pin Body */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isHighlighted ? '32px' : '26px',
                  height: isHighlighted ? '32px' : '26px',
                  borderRadius: '50%',
                  background: isHighlighted
                    ? 'linear-gradient(135deg, #fae69e 0%, #e5c158 100%)'
                    : 'rgba(12, 14, 22, 0.88)',
                  color: isHighlighted ? '#07080d' : '#f5f6fa',
                  border: `2px solid ${isHighlighted ? '#ffffff' : 'var(--accent-gold)'}`,
                  fontSize: isHighlighted ? '12px' : '10px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  boxShadow: isHighlighted
                    ? '0 0 20px rgba(229, 193, 88, 0.8), 0 4px 12px rgba(0,0,0,0.6)'
                    : '0 2px 10px rgba(0,0,0,0.6)',
                  transform: isHighlighted ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {ann.number}
              </div>

              {/* Tooltip on hover */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(12, 14, 22, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border-gold)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 600,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ color: 'var(--accent-gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {ann.pillar}
                  </div>
                  <div>{ann.title}</div>
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
