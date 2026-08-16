import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Download, Eye, EyeOff } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

interface CanvasControlsProps {
  showPins: boolean;
  onTogglePins: () => void;
  hasPins: boolean;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  showPins,
  onTogglePins,
  hasPins,
}) => {
  const { zoom, setZoom, activeDesign, critiqueReport, visualDNA } = useStudio();

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(2.5, +(prev + 0.15).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.4, +(prev - 0.15).toFixed(2)));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  // Download visual + Angel Creative Director Report
  const handleDownload = () => {
    if (!activeDesign) return;

    // 1. Download image
    const link = document.createElement('a');
    link.download = `${activeDesign.name}-angel-studio.png`;
    link.href = activeDesign.url;
    link.click();

    // 2. If critique or DNA exists, also offer JSON / text summary report
    if (visualDNA || critiqueReport) {
      const reportText = `ANGEL STUDIO CREATIVE DIRECTOR REPORT
Project: ${activeDesign.name}
Date: ${new Date().toLocaleDateString()}

========================================
1. VISUAL DNA
========================================
Aesthetic Archetype: ${visualDNA?.aestheticArchetype || 'N/A'}
Mood: ${visualDNA?.mood || 'N/A'}
Visual Density: ${visualDNA?.visualDensity || 'N/A'} (Score: ${visualDNA?.densityScore || 'N/A'}/100)
Composition: ${visualDNA?.compositionRule || 'N/A'}

Palette:
${visualDNA?.colorPalette.map(c => `  - ${c.name} (${c.hex}) [${c.role}]`).join('\n')}

Director's Interpretation:
"${visualDNA?.directorInterpretation || 'N/A'}"

========================================
2. ANGEL CRITIQUE
========================================
Director Overall Score: ${critiqueReport?.directorScore.overall || 'N/A'}/100
Verdict: "${critiqueReport?.overallVerdict || 'N/A'}"

Key Annotations:
${critiqueReport?.annotations.map(a => `[${a.number}] ${a.pillar}: ${a.title}\n  Observation: ${a.observation}\n  Recommendation: ${a.recommendation}\n`).join('\n')}

Generated with Angel Studio — "Create beyond the original."
`;
      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const reportUrl = URL.createObjectURL(blob);
      const repLink = document.createElement('a');
      repLink.download = `${activeDesign.name}-angel-critique-report.txt`;
      repLink.href = reportUrl;
      repLink.click();
      URL.revokeObjectURL(reportUrl);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(12, 14, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-medium)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Zoom Out */}
      <button
        onClick={handleZoomOut}
        title="Zoom Out"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ZoomOut size={16} />
      </button>

      {/* Zoom % */}
      <button
        onClick={handleResetZoom}
        title="Reset Zoom"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
        }}
      >
        {Math.round(zoom * 100)}%
      </button>

      {/* Zoom In */}
      <button
        onClick={handleZoomIn}
        title="Zoom In"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ZoomIn size={16} />
      </button>

      <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-subtle)', margin: '0 4px' }} />

      {/* Fit / Reset */}
      <button
        onClick={handleResetZoom}
        title="Fit View"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Maximize2 size={16} />
      </button>

      {/* Toggle Pins Button (only if pins exist) */}
      {hasPins && (
        <button
          onClick={onTogglePins}
          title={showPins ? 'Hide Critique Pins' : 'Show Critique Pins'}
          style={{
            background: showPins ? 'rgba(229, 193, 88, 0.15)' : 'none',
            border: `1px solid ${showPins ? 'var(--border-gold)' : 'transparent'}`,
            color: showPins ? 'var(--accent-gold)' : 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
          }}
        >
          {showPins ? <Eye size={14} /> : <EyeOff size={14} />}
          <span>Pins</span>
        </button>
      )}

      <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-subtle)', margin: '0 4px' }} />

      {/* Download */}
      <button
        onClick={handleDownload}
        title="Export Design & Critique Report"
        className="btn-celestial-secondary"
        style={{
          padding: '4px 12px',
          fontSize: '12px',
          borderRadius: 'var(--radius-full)',
        }}
      >
        <Download size={13} />
        <span>Export</span>
      </button>
    </div>
  );
};
