import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { SAMPLE_DESIGNS } from '../../services/ai/sampleData';
import { useStudio } from '../../context/StudioContext';

export const SampleGallery: React.FC = () => {
  const { loadSample } = useStudio();

  return (
    <div style={{ maxWidth: '1140px', margin: '30px auto 60px', padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
              ✦ Instant Demo Presets
            </span>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
            Try Angel with curated visual designs
          </h2>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          Click any design to analyze immediately
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {SAMPLE_DESIGNS.map((sample) => (
          <div
            key={sample.id}
            onClick={() => loadSample(sample.id)}
            className="glass-card"
            style={{
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Visual Thumbnail Frame */}
            <div
              style={{
                width: '100%',
                height: '280px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: '#07080d',
                marginBottom: '14px',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
              }}
            >
              <img
                src={sample.thumbnail}
                alt={sample.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform var(--transition-slow)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(7, 8, 13, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--accent-cyan-light)',
                  letterSpacing: '0.04em',
                }}
              >
                {sample.category}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {sample.title}
                  </h3>
                  <ArrowUpRight size={16} color="var(--text-tertiary)" />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                  {sample.description}
                </p>
              </div>

              {/* Color Swatch Preview Strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginRight: '4px' }}>DNA:</span>
                {sample.initialDNA.colorPalette.map((color, idx) => (
                  <span
                    key={idx}
                    title={`${color.name} (${color.hex})`}
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                ))}
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={11} /> Explore
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
