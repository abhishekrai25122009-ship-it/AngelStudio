export interface DirectionConcept {
  id: string;
  category: 'CINEMATIC' | 'LUXURY' | 'FUTURISTIC' | 'EDITORIAL' | 'VINTAGE' | 'TECHNOLOGY' | 'ORGANIC' | 'MINIMALIST';
  title: string;
  tagline: string;
  explanation: string;
  paletteShift: string[]; // 3-4 hex codes
  suggestedTypography: string;
  previewImageUrl?: string;
  transformationPrompt: string;
  keyChanges: string[];
  isPrototypePreview?: boolean;
}

export interface ExploreDirectionsResult {
  sourceDesignId?: string;
  originalArchetype: string;
  directions: DirectionConcept[];
  creativeRationale: string;
}
