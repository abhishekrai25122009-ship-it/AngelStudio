export interface ColorSwatch {
  hex: string;
  name: string;
  role: 'Dominant' | 'Secondary' | 'Accent' | 'Background' | 'Neutral';
  rgb?: string;
  harmony: string;
}

export interface VisualDNA {
  colorPalette: ColorSwatch[];
  mood: string;
  moodKeywords: string[];
  compositionRule: string;
  compositionDescription: string;
  typographyPersonality: string;
  visualDensity: 'Minimal' | 'Balanced' | 'Dense' | 'High Impact';
  densityScore: number; // 0 - 100
  aestheticArchetype: string;
  archetypeDescription: string;
  directorInterpretation: string; // The natural language narrative from Angel
  keySubjects: string[];
  contrastRatioAssessment: string;
}
