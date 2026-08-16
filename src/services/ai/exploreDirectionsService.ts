import { DirectionConcept, ExploreDirectionsResult } from '../../types/exploreDirections';
import { VisualDNA } from '../../types/visualDNA';
import { generateDirectionalPreview } from '../image/imageTransform';
import { callGeminiMultimodal, cleanJsonText, isGeminiConfigured } from './geminiClient';

const DIRECTIONS_SYSTEM_PROMPT = `
You are ANGEL, an AI Creative Director exploring what a user's graphic design could become.
Brainstorm 4 to 5 bold, divergent creative evolution concepts (e.g. CINEMATIC, LUXURY, FUTURISTIC, EDITORIAL, VINTAGE, TECHNOLOGY).

Respond ONLY with a valid JSON object matching this schema:
{
  "creativeRationale": "1-2 sentences on why these creative branches elevate the original design.",
  "directions": [
    {
      "id": "dir-1",
      "category": "CINEMATIC" | "LUXURY" | "FUTURISTIC" | "EDITORIAL" | "VINTAGE" | "TECHNOLOGY",
      "title": "Evocative Title (e.g. 'Deep Obsidian Cinema')",
      "tagline": "Short one-liner summary of the shift",
      "explanation": "2-3 sentences detailing how to transform the lighting, subject, typography, and mood.",
      "paletteShift": ["#hex1", "#hex2", "#hex3", "#hex4"],
      "suggestedTypography": "Specific font pairing recommendation",
      "transformationPrompt": "Detailed visual description for generative rendering",
      "keyChanges": ["Key change 1", "Key change 2", "Key change 3"]
    }
  ]
}
`;

export async function exploreDirections(
  imageSrc: string,
  dna: VisualDNA
): Promise<ExploreDirectionsResult> {
  // Step 1: If Gemini API is configured, generate custom AI directions
  if (isGeminiConfigured()) {
    try {
      const prompt = `Based on this design (Archetype: ${dna.aestheticArchetype}, Mood: ${dna.mood}, Palette: ${dna.colorPalette.map(p => p.hex).join(', ')}), generate 4-5 divergent creative directions for what this design could become.`;
      const jsonText = await callGeminiMultimodal(prompt, imageSrc, DIRECTIONS_SYSTEM_PROMPT);
      const cleanedJsonText = cleanJsonText(jsonText);
      const parsed = JSON.parse(cleanedJsonText);

      // Generate client-side styled preview previews for each direction
      const directionsWithPreviews: DirectionConcept[] = await Promise.all(
        (parsed.directions || []).map(async (d: DirectionConcept, idx: number) => {
          const previewUrl = await generateDirectionalPreview(imageSrc, d.category || 'EDITORIAL');
          return {
            ...d,
            id: d.id || `dir-${idx + 1}`,
            previewImageUrl: previewUrl,
            isPrototypePreview: true,
          };
        })
      );

      return {
        originalArchetype: dna.aestheticArchetype,
        creativeRationale: parsed.creativeRationale || 'Exploring divergent aesthetic paradigms that amplify the core visual identity.',
        directions: directionsWithPreviews,
      };
    } catch (err) {
      console.warn('Gemini Explore Directions failed or key missing, falling back to dynamic heuristic generator:', err);
    }
  }

  // Step 2: Intelligent dynamic generator tailored to the design's Visual DNA
  const categories: DirectionConcept['category'][] = ['CINEMATIC', 'LUXURY', 'FUTURISTIC', 'EDITORIAL'];
  
  const generatedDirections: DirectionConcept[] = await Promise.all(
    categories.map(async (cat, index) => {
      const previewUrl = await generateDirectionalPreview(imageSrc, cat);
      return createDynamicConcept(cat, index + 1, dna, previewUrl);
    })
  );

  return {
    originalArchetype: dna.aestheticArchetype,
    creativeRationale: `Angel analyzed the ${dna.aestheticArchetype} foundation of your design and unlocked 4 divergent creative evolutionary paths.`,
    directions: generatedDirections,
  };
}

