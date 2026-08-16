import React, { useRef, useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const HeroUpload: React.FC = () => {
  const { uploadDesign, uploadDesignFromUrl } = useStudio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const [showUrlField, setShowUrlField] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadDesign(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadDesign(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      uploadDesignFromUrl(urlInput.trim());
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', padding: '40px 20px 20px' }}>
      {/* Super-title Badge */}
      <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
        <span className="badge-celestial" style={{ padding: '6px 16px', fontSize: '12px' }}>
          <Sparkles size={14} color="var(--accent-gold)" />
          AI Creative Director
        </span>
      </div>

      {/* Main Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}
      >
        Create beyond the <span className="text-gold-gradient">original.</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '680px',
          margin: '0 auto 36px',
          fontWeight: 400,
        }}
      >
        Angel looks at your visual design, reveals its <strong>Visual DNA</strong>, critiques its optical balance, and shows you <strong>what it could become</strong>.
      </p>

      {/* Main Dropzone Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="glass-panel"
        style={{
          padding: '48px 32px',
          borderRadius: 'var(--radius-xl)',
          border: isDragging ? '2px dashed var(--accent-gold)' : '1px dashed var(--border-medium)',
          backgroundColor: isDragging ? 'rgba(229, 193, 88, 0.06)' : 'var(--bg-glass)',
          cursor: 'pointer',
          transition: 'all var(--transition-normal)',
          boxShadow: isDragging ? 'var(--glow-gold)' : 'var(--shadow-elevation)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Ambient celestial glow inside dropzone */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229, 193, 88, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(229, 193, 88, 0.15) 0%, rgba(78, 224, 216, 0.1) 100%)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'var(--accent-gold)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          }}
        >
          <Upload size={30} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
          Drop your design here or browse
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '24px' }}>
          Supports PNG, JPG, WebP, SVG posters, ads, brand visuals & UI layouts
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="btn-celestial-primary"
        >
          <ImageIcon size={18} />
          <span>Upload a design</span>
        </button>

        {/* Secondary URL toggle */}
        <div style={{ marginTop: '24px' }}>
          {!showUrlField ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowUrlField(true);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'underline',
              }}
            >
              <LinkIcon size={13} />
              <span>Or paste image URL</span>
            </button>
          ) : (
            <form
              onSubmit={handleUrlSubmit}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                gap: '8px',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/poster.jpg"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: 'rgba(7, 8, 13, 0.9)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn-celestial-secondary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <span>Load</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
