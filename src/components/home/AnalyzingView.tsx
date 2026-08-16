import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const AnalyzingView: React.FC = () => {
  const { analyzingStep, activeDesign } = useStudio();

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '48px 36px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-gold)',
        boxShadow: 'var(--glow-gold)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated celestial concentric aura */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 28px' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px dashed var(--accent-gold)',
              animation: 'celestialRotate 12s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '12px',
              borderRadius: '50%',
              border: '1px solid var(--accent-cyan)',
              animation: 'celestialRotate 8s linear infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '24px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(229, 193, 88, 0.3) 0%, rgba(78, 224, 216, 0.1) 60%, transparent 80%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gold)',
            }}
          >
            <Sparkles size={32} className="animate-celestial-pulse" />
          </div>
        </div>

        <div className="badge-celestial" style={{ marginBottom: '14px' }}>
          ✦ Angel Creative Director
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          "Let me understand this."
        </h2>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px', minHeight: '22px' }}>
          {analyzingStep}
        </p>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginBottom: '20px',
          }}
        >
          <div
            className="animate-shimmer"
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-gold) 0%, var(--accent-cyan) 50%, var(--accent-gold) 100%)',
            }}
          />
        </div>

        {activeDesign && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
            <span>Analyzing:</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{activeDesign.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
