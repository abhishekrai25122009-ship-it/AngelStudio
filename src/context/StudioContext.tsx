import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ActiveDesign, StudioStage } from '../types/studio';
import { VisualDNA } from '../types/visualDNA';
import { DirectionConcept, ExploreDirectionsResult } from '../types/exploreDirections';
import { AngelCritiqueReport } from '../types/critique';
import { SAMPLE_DESIGNS } from '../services/ai/sampleData';
import { analyzeVisualDNA } from '../services/ai/visualDNAService';
import { exploreDirections } from '../services/ai/exploreDirectionsService';
import { generateCritique } from '../services/ai/critiqueService';

interface StudioContextType {
  stage: StudioStage;
  activeDesign: ActiveDesign | null;
  visualDNA: VisualDNA | null;
  exploreDirectionsResult: ExploreDirectionsResult | null;
  selectedDirection: DirectionConcept | null;
  critiqueReport: AngelCritiqueReport | null;
  activePinId: string | null;
  hoveredPinId: string | null;
  isAnalyzing: boolean;
  analyzingStep: string;
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  setStage: (stage: StudioStage) => void;
  loadSample: (sampleId: string) => void;
  uploadDesign: (file: File) => void;
  uploadDesignFromUrl: (url: string, name?: string) => void;
  startAnalysis: () => Promise<void>;
  selectDirection: (direction: DirectionConcept) => void;
  setActivePinId: (id: string | null) => void;
  setHoveredPinId: (id: string | null) => void;
  resetToHome: () => void;
}

const StudioContext = createContext<StudioContextType | null>(null);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stage, setStage] = useState<StudioStage>('HOME');
  const [activeDesign, setActiveDesign] = useState<ActiveDesign | null>(null);
  const [visualDNA, setVisualDNA] = useState<VisualDNA | null>(null);
  const [exploreDirectionsResult, setExploreDirectionsResult] = useState<ExploreDirectionsResult | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<DirectionConcept | null>(null);
  const [critiqueReport, setCritiqueReport] = useState<AngelCritiqueReport | null>(null);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzingStep, setAnalyzingStep] = useState<string>('Initializing Angel Creative Director...');
  const [zoom, setZoom] = useState<number>(1);

  // Load a curated sample design
  const loadSample = useCallback((sampleId: string) => {
    const sample = SAMPLE_DESIGNS.find((s) => s.id === sampleId) || SAMPLE_DESIGNS[0];
    const design: ActiveDesign = {
      id: sample.id,
      name: sample.title,
      url: sample.thumbnail,
      isSample: true,
      uploadedAt: new Date(),
    };

    setActiveDesign(design);
    setVisualDNA(sample.initialDNA);
    setExploreDirectionsResult(sample.initialDirections);
    setSelectedDirection(null);
    setCritiqueReport(sample.initialCritique);
    setActivePinId(null);
    setHoveredPinId(null);
    setZoom(1);
    // Transition straight into Studio / Visual DNA preview
    setStage('VISUAL_DNA');
  }, []);

  // Upload user's custom design file
  const uploadDesign = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const design: ActiveDesign = {
        id: `upload-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        url: url,
        file: file,
        isSample: false,
        uploadedAt: new Date(),
      };
      setActiveDesign(design);
      setVisualDNA(null);
      setExploreDirectionsResult(null);
      setSelectedDirection(null);
      setCritiqueReport(null);
      setActivePinId(null);
      setHoveredPinId(null);
      setZoom(1);
      setStage('ANALYZING');
    };
    reader.readAsDataURL(file);
  }, []);

  // Upload user design from URL
  const uploadDesignFromUrl = useCallback((url: string, name: string = 'Uploaded Design') => {
    const design: ActiveDesign = {
      id: `url-${Date.now()}`,
      name: name,
      url: url,
      isSample: false,
      uploadedAt: new Date(),
    };
    setActiveDesign(design);
    setVisualDNA(null);
    setExploreDirectionsResult(null);
    setSelectedDirection(null);
    setCritiqueReport(null);
    setActivePinId(null);
    setHoveredPinId(null);
    setZoom(1);
    setStage('ANALYZING');
  }, []);

  // Start continuous AI analysis
  const startAnalysis = useCallback(async () => {
    if (!activeDesign) return;

    setIsAnalyzing(true);
    setStage('ANALYZING');

    try {
      setAnalyzingStep('Decoding Chromatic & Spatial Harmony...');
      await new Promise((r) => setTimeout(r, 600));

      setAnalyzingStep('Synthesizing Visual DNA & Creative Signature...');
      const dna = await analyzeVisualDNA(activeDesign.url);
      setVisualDNA(dna);
      await new Promise((r) => setTimeout(r, 600));

      setAnalyzingStep('Ideating Divergent Evolution Directions...');
      const directions = await exploreDirections(activeDesign.url, dna);
      setExploreDirectionsResult(directions);
      await new Promise((r) => setTimeout(r, 600));

      setAnalyzingStep('Formulating Angel Critique & Coordinate Pinning...');
      const critique = await generateCritique(activeDesign.url, dna);
      setCritiqueReport(critique);
      await new Promise((r) => setTimeout(r, 500));

      setIsAnalyzing(false);
      setStage('VISUAL_DNA');
    } catch (err) {
      console.error('Analysis error:', err);
      setIsAnalyzing(false);
      setStage('VISUAL_DNA');
    }
  }, [activeDesign]);

  // When active design changes in 'ANALYZING' stage, run analysis automatically
  useEffect(() => {
    if (stage === 'ANALYZING' && activeDesign && !visualDNA && !isAnalyzing) {
      startAnalysis();
    }
  }, [stage, activeDesign, visualDNA, isAnalyzing, startAnalysis]);

  // Select a creative evolution direction
  const selectDirection = useCallback((direction: DirectionConcept) => {
    setSelectedDirection(direction);
  }, []);

  // Reset to Home
  const resetToHome = useCallback(() => {
    setStage('HOME');
    setActiveDesign(null);
    setVisualDNA(null);
    setExploreDirectionsResult(null);
    setSelectedDirection(null);
    setCritiqueReport(null);
    setActivePinId(null);
    setHoveredPinId(null);
    setZoom(1);
  }, []);

  return (
    <StudioContext.Provider
      value={{
        stage,
        activeDesign,
        visualDNA,
        exploreDirectionsResult,
        selectedDirection,
        critiqueReport,
        activePinId,
        hoveredPinId,
        isAnalyzing,
        analyzingStep,
        zoom,
        setZoom,
        setStage,
        loadSample,
        uploadDesign,
        uploadDesignFromUrl,
        startAnalysis,
        selectDirection,
        setActivePinId,
        setHoveredPinId,
        resetToHome,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
