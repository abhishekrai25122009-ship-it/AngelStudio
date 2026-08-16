import React from 'react';
import { MessageSquareText, ShieldAlert, CheckCircle, ArrowLeft, Download } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const CritiquePanel: React.FC = () => {
  const {
    critiqueReport,
    activePinId,
    hoveredPinId,
    setActivePinId,
    setHoveredPinId,
    setStage,
    activeDesign,
  } = useStudio();

  if (!critiqueReport) return null;

  const handleDownloadReport = () => {
    if (!activeDesign) return;

    const reportContent = `✦ ANGEL STUDIO — CREATIVE DIRECTOR CRITIQUE REPORT
Design: ${activeDesign.name}
Generated: ${new Date().toLocaleString()}

==================================================
OVERALL VERDICT:
${critiqueReport.overallVerdict}

SCORES:
- Visual Hierarchy: ${critiqueReport.directorScore.hierarchy}/100
- Contrast: ${critiqueReport.directorScore.contrast}/100
- Composition: ${critiqueReport.directorScore.composition}/100
- Balance & Spacing: ${critiqueReport.directorScore.balance}/100
- Overall Quality: ${critiqueReport.directorScore.overall}/100

==================================================
KEY STRENGTHS:
${critiqueReport.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

==================================================
DETAILED OBSERVATIONS & REFINEMENT PINS:
${critiqueReport.annotations
  .map(
    (ann) => `
[PIN ${ann.number}] ${ann.pillar.toUpperCase()}: ${ann.title}
Severity: ${ann.severity}
Observation: ${ann.observation}
Creative Director Recommendation: ${ann.recommendation}
`
  )
  .join('\n')}

==================================================
Angel Studio — "Create beyond the original."
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeDesign.name}-angel-critique.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
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
            <MessageSquareText size={11} /> Feature 03
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Design Evaluation
          </span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
          ✦ Angel's Critique
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {critiqueReport.summaryNote}
        </p>
      </div>

      {/* Overall Verdict Card */}
      <div
        className="glass-panel"
        style={{
          padding: '18px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-gold)',
          background: 'linear-gradient(135deg, rgba(229, 193, 88, 0.08) 0%, rgba(13, 15, 23, 0.85) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-gold)' }}>
            DIRECTOR'S VERDICT
          </span>
          <div className="badge-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
            {critiqueReport.directorScore.overall} / 100
          </div>
        </div>

        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#ffffff', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
          "{critiqueReport.overallVerdict}"
        </p>
      </div>

      {/* 4-Pillar Score Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {[
          { label: 'Hierarchy', score: critiqueReport.directorScore.hierarchy },
          { label: 'Contrast', score: critiqueReport.directorScore.contrast },
          { label: 'Composition', score: critiqueReport.directorScore.composition },
          { label: 'Balance', score: critiqueReport.directorScore.balance },
        ].map((item, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: '10px 8px',
              textAlign: 'center',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan-light)' }}>
              {item.score}%
            </div>
          </div>
        ))}
      </div>

      {/* Numbered Annotations / Critique Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Numbered Observations (Hover to view on canvas)
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            {critiqueReport.annotations.length} items pinned
          </span>
        </div>

        {critiqueReport.annotations.map((ann) => {
          const isSelected = activePinId === ann.id;
          const isHovered = hoveredPinId === ann.id;
          const isHighlighted = isSelected || isHovered;

          return (
            <div
              key={ann.id}
              onClick={() => setActivePinId(isSelected ? null : ann.id)}
              onMouseEnter={() => setHoveredPinId(ann.id)}
              onMouseLeave={() => setHoveredPinId(null)}
              className="glass-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: isHighlighted ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                backgroundColor: isHighlighted ? 'rgba(25, 29, 45, 0.95)' : 'var(--bg-glass-card)',
                boxShadow: isHighlighted ? 'var(--glow-gold)' : 'none',
                transition: 'all var(--transition-fast)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* Number Badge */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isHighlighted ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.08)',
                    color: isHighlighted ? '#07080d' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    flexShrink: 0,
                  }}
                >
                  {ann.number}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-cyan-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {ann.pillar}
                    </span>
                    {ann.severity === 'high' && (
                      <span style={{ fontSize: '9px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <ShieldAlert size={10} /> Critical
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {ann.title}
                  </h4>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                    {ann.observation}
                  </p>

                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'rgba(7, 8, 13, 0.6)',
                      borderLeft: '2px solid var(--accent-gold)',
                      fontSize: '11px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.45,
                    }}
                  >
                    <strong style={{ color: 'var(--accent-gold)' }}>Recommendation: </strong>
                    {ann.recommendation}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strengths List */}
      <div className="glass-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: '12px', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase' }}>
          <CheckCircle size={14} />
          <span>Core Strengths Preserved</span>
        </div>
        <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {critiqueReport.strengths.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setStage('EXPLORE_DIRECTIONS')}
          className="btn-celestial-secondary"
          style={{ flex: 1, padding: '12px 16px', fontSize: '13px' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Directions</span>
        </button>

        <button
          onClick={handleDownloadReport}
          className="btn-celestial-primary"
          style={{ flex: 1, padding: '12px 16px', fontSize: '13px' }}
        >
          <Download size={14} />
          <span>Download Report</span>
        </button>
      </div>
    </div>
  );
};
