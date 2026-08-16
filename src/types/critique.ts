export type CritiquePillar =
  | 'Visual hierarchy'
  | 'Negative space'
  | 'Contrast'
  | 'Composition'
  | 'Readability'
  | 'Focal point'
  | 'Typography balance';

export interface CritiqueAnnotationPin {
  id: string;
  number: string; // e.g. "01"
  pillar: CritiquePillar;
  title: string;
  observation: string;
  recommendation: string;
  severity: 'high' | 'medium' | 'info';
  pinLocation: {
    x: number; // 0 - 100 percentage
    y: number; // 0 - 100 percentage
  };
  highlightBox?: {
    x: number; // 0 - 100 percentage
    y: number; // 0 - 100 percentage
    width: number; // 0 - 100 percentage
    height: number; // 0 - 100 percentage
  };
}

export interface AngelCritiqueReport {
  overallVerdict: string;
  directorScore: {
    hierarchy: number; // 0 - 100
    contrast: number; // 0 - 100
    composition: number; // 0 - 100
    balance: number; // 0 - 100
    overall: number; // 0 - 100
  };
  strengths: string[];
  annotations: CritiqueAnnotationPin[];
  summaryNote: string;
}
