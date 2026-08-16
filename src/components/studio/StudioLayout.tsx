import React from 'react';
import { useStudio } from '../../context/StudioContext';
import { DesignCanvas } from '../canvas/DesignCanvas';
import { FlowStepper } from './FlowStepper';
import { VisualDNAPanel } from './VisualDNAPanel';
import { ExploreDirectionsPanel } from './ExploreDirectionsPanel';
import { CritiquePanel } from './CritiquePanel';

export const StudioLayout: React.FC = () => {
  const { stage } = useStudio();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(400px, 1fr) minmax(460px, 560px)',
        height: 'calc(100vh - 68px)',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Left Canvas Viewport */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          borderRight: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}
      >
        <DesignCanvas />
      </div>

      {/* Right AI Creative Director Panel */}
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-secondary)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Continuous Flow Stepper */}
        <FlowStepper />

        {/* Dynamic Feature Panels */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {stage === 'VISUAL_DNA' && <VisualDNAPanel />}
          {stage === 'EXPLORE_DIRECTIONS' && <ExploreDirectionsPanel />}
          {stage === 'CRITIQUE' && <CritiquePanel />}
        </div>
      </div>
    </div>
  );
};
