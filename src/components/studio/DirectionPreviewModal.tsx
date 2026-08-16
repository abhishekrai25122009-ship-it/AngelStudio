import React from 'react';
import { X, Sparkles, ArrowRight, Wand2 } from 'lucide-react';
import { DirectionConcept } from '../../types/exploreDirections';
import { useStudio } from '../../context/StudioContext';

interface DirectionPreviewModalProps {
  direction: DirectionConcept | null;
  onClose: () => void;
  onProceedToCritique: () => void;
}

export const DirectionPreviewModal: React.FC<DirectionPreviewModalProps> = ({
  direction,
  onClose,
  onProceedToCritique,
}) => {
  const { activeDesign } = useStudio();

  if (!direction || !activeDesign) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(7, 8, 13, 0.88)',
        backdropFilter: 'blur(20px)',
        padding: '24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          padding: '32px',
          position: 'relative',
          border: '1px solid var(--border-gold)',
          boxShadow: 'var(--glow-gold)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-celestial" style={{ fontSize: '10px' }}>
              <Sparkles size={11} /> Creative Direction
            </span>
            <span className="badge-cyan" style={{ fontSize: '10px' }}>
              {direction.category}
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {direction.title}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {direction.tagline}
          </p>
        </div>

        {/* Side-by-Side Comparison: Original vs Directional Evolution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Original View */}
          <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Original Visual
            </div>
            <div style={{ flex: 1, backgroundColor: '#07080d', borderRadius: 'var(--radius-sm)', overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={activeDesign.url}
                alt="Original"
                style={{ maxWidth: '100%', maxHeight: '340px', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Evolved Direction View */}
          <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-gold-light)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wand2 size={13} />
                <span>Evolved Direction Preview</span>
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                Prototype Preview
              </span>
            </div>
            <div style={{ flex: 1, backgroundColor: '#07080d', borderRadius: 'var(--radius-sm)', overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={direction.previewImageUrl || activeDesign.url}
                alt={direction.title}
                style={{ maxWidth: '100%', maxHeight: '340px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* Direction Details & Palette Shift */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Creative Transformation Concept
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            {direction.explanation}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Palette Shift:</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                {direction.paletteShift.map((hex, i) => (
                  <span
                    key={i}
                    title={hex}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: hex,
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Suggested Typography:</span>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '6px' }}>
                {direction.suggestedTypography}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Key Transformations:</span>
              <ul style={{ paddingLeft: '16px', marginTop: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                {direction.keyChanges.map((change, idx) => (
                  <li key={idx}>{change}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            className="btn-celestial-secondary"
            style={{ fontSize: '13px' }}
          >
            Close Comparison
          </button>
          <button
            onClick={onProceedToCritique}
            className="btn-celestial-primary"
            style={{ fontSize: '13px' }}
          >
            <span>Proceed to Angel Critique</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
