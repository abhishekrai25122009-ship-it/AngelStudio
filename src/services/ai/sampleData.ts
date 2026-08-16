import { SampleDesign } from '../../types/studio';

// High-fidelity programmatic SVG samples with rich typography and visuals
const createSvgDataUrl = (svgContent: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

// Sample 1: Cyber-Minimalist Poster "AURA 2026"
const auraPosterSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1400" width="1000" height="1400">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#4ee0d8" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="#192038" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#07080d" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf4d2"/>
      <stop offset="50%" stop-color="#e5c158"/>
      <stop offset="100%" stop-color="#91721e"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1000" height="1400" fill="#07080d"/>
  <rect width="1000" height="1400" fill="url(#grad1)"/>
  
  <!-- Subtle grid lines -->
  <line x1="80" y1="80" x2="920" y2="80" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <line x1="80" y1="80" x2="80" y2="1320" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <line x1="920" y1="80" x2="920" y2="1320" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <line x1="80" y1="1320" x2="920" y2="1320" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>

  <!-- Top Metadata -->
  <text x="110" y="130" fill="#4ee0d8" font-family="'Space Grotesk', sans-serif" font-size="14" letter-spacing="4">NO. 084 // TOKYO ARCHIVE</text>
  <text x="890" y="130" fill="#9da4b8" font-family="'Space Grotesk', sans-serif" font-size="14" letter-spacing="2" text-anchor="end">SYS.AUTONOMOUS.2026</text>

  <!-- Central Orb & Geometry -->
  <circle cx="500" cy="620" r="240" fill="none" stroke="rgba(78,224,216,0.3)" stroke-width="2"/>
  <circle cx="500" cy="620" r="190" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-dasharray="4 8"/>
  <circle cx="500" cy="620" r="140" fill="#0c0e17" stroke="#4ee0d8" stroke-width="3" filter="url(#glow)"/>
  
  <polygon points="500,480 620,690 380,690" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
  
  <!-- Headline -->
  <text x="500" y="990" fill="#ffffff" font-family="'Cinzel', serif" font-size="76" font-weight="700" letter-spacing="12" text-anchor="middle">A E T H E R</text>
  <text x="500" y="1040" fill="url(#goldGrad)" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="600" letter-spacing="10" text-anchor="middle">SYNTHETIC INTELLIGENCE FORUM</text>
  
  <text x="500" y="1120" fill="#9da4b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" letter-spacing="1" text-anchor="middle" max-width="600">Exploring post-human visual synthesis through harmonic algorithms.</text>
  
  <!-- Bottom info -->
  <line x1="110" y1="1240" x2="890" y2="1240" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <text x="110" y="1280" fill="#62697e" font-family="'Space Grotesk', sans-serif" font-size="13">OCT 24—28 // METROPOLIS</text>
  <text x="890" y="1280" fill="#4ee0d8" font-family="'Space Grotesk', sans-serif" font-size="13" letter-spacing="3" text-anchor="end">TICKETS AVAILABLE</text>
</svg>
`);

// Sample 2: Luxury Perfume Editorial "SOLÉIL NECTAR"
const luxuryEditorialSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1400" width="1000" height="1400">
  <defs>
    <linearGradient id="bgWarm" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#14110f"/>
      <stop offset="50%" stop-color="#211a14"/>
      <stop offset="100%" stop-color="#0d0a08"/>
    </linearGradient>
    <linearGradient id="champagneGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8e7"/>
      <stop offset="40%" stop-color="#e8ca74"/>
      <stop offset="100%" stop-color="#a88530"/>
    </linearGradient>
    <radialGradient id="perfumeLight" cx="50%" cy="52%" r="40%">
      <stop offset="0%" stop-color="#e8ca74" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#14110f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1000" height="1400" fill="url(#bgWarm)"/>
  <rect width="1000" height="1400" fill="url(#perfumeLight)"/>
  
  <!-- Subtle Editorial Frame -->
  <rect x="50" y="50" width="900" height="1300" fill="none" stroke="rgba(232, 202, 116, 0.2)" stroke-width="1"/>

  <!-- Top Masthead -->
  <text x="500" y="140" fill="url(#champagneGold)" font-family="'Cinzel', serif" font-size="22" letter-spacing="14" text-anchor="middle">MAISON DE LUMIÈRE</text>
  <line x1="420" y1="165" x2="580" y2="165" stroke="rgba(232,202,116,0.4)" stroke-width="1"/>

  <!-- Central Perfume Bottle Silhouette -->
  <g transform="translate(370, 360)">
    <!-- Cap -->
    <rect x="95" y="0" width="70" height="70" rx="4" fill="url(#champagneGold)"/>
    <rect x="110" y="70" width="40" height="25" fill="#59441a"/>
    <!-- Glass Body -->
    <rect x="20" y="95" width="220" height="340" rx="18" fill="rgba(255,255,255,0.06)" stroke="url(#champagneGold)" stroke-width="2.5"/>
    <rect x="40" y="115" width="180" height="300" rx="10" fill="rgba(232,202,116,0.12)"/>
    <!-- Label -->
    <rect x="55" y="210" width="150" height="110" fill="#0f0c0a" stroke="rgba(232,202,116,0.5)" stroke-width="1"/>
    <text x="130" y="255" fill="url(#champagneGold)" font-family="'Cinzel', serif" font-size="18" font-weight="700" letter-spacing="4" text-anchor="middle">SOLÉIL</text>
    <text x="130" y="285" fill="#a88530" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" letter-spacing="3" text-anchor="middle">EAU DE PARFUM</text>
  </g>

  <!-- Big Editorial Headline -->
  <text x="500" y="940" fill="#ffffff" font-family="'Playfair Display', serif" font-style="italic" font-size="70" text-anchor="middle">The Golden Essence</text>
  <text x="500" y="1000" fill="#b0a294" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" letter-spacing="6" text-anchor="middle">A VOYAGE THROUGH AMBER &amp; JASMINE</text>
  
  <text x="500" y="1080" fill="#8a7c70" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" text-anchor="middle" max-width="500">Crafted by master perfumers in Grasse with hand-selected rare botanicals.</text>

  <!-- Footer CTA -->
  <rect x="400" y="1150" width="200" height="46" rx="23" fill="none" stroke="url(#champagneGold)" stroke-width="1.5"/>
  <text x="500" y="1180" fill="url(#champagneGold)" font-family="'Cinzel', serif" font-size="12" letter-spacing="4" text-anchor="middle">DISCOVER NOW</text>
</svg>
`);

