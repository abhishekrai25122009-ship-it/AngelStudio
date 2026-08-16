import React, { useState } from 'react';
import { Sparkles, Plus, Key } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { isGeminiConfigured } from '../../services/ai/geminiClient';
import { ApiKeyModal } from './ApiKeyModal';

export const Header: React.FC = () => {
  const { stage, resetToHome } = useStudio();
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const geminiActive = isGeminiConfigured();

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          background: 'rgba(7, 8, 13, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Brand */}
        <div
          onClick={resetToHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(229, 193, 88, 0.2) 0%, rgba(78, 224, 216, 0.2) 100%)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(229, 193, 88, 0.2)',
            }}
          >
            <Sparkles size={18} color="var(--accent-gold)" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                }}
              >
                ANGEL STUDIO
              </span>
              <span className="badge-celestial" style={{ fontSize: '9px', padding: '2px 8px' }}>
                AI Creative Director
              </span>
            </div>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Create beyond the original.
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* AI Engine Status Badge */}
          <button
            onClick={() => setIsKeyModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: geminiActive ? 'rgba(78, 224, 216, 0.08)' : 'rgba(229, 193, 88, 0.06)',
              border: `1px solid ${geminiActive ? 'var(--border-cyan)' : 'var(--border-gold)'}`,
              borderRadius: 'var(--radius-full)',
              color: geminiActive ? 'var(--accent-cyan-light)' : 'var(--accent-gold-light)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all var(--transition-normal)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: geminiActive ? 'var(--accent-cyan)' : 'var(--accent-gold)',
                boxShadow: geminiActive ? '0 0 8px var(--accent-cyan)' : '0 0 8px var(--accent-gold)',
              }}
            />
            <span>{geminiActive ? 'Gemini 2.0 Live' : 'Intelligent Demo Mode'}</span>
            <Key size={13} style={{ opacity: 0.7, marginLeft: '2px' }} />
          </button>

          {/* New Design button if in studio */}
          {stage !== 'HOME' && (
            <button
              onClick={resetToHome}
              className="btn-celestial-secondary"
              style={{ padding: '7px 16px', fontSize: '13px' }}
            >
              <Plus size={15} />
              <span>New Design</span>
            </button>
          )}
        </div>
      </header>

      <ApiKeyModal isOpen={isKeyModalOpen} onClose={() => setIsKeyModalOpen(false)} />
    </>
  );
};