function createDynamicConcept(
  category: DirectionConcept['category'],
  index: number,
  dna: VisualDNA,
  previewUrl: string
): DirectionConcept {
  switch (category) {
    case 'CINEMATIC':
      return {
        id: `dir-${index}-cinematic`,
        category: 'CINEMATIC',
        title: 'Deep Obsidian Cinema',
        tagline: 'High-contrast anamorphic film visual with volumetric haze and 35mm grain.',
        explanation: `Deepen the background blacks into pure obsidian, introduce volumetric light rays radiating behind ${dna.keySubjects[0] || 'the main subject'}, and apply a subtle 35mm film grain.`,
        paletteShift: ['#050608', '#4ee0d8', '#ffb703', '#151928'],
        suggestedTypography: 'Cormorant Garamond Light + Condensed Grotesk',
        transformationPrompt: `Cinematic 35mm movie poster, volumetric anamorphic lighting, deep obsidian atmosphere, sharp title typography, award-winning visual.`,
        keyChanges: ['Volumetric atmosphere & light leaks', '35mm organic film grain', 'Anamorphic horizontal flares'],
        previewImageUrl: previewUrl,
        isPrototypePreview: true,
      };

    case 'LUXURY':
      return {
        id: `dir-${index}-luxury`,
        category: 'LUXURY',
        title: 'Haute Horlogerie & Gold',
        tagline: 'Elevate into a high-end luxury campaign with brushed metallic accents.',
        explanation: `Recast the focal contours in brushed champagne gold and platinum, framed by deep velvet tones and refined European serif typography with generous letter-spacing.`,
        paletteShift: ['#0c0f17', '#e5c158', '#f8ebd2', '#22293e'],
        suggestedTypography: 'Playfair Display + Didot',
        transformationPrompt: 'Haute luxury brand campaign, brushed champagne gold textures, velvet backdrop, ultra-refined craftsmanship aesthetic.',
        keyChanges: ['Brushed gold metallic speculars', 'Subtle micro-texture bevels', 'High-fashion editorial spacing'],
        previewImageUrl: previewUrl,
        isPrototypePreview: true,
      };

    case 'FUTURISTIC':
      return {
        id: `dir-${index}-futuristic`,
        category: 'FUTURISTIC',
        title: 'Quantum Hologram',
        tagline: 'Multi-spectral chromatic refraction and translucent 3D optical glass.',
        explanation: 'Infuse the composition with iridescent chromatic aberration, refractive frosted glass caustics, and floating holographic interface telemetry.',
        paletteShift: ['#080816', '#64fdf6', '#ff5ef7', '#ffe66d'],
        suggestedTypography: 'Space Grotesk + Neue Machina',
        transformationPrompt: 'Quantum computing holographic interface, iridescent glass refractions, ethereal neon violet and cyan dispersion, floating 3D geometry.',
        keyChanges: ['Multi-spectrum chromatic aberration', 'Refractive frosted glass layers', 'Ethereal cyan-violet dispersion'],
        previewImageUrl: previewUrl,
        isPrototypePreview: true,
      };

    case 'EDITORIAL':
    default:
      return {
        id: `dir-${index}-editorial`,
        category: 'EDITORIAL',
        title: 'Swiss Kinetic Grid',
        tagline: 'Heavy brutalist typography, asymmetric layout tension, and tactile print grain.',
        explanation: 'Break symmetry in favor of dynamic rhythm. Scale typography to bleed past the canvas margins, introduce strict modular Swiss grid alignment, and add warm matte newsprint texture.',
        paletteShift: ['#0d0d10', '#f4f4f8', '#ff3e30', '#252733'],
        suggestedTypography: 'Akzidenz-Grotesk / Helvetica Black + Mono',
        transformationPrompt: 'Swiss graphic design, brutalist poster exhibition, high tension asymmetric composition, textured matte newsprint.',
        keyChanges: ['Asymmetric layout tension', 'Accent vermilion red contrast', 'Edge-bleeding typography'],
        previewImageUrl: previewUrl,
        isPrototypePreview: true,
      };
  }
}