// Sample 3: Modern Architecture Exhibition "MONO FORM"
const architectureSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1400" width="1000" height="1400">
  <defs>
    <linearGradient id="monoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1d22"/>
      <stop offset="100%" stop-color="#0b0c0e"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="1400" fill="url(#monoGrad)"/>

  <!-- High-contrast Swiss Architecture Grid -->
  <rect x="100" y="100" width="800" height="600" fill="#e8eaed"/>
  
  <!-- Architectural shapes inside image box -->
  <polygon points="100,700 450,220 580,700" fill="#1b1c20"/>
  <polygon points="450,220 750,700 900,450 900,700" fill="#2d3038"/>
  <circle cx="280" cy="260" r="90" fill="#d93829"/>

  <!-- Swiss typography -->
  <text x="100" y="780" fill="#d93829" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" letter-spacing="4">01 / ARCHITECTURE &amp; VOID</text>
  
  <text x="100" y="880" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="82" font-weight="800" letter-spacing="-2">BRUTALISM</text>
  <text x="100" y="960" fill="#9da4b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="48" font-weight="300" letter-spacing="-1">RECONSTRUCTED</text>

  <line x1="100" y1="1030" x2="900" y2="1030" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>

  <text x="100" y="1100" fill="#cbd2e1" font-family="'Space Grotesk', sans-serif" font-size="16" line-height="1.6">
    <tspan x="100" dy="0">An international exhibition celebrating concrete,</tspan>
    <tspan x="100" dy="28">tension, and monolithic spatial composition.</tspan>
  </text>

  <text x="650" y="1100" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700">BASEL, CH</text>
  <text x="650" y="1135" fill="#9da4b8" font-family="'Space Grotesk', sans-serif" font-size="15">KUNSTHALLE MUSEUM</text>
