import React, { useState } from 'react';
import { Key, Sparkles, X, Check, ShieldCheck } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey, clearGeminiApiKey } from '../../services/ai/geminiClient';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKeyInput] = useState<string>(getGeminiApiKey() || '');
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      setGeminiApiKey(apiKey.trim());
    } else {
      clearGeminiApiKey();
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    clearGeminiApiKey();
    setApiKeyInput('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(7, 8, 13, 0.82)',
      backdropFilter: 'blur(16px)',
    }}>
      <div className="glass-panel" style={{
        width: '90%',
        maxWidth: '520px',
        padding: '32px',
        position: 'relative',
        border: '1px solid var(--border-gold)',
        boxShadow: 'var(--glow-gold)',
      }}>
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
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(229, 193, 88, 0.15)',
            border: '1px solid var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Angel AI Engine Configuration
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Optional Google Gemini 2.0 Flash / Pro Key
            </p>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
          Angel Studio works out of the box with an <strong>Intelligent Offline Demo Engine</strong>. To enable live multimodal AI visual comprehension directly with Google Gemini 2.0, enter your API key below.
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Gemini API Key
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                background: 'rgba(7, 8, 13, 0.8)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <Key size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-tertiary)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: 'var(--text-tertiary)', fontSize: '11px' }}>
            <ShieldCheck size={14} color="var(--accent-cyan)" />
            <span>Key is held in memory for this session only and never sent to any third-party server.</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {getGeminiApiKey() && (
            <button
              onClick={handleClear}
              className="btn-celestial-secondary"
              style={{ fontSize: '13px', padding: '8px 16px' }}
            >
              Clear Key
            </button>
          )}
          <button
            onClick={handleSave}
            className="btn-celestial-primary"
            style={{ fontSize: '13px', padding: '8px 22px' }}
          >
            {saved ? (
              <>
                <Check size={16} /> Saved!
              </>
            ) : (
              'Save & Connect'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
