import { VisualDNA } from './visualDNA';
import { ExploreDirectionsResult } from './exploreDirections';
import { AngelCritiqueReport } from './critique';

export type StudioStage = 'HOME' | 'ANALYZING' | 'VISUAL_DNA' | 'EXPLORE_DIRECTIONS' | 'CRITIQUE';

export interface ActiveDesign {
  id: string;
  name: string;
  url: string;
  width?: number;
  height?: number;
  file?: File;
  isSample?: boolean;
  uploadedAt: Date;
}

export interface SampleDesign {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  initialDNA: VisualDNA;
  initialDirections: ExploreDirectionsResult;
  initialCritique: AngelCritiqueReport;
}