</svg>
`);

// Sample 4: Organic Botanical "TERRA VERDE"
const organicSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1400" width="1000" height="1400">
  <defs>
    <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0c1813"/>
      <stop offset="50%" stop-color="#142820"/>
      <stop offset="100%" stop-color="#08100d"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="40%" r="45%">
      <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0c1813" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1000" height="1400" fill="url(#forestGrad)"/>
  <rect width="1000" height="1400" fill="url(#sunGlow)"/>

  <!-- Botanical Leaf Silhouettes -->
  <circle cx="500" cy="540" r="260" fill="none" stroke="#2d5a47" stroke-width="1.5"/>
  <path d="M500,280 C620,400 620,680 500,800 C380,680 380,400 500,280 Z" fill="#1b3d2f" stroke="#52b788" stroke-width="2"/>
  <path d="M500,320 L500,760" stroke="#74c69d" stroke-width="2"/>

  <!-- Brand Typography -->
  <text x="500" y="180" fill="#a7f3d0" font-family="'Space Grotesk', sans-serif" font-size="14" letter-spacing="8" text-anchor="middle">PURE CANOPY EXTRACTS</text>
  
  <text x="500" y="930" fill="#f0fdf4" font-family="'Playfair Display', serif" font-size="64" font-weight="600" letter-spacing="2" text-anchor="middle">TERRA BOTANICA</text>
  <text x="500" y="980" fill="#52b788" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" letter-spacing="6" text-anchor="middle">HOLISTIC ADAPTOGENIC TONIC</text>

  <text x="500" y="1060" fill="#93c5fd" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" text-anchor="middle" max-width="500">100% Wildcrafted Reishi, Ashwagandha &amp; Pine Pollen</text>

  <rect x="420" y="1140" width="160" height="42" rx="21" fill="#2d5a47" stroke="#74c69d" stroke-width="1"/>
  <text x="500" y="1166" fill="#ecfdf5" font-family="'Space Grotesk', sans-serif" font-size="12" letter-spacing="3" text-anchor="middle">BATCH 44</text>
</svg>
`);

