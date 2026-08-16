import React from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Header } from './components/layout/Header';
import { HeroUpload } from './components/home/HeroUpload';
import { SampleGallery } from './components/home/SampleGallery';
import { AnalyzingView } from './components/home/AnalyzingView';
import { StudioLayout } from './components/studio/StudioLayout';

const AppContent: React.FC = () => {
  const { stage } = useStudio();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {stage === 'HOME' && (
          <>
            <HeroUpload />
            <SampleGallery />
          </>
        )}

        {stage === 'ANALYZING' && <AnalyzingView />}

        {(stage === 'VISUAL_DNA' || stage === 'EXPLORE_DIRECTIONS' || stage === 'CRITIQUE') && (
          <StudioLayout />
        )}
      </main>
    </div>
  );
};

export function App() {
  return (
    <StudioProvider>
      <AppContent />
    </StudioProvider>
  );
}

export default App;
