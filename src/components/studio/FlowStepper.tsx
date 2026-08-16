import React from 'react';
import { Sparkles, Compass, CheckCircle2, MessageSquareText } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { StudioStage } from '../../types/studio';

export const FlowStepper: React.FC = () => {
  const { stage, setStage, visualDNA, exploreDirectionsResult, critiqueReport } = useStudio();

  const steps: { id: StudioStage; label: string; number: string; icon: React.ReactNode; ready: boolean }[] = [
    {
      id: 'VISUAL_DNA',
      label: 'Visual DNA',
      number: '01',
      icon: <Sparkles size={14} />,
      ready: !!visualDNA,
    },
    {
      id: 'EXPLORE_DIRECTIONS',
      label: 'Explore Directions',
      number: '02',
      icon: <Compass size={14} />,
      ready: !!exploreDirectionsResult,
    },
    {
      id: 'CRITIQUE',
      label: 'Angel Critique',
      number: '03',
      icon: <MessageSquareText size={14} />,
      ready: !!critiqueReport,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        backgroundColor: 'rgba(10, 12, 18, 0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        gap: '8px',
      }}
    >
      {steps.map((step, idx) => {
        const isActive = stage === step.id;
        const isCompleted = step.ready && stage !== step.id;

        return (
          <React.Fragment key={step.id}>
            <button
              onClick={() => step.ready && setStage(step.id)}
              disabled={!step.ready}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                background: isActive
                  ? 'rgba(229, 193, 88, 0.12)'
                  : isCompleted
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'transparent',
                border: `1px solid ${
                  isActive
                    ? 'var(--border-gold)'
                    : isCompleted
                    ? 'var(--border-subtle)'
                    : 'transparent'
                }`,
                color: isActive
                  ? 'var(--accent-gold-light)'
                  : isCompleted
                  ? 'var(--text-secondary)'
                  : 'var(--text-tertiary)',
                cursor: step.ready ? 'pointer' : 'not-allowed',
                transition: 'all var(--transition-normal)',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive
                    ? 'var(--accent-gold)'
                    : isCompleted
                    ? 'rgba(78, 224, 216, 0.15)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: isActive
                    ? '#07080d'
                    : isCompleted
                    ? 'var(--accent-cyan)'
                    : 'var(--text-tertiary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {isCompleted ? <CheckCircle2 size={13} /> : step.number}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: isActive ? 600 : 500 }}>
                  {step.label}
                </span>
              </div>
            </button>

            {idx < steps.length - 1 && (
              <div
                style={{
                  width: '16px',
                  height: '1px',
                  backgroundColor: 'var(--border-subtle)',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