export const SAMPLE_DESIGNS: SampleDesign[] = [
  {
    id: 'sample-aura',
    title: 'AURA 2026 Poster',
    category: 'Cyber-Minimalism',
    thumbnail: auraPosterSvg,
    description: 'A synthetic intelligence keynote poster combining celestial geometry with dark luminous minimalism.',
    initialDNA: {
      colorPalette: [
        { hex: '#07080d', name: 'Obsidian Void', role: 'Background', harmony: 'Base Dominant' },
        { hex: '#4ee0d8', name: 'Celestial Cyan', role: 'Accent', harmony: 'Luminous Primary' },
        { hex: '#e5c158', name: 'Radiant Gold', role: 'Secondary', harmony: 'Warm Complement' },
        { hex: '#192038', name: 'Deep Space Navy', role: 'Neutral', harmony: 'Sub-dominant Tone' },
      ],
      mood: 'Futuristic, Mysterious, Contemplative',
      moodKeywords: ['Cybernetic', 'Intellectual', 'Minimal', 'Transcendent'],
      compositionRule: 'Radial Symmetry with Strong Central Focus',
      compositionDescription: 'Concentrated focal mass in the upper center, balanced by clean typographic hierarchy anchored at the bottom.',
      typographyPersonality: 'Geometric Display Serif (Cinzel) paired with Technical Monospace (Space Grotesk)',
      visualDensity: 'Balanced',
      densityScore: 42,
      aestheticArchetype: 'Cyber-Minimalism',
      archetypeDescription: 'Combines the precision of technical diagrams with the emotional weight of dark room minimalism and ethereal neon accents.',
      directorInterpretation: 'This design speaks in whispered authority. The central orb and geometric talisman establish an enigmatic focal anchor, while the restrained cyan-gold contrast creates an aura of sophisticated technological craft. The typography communicates prestige without unnecessary ornamentation.',
      keySubjects: ['Central Sacred Geometry Orb', 'Keynote Title Block', 'Data Coordinates'],
      contrastRatioAssessment: 'Exceptional (14.2:1 text to background ratio)'
    },
    initialDirections: {
      originalArchetype: 'Cyber-Minimalism',
      creativeRationale: 'Because AURA has strong sacred geometry and high contrast, we can push it into luxury editorial, heavy brutalism, or vibrant holographic dimensions.',
      directions: [
        {
          id: 'dir-cinematic-noir',
          category: 'CINEMATIC',
          title: 'Deep Obsidian Cinema',
          tagline: 'High-contrast anamorphic film poster with volumetric haze and dramatic film grain.',
          explanation: 'Transform the technical geometry into an ominous cinematic monolith. Deepen the blacks, introduce subtle 35mm film grain, and cast horizontal anamorphic cyan lens flares across the center.',
          paletteShift: ['#040406', '#32d4cb', '#ffb703', '#111524'],
          suggestedTypography: 'Cormorant Garamond Light + Condensed Grotesk',
          transformationPrompt: 'Cinematic 35mm movie poster, volumetric cyan lighting, anamorphic lens flare, deep obsidian background, sharp editorial typography, award-winning film festival visual.',
          keyChanges: ['Volumetric atmosphere & fog', '35mm organic film grain', 'Anamorphic light leaks']
        },
        {
          id: 'dir-haute-luxe',
          category: 'LUXURY',
          title: 'Haute Horlogerie',
          tagline: 'Elevate into a Swiss luxury timepiece or high jewelry editorial showcase.',
          explanation: 'Shift from digital synthesis to tactile luxury. Recast the central rings in micro-etched brushed gold and platinum, surrounded by deep velvet navy and refined French serif typography.',
          paletteShift: ['#090c14', '#f1df99', '#c9a13b', '#182033'],
          suggestedTypography: 'Playfair Display + Didot',
          transformationPrompt: 'Haute luxury brand campaign, brushed champagne gold textures, deep navy velvet backdrop, ultra-refined Swiss craftsmanship aesthetic.',
          keyChanges: ['Brushed gold metallic speculars', 'Subtle micro-texture bevels', 'High-fashion editorial spacing']
        },
        {
          id: 'dir-holographic',
          category: 'FUTURISTIC',
          title: 'Quantum Hologram',
          tagline: 'Multi-spectral chromatic refraction and translucent 3D optical glass.',
          explanation: 'Infuse the flat geometry with iridescent chromatic aberration, refractive glass caustics, and floating holographic interface layers.',
          paletteShift: ['#0a0818', '#64fdf6', '#ff5ef7', '#ffe66d'],
          suggestedTypography: 'Space Grotesk + Neue Machina',
          transformationPrompt: 'Quantum computing holographic interface, iridescent glass refractions, ethereal neon violet and cyan dispersion, floating 3D geometry.',
          keyChanges: ['Multi-spectrum chromatic aberration', 'Refractive frosted glass', 'Ethereal purple-cyan dispersion']
        },
        {
          id: 'dir-swiss-brutalism',
          category: 'EDITORIAL',
          title: 'Swiss Kinetic Grid',
          tagline: 'Heavy brutalist typography, asymmetric grid anchors, and tactile paper grain.',
          explanation: 'Break the central symmetry in favor of tension and rhythm. Enlarge the title to bleed over the edges, offset the geometry by 15%, and introduce raw print textures.',
          paletteShift: ['#0d0d0f', '#f4f4f6', '#ff4338', '#2a2b33'],
          suggestedTypography: 'Akzidenz-Grotesk / Helvetica Black + Mono',
          transformationPrompt: 'Swiss graphic design, brutalist poster exhibition, high tension asymmetric composition, textured matte newsprint, international typographical style.',
          keyChanges: ['Asymmetric layout tension', 'Accent vermilion red contrast', 'Edge-bleeding typography']
        }
      ]
    },
    initialCritique: {
      overallVerdict: 'A commanding, cohesive composition with strong atmosphere. Minor adjustments to secondary text breathing room and bottom visual weight will achieve gallery perfection.',
      directorScore: {
        hierarchy: 92,
        contrast: 95,
        composition: 88,
        balance: 90,
        overall: 91
      },
      strengths: [
        'Mesmerizing central focal anchor with balanced cyan-gold aura.',
        'High contrast ensures immediate readability across devices.',
        'Sophisticated use of negative space creates a premium, contemplative tone.'
      ],
      summaryNote: 'Angel identified 3 precise micro-opportunities to balance tension and elevate typography.',
      annotations: [
        {
          id: 'ann-1',
          number: '01',
          pillar: 'Visual hierarchy',
          title: 'Subtitle competes with central geometric symbol',
          observation: 'The gold subtitle "SYNTHETIC INTELLIGENCE FORUM" is positioned very close to the apex of the triangle, creating a slight optical collision.',
          recommendation: 'Increase vertical padding between the geometric emblem and the title by 24px to let the talisman breathe.',
          severity: 'medium',
          pinLocation: { x: 50, y: 73 },
          highlightBox: { x: 22, y: 70, width: 56, height: 8 }
        },
        {
          id: 'ann-2',
          number: '02',
          pillar: 'Negative space',
          title: 'Lower-third information cluster feels slightly compressed',
          observation: 'The paragraph description and ticket status bar sit relatively close to the bottom border compared to the generous upper margins.',
          recommendation: 'Redistribute bottom margin from 60px to 90px, creating harmonious optical symmetry with the top header coordinates.',
          severity: 'info',
          pinLocation: { x: 50, y: 88 },
          highlightBox: { x: 10, y: 80, width: 80, height: 15 }
        },
        {
          id: 'ann-3',
          number: '03',
          pillar: 'Contrast',
          title: 'Top right metadata legibility on dark display',
          observation: 'The dark slate color (#9da4b8) on top metadata has lower luminance than the cyan left header, causing an unintentional visual tilt.',
          recommendation: 'Shift top-right text opacity from 60% to 80% or match cyan tone for balanced horizontal anchor points.',
          severity: 'info',
          pinLocation: { x: 86, y: 9.5 },
          highlightBox: { x: 68, y: 7, width: 25, height: 5 }
        }
      ]
    }
  },
  {
    id: 'sample-soleil',
    title: 'SOLÉIL Perfume Editorial',
    category: 'Haute Luxury',
    thumbnail: luxuryEditorialSvg,
    description: 'An amber and champagne gold fragrance poster with warm editorial atmosphere.',
    initialDNA: {
      colorPalette: [
        { hex: '#14110f', name: 'Warm Charcoal', role: 'Background', harmony: 'Warm Base' },
        { hex: '#e8ca74', name: 'Champagne Gold', role: 'Accent', harmony: 'Luminous Luxury' },
        { hex: '#fff8e7', name: 'Pearl Ivory', role: 'Secondary', harmony: 'High Light' },
        { hex: '#59441a', name: 'Deep Amber', role: 'Neutral', harmony: 'Shadow Resonance' },
      ],
      mood: 'Sensual, Opulent, Warm, Timeless',
      moodKeywords: ['Haute Couture', 'Fragrant', 'Refined', 'Intimate'],
      compositionRule: 'Golden Ratio Vertical Framing',
      compositionDescription: 'Linear bottle silhouette framed by subtle hairline boundaries, guiding the eye directly down to the italicized narrative.',
      typographyPersonality: 'French Classical Serif (Cinzel) + Expressive Calligraphic Italic (Playfair Display)',
      visualDensity: 'Minimal',
      densityScore: 35,
      aestheticArchetype: 'Haute Editorial',
      archetypeDescription: 'Employs generous golden-ratio negative space, warm glowing backlighting, and delicate metallic hairline details to evoke bespoke European luxury.',
      directorInterpretation: 'This design radiates understated luxury. The warm amber lighting and fine champagne gold strokes create a tactile sense of aroma and warmth. The typography is confident yet intimate, using subtle italic flourishes to evoke high fashion heritage.',
      keySubjects: ['Gold Perfume Bottle', 'Italic Script Headline', 'Maison Monogram'],
      contrastRatioAssessment: 'Warm High Dynamic Range (11.8:1 text contrast)'
    },
    initialDirections: {
      originalArchetype: 'Haute Editorial',
      creativeRationale: 'SOLÉIL has timeless warm tones that easily branch into vintage renaissance botanical, modern neon nightlife, or crisp organic minimalism.',
      directions: [
        {
          id: 'dir-vintage-renaissance',
          category: 'VINTAGE',
          title: 'Renaissance Botanical',
          tagline: 'Infuse antique copperplate engravings, gold leaf debossing, and parchment texture.',
          explanation: 'Introduce hand-drawn 18th-century botanical illustrations of jasmine petals and amber resin climbing softly behind the bottle.',
          paletteShift: ['#1c1712', '#d4af37', '#e2d4b7', '#3d2b1f'],
          suggestedTypography: 'Garamond Antiqua + Copperplate',
          transformationPrompt: 'Antique botanical perfume visual, hand-engraved gold leaf debossing, aged warm parchment background, exquisite 18th century alchemy aesthetic.',
          keyChanges: ['Engraved flora background', 'Gold leaf foil accents', 'Antiqued warm patina']
        },
        {
          id: 'dir-midnight-luxe',
          category: 'LUXURY',
          title: 'Midnight Noir Edition',
          tagline: 'Invert the warmth into obsidian velvet and icy platinum reflections.',
          explanation: 'A winter-night limited edition: deep black obsidian glass bottle with diamond-cut edges, midnight blue gradient, and cool silver-white typography.',
          paletteShift: ['#07080b', '#e2e8f0', '#94a3b8', '#1e293b'],
          suggestedTypography: 'Didot Bold + Bodoni',
          transformationPrompt: 'Midnight noir perfume campaign, deep obsidian black crystal bottle, icy platinum reflections, ultra-sleek moonlight backdrop.',
          keyChanges: ['Obsidian black bottle glass', 'Cool platinum highlights', 'Moonlit moody vignette']
        },
        {
          id: 'dir-modern-pop',
          category: 'EDITORIAL',
          title: 'Vibrant Solar Pop',
          tagline: 'High-energy citrus yellows, bold graphic typography, and sun-drenched vibrancy.',
          explanation: 'Transform the intimate nocturnal mood into an energetic Mediterranean summer campaign with vibrant ochre and bold modern type.',
          paletteShift: ['#fef3c7', '#d97706', '#b45309', '#1e293b'],
          suggestedTypography: 'Syne ExtraBold + Plus Jakarta Sans',
          transformationPrompt: 'Sun-drenched summer fragrance ad, vibrant Mediterranean solar hues, bold editorial fashion photography, crisp modern typography.',
          keyChanges: ['Solar Mediterranean warm wash', 'Contemporary high-contrast typography', 'Sunlight refraction shadows']
        }
      ]
    },
    initialCritique: {
      overallVerdict: 'Exquisitely balanced luxury editorial. Subtle adjustments to body copy line-height and bottle label contrast will enhance masterwork polish.',
      directorScore: {
        hierarchy: 94,
        contrast: 91,
        composition: 96,
        balance: 93,
        overall: 93
      },
      strengths: [
        'Superb negative space framing highlights the perfume silhouette instantly.',
        'Warm, alluring color palette creates immediate emotional desire.',
        'Playfair italic headline delivers exceptional fashion authority.'
      ],
      summaryNote: 'Angel noted 2 subtle refinements for optimal print and digital fidelity.',
      annotations: [
        {
          id: 'ann-soleil-1',
          number: '01',
          pillar: 'Contrast',
          title: 'Bottle label text contrast is subtly soft',
          observation: 'The gold "EAU DE PARFUM" text (#a88530) inside the mini label has low contrast against the dark brown label background.',
          recommendation: 'Brighten label subtitle to champagne pearl (#e8ca74) to maintain crisp legibility at small preview sizes.',
          severity: 'medium',
          pinLocation: { x: 50, y: 39 },
          highlightBox: { x: 42, y: 36, width: 16, height: 8 }
        },
        {
          id: 'ann-soleil-2',
          number: '02',
          pillar: 'Readability',
          title: 'Body description line width is slightly wide for single column',
          observation: 'The bottom descriptive sentence runs across 70% of the canvas width, which can feel un-anchored.',
          recommendation: 'Constrain body copy width to 480px and increase line-height to 1.7 for seamless editorial rhythm.',
          severity: 'info',
          pinLocation: { x: 50, y: 77 },
          highlightBox: { x: 25, y: 75, width: 50, height: 6 }
        }
      ]
    }
  },
  {
    id: 'sample-mono',
    title: 'MONO FORM Architecture',
    category: 'Swiss Brutalism',
    thumbnail: architectureSvg,
    description: 'A heavy Swiss brutalist exhibition poster exploring spatial concrete and high-contrast tension.',
    initialDNA: {
      colorPalette: [
        { hex: '#0b0c0e', name: 'Raw Basalt', role: 'Background', harmony: 'Deep Monolith' },
        { hex: '#e8eaed', name: 'Concrete White', role: 'Secondary', harmony: 'High Key Plate' },
        { hex: '#d93829', name: 'Vermilion Accent', role: 'Accent', harmony: 'International Red' },
        { hex: '#2d3038', name: 'Charcoal Shadow', role: 'Neutral', harmony: 'Structural Tone' },
      ],
      mood: 'Disciplined, Architectural, Bold, Uncompromising',
      moodKeywords: ['Brutalist', 'Constructivist', 'Structural', 'Monolithic'],
      compositionRule: 'Asymmetrical High-Tension Grid',
      compositionDescription: 'Heavy top image container anchoring 50% of the canvas, anchored by stark structural typography and a red focal counterweight.',
      typographyPersonality: 'Stark Swiss Sans-Serif (Plus Jakarta Sans 800) + Technical Monospace',
      visualDensity: 'High Impact',
      densityScore: 78,
      aestheticArchetype: 'Swiss Brutalism',
      archetypeDescription: 'Strict mathematical layout, raw structural geometric forms, heavy typography, and deliberate stark contrasts.',
      directorInterpretation: 'This design has immense raw structural power. The tension between the large white photographic block and the massive black headlines captures the tactile heaviness of brutalist architecture. The crimson vermilion circle acts as an indispensable optical anchor.',
      keySubjects: ['Architectural Facade Geometry', 'Vermilion Sun Counterweight', 'Brutalist Title'],
      contrastRatioAssessment: 'Maximum Contrast (18.5:1 text ratio)'
    },
    initialDirections: {
      originalArchetype: 'Swiss Brutalism',
      creativeRationale: 'MONO FORM has strong compositional discipline that translates into cyber-dystopian, minimal gallery, or motion kinetic identities.',
      directions: [
        {
          id: 'dir-cyber-brutalist',
          category: 'TECHNOLOGY',
          title: 'Cyber Dystopian Monolith',
          tagline: 'Translate the concrete forms into metallic dark server grids and electric green telemetry.',
          explanation: 'Invert the white photo block into dark obsidian titanium plates with glowing phosphor green wireframes and data feeds.',
          paletteShift: ['#050608', '#00ff88', '#e2e8f0', '#181b24'],
          suggestedTypography: 'Space Grotesk + JetBrains Mono',
          transformationPrompt: 'Dark cyberpunk brutalist UI poster, wireframe building telemetry, glowing green accents, heavy industrial typographic composition.',
          keyChanges: ['Phosphor wireframe overlays', 'Titanium brushed metal texture', 'Data telemetry columns']
        },
        {
          id: 'dir-monochrome-minimal',
          category: 'MINIMALIST',
          title: 'Gallery White Monolith',
          tagline: 'Invert into stark white museum catalog with deep debossed black typography.',
          explanation: 'High-end Tokyo museum aesthetic: crisp off-white background, delicate hairline grid, and monolithic deep black architectural silhouettes.',
          paletteShift: ['#fafafa', '#0a0a0c', '#66666e', '#d43b2c'],
          suggestedTypography: 'Helvetica Neue / Neue Haas Grotesk',
          transformationPrompt: 'Tokyo museum architecture catalog, clean white paper background, high contrast black brutalist silhouette, ultra-minimal Swiss layout.',
          keyChanges: ['Inverted gallery white surface', 'Deep debossed typography', 'Ultra-clean razor margins']
        }
      ]
    },
    initialCritique: {
      overallVerdict: 'High-impact, commanding execution with outstanding typographic weight.',
      directorScore: {
        hierarchy: 96,
        contrast: 98,
        composition: 91,
        balance: 89,
        overall: 93
      },
      strengths: [
        'Masterful typographic weight and scale contrast.',
        'Vermilion circle creates an instant visual anchor.',
        'High tension asymmetric grid commands immediate respect.'
      ],
      summaryNote: 'Angel identified 2 layout adjustments to refine bottom grid alignments.',
      annotations: [
        {
          id: 'ann-mono-1',
          number: '01',
          pillar: 'Composition',
          title: 'Bottom museum location column alignment',
          observation: 'The right-hand text "BASEL, CH" floats slightly off-axis from the right edge of the top image container.',
          recommendation: 'Align the right column exactly with the 900px vertical grid guide for mathematical precision.',
          severity: 'info',
          pinLocation: { x: 75, y: 79 },
          highlightBox: { x: 62, y: 77, width: 28, height: 7 }
        },
        {
          id: 'ann-mono-2',
          number: '02',
          pillar: 'Visual hierarchy',
          title: 'Horizontal separator line thickness',
          observation: 'The 2px horizontal white divider line has slightly too much visual weight compared to the subtle body text below.',
          recommendation: 'Reduce line opacity to 12% or reduce stroke to 1px to prevent it slicing the poster in half.',
          severity: 'medium',
          pinLocation: { x: 50, y: 73.5 },
          highlightBox: { x: 10, y: 72.5, width: 80, height: 3 }
        }
      ]
    }
  },
  {
    id: 'sample-terra',
    title: 'TERRA BOTANICA Tonic',
    category: 'Organic Editorial',
    thumbnail: organicSvg,
    description: 'A botanical adaptogenic drink visual combining deep canopy greens and warm apothecary elegance.',
    initialDNA: {
      colorPalette: [
        { hex: '#0c1813', name: 'Deep Forest', role: 'Background', harmony: 'Verdant Base' },
        { hex: '#52b788', name: 'Emerald Canopy', role: 'Accent', harmony: 'Vibrant Botanical' },
        { hex: '#f0fdf4', name: 'Mist Cream', role: 'Secondary', harmony: 'Crisp Light' },
        { hex: '#1b3d2f', name: 'Moss Shadow', role: 'Neutral', harmony: 'Deep Tone' },
      ],
      mood: 'Holistic, Grounding, Fresh, Apothecary',
      moodKeywords: ['Botanical', 'Adaptogenic', 'Canopy', 'Artisanal'],
      compositionRule: 'Centered Oval Focus with Circular Mandalas',
      compositionDescription: 'Concentric botanical rings holding the central leaf silhouette, crowned with balanced apothecary badge headers.',
      typographyPersonality: 'Playfair Display Serif + Geometric Clean Monospace',
      visualDensity: 'Balanced',
      densityScore: 50,
      aestheticArchetype: 'Organic Editorial',
      archetypeDescription: 'Combines the soothing warmth of natural greenery with scientific apothecary credibility and fine typography.',
      directorInterpretation: 'This design radiates natural vitality and calm. The rich forest gradient evokes a sunlit canopy, while the central leaf talisman anchors the adaptogenic philosophy. The typographic pairing bridges artisanal warmth with herbalist authority.',
      keySubjects: ['Botanical Leaf Talisman', 'Canopy Ring', 'Apothecary Title'],
      contrastRatioAssessment: 'Soothing Natural Contrast (13.1:1 text ratio)'
    },
    initialDirections: {
      originalArchetype: 'Organic Editorial',
      creativeRationale: 'TERRA BOTANICA easily evolves into modern wellness retail packaging, Japanese tea minimalism, or sunlit greenhouse editorial.',
      directions: [
        {
          id: 'dir-japanese-zen',
          category: 'MINIMALIST',
          title: 'Kyoto Zen Tea',
          tagline: 'Strip back to washi paper textures, bamboo green accents, and contemplative silence.',
          explanation: 'Transform into a serene Japanese matcha ritual visual with textured washi paper, asymmetric vertical kanji layout, and soft morning mist.',
          paletteShift: ['#141713', '#a3b18a', '#dad7cd', '#344e41'],
          suggestedTypography: 'Shippori Mincho + Plus Jakarta Sans',
          transformationPrompt: 'Kyoto Zen tea ceremony visual, handcrafted washi paper texture, soft morning mist, refined Japanese minimalist design.',
          keyChanges: ['Washi paper tactile grain', 'Asymmetric vertical flow', 'Muted bamboo sage palette']
        },
        {
          id: 'dir-apothecary-luxe',
          category: 'LUXURY',
          title: 'Forest Alchemy',
          tagline: 'Dark amber apothecary glass, embossed gold herbal seals, and dark velvet moss.',
          explanation: 'Elevate into an ultra-premium herbal elixir with embossed metallic gold emblems, hand-numbered vintage seals, and dark obsidian backdrops.',
          paletteShift: ['#0a110c', '#e5c158', '#40916c', '#1b4332'],
          suggestedTypography: 'Cinzel + Bodoni',
          transformationPrompt: 'Luxury herbal alchemy elixir ad, embossed gold seals, dark emerald velvet moss, mystical enchanted forest backdrop.',
          keyChanges: ['Embossed gold foil emblems', 'Deep emerald velvet lighting', 'Vintage herbalist seals']
        }
      ]
    },
    initialCritique: {
      overallVerdict: 'Delightfully calm and organic aesthetic with clear herbalist tone.',
      directorScore: {
        hierarchy: 91,
        contrast: 93,
        composition: 94,
        balance: 92,
        overall: 92
      },
      strengths: [
        'Deep forest green gradient creates immediate tranquility and trust.',
        'Harmonious botanical emblem serves as a memorable brand device.',
        'Clean typography feels authoritative without becoming clinical.'
      ],
      summaryNote: 'Angel noted 2 minor visual balance tweaks around the central talisman.',
      annotations: [
        {
          id: 'ann-terra-1',
          number: '01',
          pillar: 'Composition',
          title: 'Central leaf outline stroke weight balance',
          observation: 'The outer circular ring (1.5px) has a slightly softer presence compared to the prominent 2px leaf border, creating a faint visual wobble.',
          recommendation: 'Increase outer ring stroke to 2px or add a faint 10% emerald inner glow for balanced concentric depth.',
          severity: 'info',
          pinLocation: { x: 50, y: 38 },
          highlightBox: { x: 30, y: 22, width: 40, height: 35 }
        },
        {
          id: 'ann-terra-2',
          number: '02',
          pillar: 'Negative space',
          title: 'Bottom batch badge vertical separation',
          observation: 'The "BATCH 44" pill button is placed close to the bottom border with ample empty space above it.',
          recommendation: 'Shift the badge upward by 20px to sit proportionally between the subtitle and the canvas base.',
          severity: 'info',
          pinLocation: { x: 50, y: 83 },
          highlightBox: { x: 38, y: 80, width: 24, height: 6 }
        }
      ]
    }
  }
];
