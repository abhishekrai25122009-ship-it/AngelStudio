import React from 'react';
import { Sparkles, Palette, Eye, Type, Layers, Compass, ArrowRight } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const VisualDNAPanel: React.FC = () => {
  const { visualDNA, setStage } = useStudio();

  if (!visualDNA) return null;

  return (
    <div
      style={{
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {/* Panel Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge-celestial" style={{ fontSize: '10px' }}>
            <Sparkles size={11} /> Feature 01
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Aesthetic Architecture
          </span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Visual DNA
        </h2>
      </div>

      {/* Creative Director Natural Language Interpretation Card */}
      <div
        className="glass-panel"
        style={{
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-gold)',
          background: 'linear-gradient(135deg, rgba(229, 193, 88, 0.07) 0%, rgba(13, 15, 23, 0.9) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#07080d',
            }}
          >
            <Sparkles size={12} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent-gold)' }}>
            ANGEL'S INTERPRETATION
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '15px',
            lineHeight: 1.65,
            color: '#ffffff',
            fontStyle: 'italic',
          }}
        >
          "{visualDNA.directorInterpretation}"
        </p>
      </div>

      {/* Aesthetic Archetype & Mood */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* Archetype */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Compass size={13} />
            <span>Archetype</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {visualDNA.aestheticArchetype}
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
            {visualDNA.archetypeDescription}
          </p>
        </div>

        {/* Mood */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Eye size={13} />
            <span>Mood & Energy</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {visualDNA.mood}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {visualDNA.moodKeywords.map((kw, i) => (
              <span
                key={i}
                style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Color Palette Swatches */}
      <div className="glass-card" style={{ padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>
            <Palette size={15} color="var(--accent-gold)" />
            <span>Color Palette Harmony</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            {visualDNA.contrastRatioAssessment}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
          {visualDNA.colorPalette.map((color, index) => (
            <div
              key={index}
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(7, 8, 13, 0.6)',
              }}
            >
              <div
                style={{
                  height: '42px',
                  backgroundColor: color.hex,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
                }}
              />
              <div style={{ padding: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {color.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {color.hex}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    {color.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Composition & Typography */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* Composition */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Layers size={13} />
            <span>Composition</span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {visualDNA.compositionRule}
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
            {visualDNA.compositionDescription}
          </p>
        </div>

        {/* Typography */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Type size={13} />
            <span>Typography Voice</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {visualDNA.typographyPersonality}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Density:</span>
            <span className="badge-cyan" style={{ fontSize: '9px', padding: '2px 6px' }}>
              {visualDNA.visualDensity} ({visualDNA.densityScore}/100)
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer: Explore What This Could Become */}
      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <button
          onClick={() => setStage('EXPLORE_DIRECTIONS')}
          className="btn-celestial-primary"
          style={{ width: '100%', padding: '14px 20px', fontSize: '14px' }}
        >
          <span>Explore What This Could Become</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
