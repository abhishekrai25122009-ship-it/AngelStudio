import React, { useState } from 'react';
import { Compass, ArrowRight, Eye, Wand2, Check } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { DirectionConcept } from '../../types/exploreDirections';
import { DirectionPreviewModal } from './DirectionPreviewModal';

export const ExploreDirectionsPanel: React.FC = () => {
  const {
    exploreDirectionsResult,
    selectedDirection,
    selectDirection,
    setStage,
  } = useStudio();

  const [previewingDirection, setPreviewingDirection] = useState<DirectionConcept | null>(null);

  if (!exploreDirectionsResult) return null;

  const handleSelectAndPreview = (dir: DirectionConcept) => {
    selectDirection(dir);
    setPreviewingDirection(dir);
  };

  return (
    <>
      <div
        style={{
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflowY: 'auto',
          height: '100%',
        }}
      >
        {/* Panel Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-celestial" style={{ fontSize: '10px' }}>
              <Compass size={11} /> Feature 02
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Creative Evolution Matrix
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Explore Directions
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {exploreDirectionsResult.creativeRationale}
          </p>
        </div>

        {/* Directions Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {exploreDirectionsResult.directions.map((dir) => {
            const isSelected = selectedDirection?.id === dir.id;

            return (
              <div
                key={dir.id}
                className={`glass-card ${isSelected ? 'active' : ''}`}
                style={{
                  padding: '18px',
                  display: 'flex',
                  gap: '16px',
                  position: 'relative',
                  border: isSelected ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--glow-gold)' : 'none',
                }}
              >
                {/* Visual Preview Thumbnail */}
                <div
                  onClick={() => handleSelectAndPreview(dir)}
                  style={{
                    width: '120px',
                    height: '140px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: '#07080d',
                    flexShrink: 0,
                    cursor: 'pointer',
                    position: 'relative',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <img
                    src={dir.previewImageUrl}
                    alt={dir.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                  >
                    <span style={{ fontSize: '10px', color: '#ffffff', background: 'rgba(0,0,0,0.75)', padding: '3px 8px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={10} /> Compare
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge-cyan" style={{ fontSize: '9px', padding: '2px 8px' }}>
                        {dir.category}
                      </span>
                      {isSelected && (
                        <span style={{ fontSize: '11px', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <Check size={13} /> Selected Direction
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {dir.title}
                    </h3>

                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                      {dir.explanation}
                    </p>
                  </div>

                  {/* Palette Shift & Action Strip */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Shift:</span>
                      {dir.paletteShift.map((hex, idx) => (
                        <span
                          key={idx}
                          title={hex}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: hex,
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        />
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleSelectAndPreview(dir)}
                        className="btn-celestial-secondary"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        <Wand2 size={11} />
                        <span>Compare</span>
                      </button>
                      <button
                        onClick={() => selectDirection(dir)}
                        className="btn-celestial-primary"
                        style={{ padding: '4px 12px', fontSize: '11px' }}
                      >
                        {isSelected ? 'Selected' : 'Choose'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Footer: Proceed to Angel Critique */}
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button
            onClick={() => setStage('CRITIQUE')}
            className="btn-celestial-primary"
            style={{ width: '100%', padding: '14px 20px', fontSize: '14px' }}
          >
            <span>Proceed to Angel Critique</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Comparison Modal */}
      <DirectionPreviewModal
        direction={previewingDirection}
        onClose={() => setPreviewingDirection(null)}
        onProceedToCritique={() => {
          setPreviewingDirection(null);
          setStage('CRITIQUE');
        }}
      />
    </>
  );
};
