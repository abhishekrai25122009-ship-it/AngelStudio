// Gemini Multimodal Client with safe environment / session key handlin
import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-3.5-flash';

export interface GeminiConfig {
  apiKey?: string;
  model?: string;
}

// Get the effective API key (either from sessionStorage or Vite env)
export function getGeminiApiKey(): string | null {
  if (typeof window !== 'undefined') {
    const sessionKey = sessionStorage.getItem('angel_gemini_api_key');
    if (sessionKey && sessionKey.trim().length > 0) {
      return sessionKey.trim();
    }
  }
  return (import.meta as any).env?.VITE_GEMINI_API_KEY || null;
}

export function setGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('angel_gemini_api_key', key.trim());
  }
}

export function clearGeminiApiKey(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('angel_gemini_api_key');
  }
}

export function isGeminiConfigured(): boolean {
  const key = getGeminiApiKey();
  return !!key && key.length > 10;
}

// Convert image URL / DataURL / Blob into base64 payload for Gemini Multimodal
export async function imageToBase64(imageSrc: string): Promise<{ inlineData: { data: string; mimeType: string } }> {
  // If it's already a base64 data URL
  if (imageSrc.startsWith('data:')) {
    const [header, base64Data] = imageSrc.split(',');
    const mimeMatch = header.match(/data:(.*?);base64/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    // If it's SVG utf8 encoded, convert to canvas png base64 first
    if (imageSrc.includes('image/svg+xml')) {
      return rasterizeSvgToBase64(imageSrc);
    }

    return {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };
  }

  // If it's a URL, fetch it and convert to base64
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: blob.type || 'image/jpeg',
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function rasterizeSvgToBase64(svgDataUrl: string): Promise<{ inlineData: { data: string; mimeType: string } }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = svgDataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1120;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#07080d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const base64Data = dataUrl.split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: 'image/jpeg',
          },
        });
        return;
      }
      resolve({ inlineData: { data: '', mimeType: 'image/jpeg' } });
    };
    img.onerror = () => {
      resolve({ inlineData: { data: '', mimeType: 'image/jpeg' } });
    };
  });
}

// Direct multimodal call to Google Gemini 2.0 API with structured JSON output
export async function callGeminiMultimodal(
  prompt: string,
  imageSrc: string,
  systemInstruction?: string
): Promise<string> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const imagePart = await imageToBase64(imageSrc);

  const ai = new GoogleGenAI({
    apiKey,
  });

  const input = [
    {
      type: 'text' as const,
      text: prompt,
    },
    {
      type: 'image' as const,
      data: imagePart.inlineData.data,
      mime_type: imagePart.inlineData.mimeType,
    },
  ];

  const interaction = await ai.interactions.create({
    model: DEFAULT_MODEL,
    input,
    ...(systemInstruction
      ? {
        system_instruction: systemInstruction,
      }
      : {}),
  });

  const rawText = interaction.output_text;

  if (!rawText) {
    throw new Error('Empty response from Gemini API');
  }

  return rawText;
}

// Utility to clean Gemini JSON responses that may be wrapped in markdown codeblocks (```json ... ```)
export function cleanJsonText(rawText: string): string {
  let cleaned = rawText.trim();
  // Strip markdown code fences if present (e.g. ```json ... ``` or ``` ...)
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  // Find boundaries of JSON object or array if extra prose/tokens surround it
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  const startIdx =
    firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)
      ? firstBrace
      : firstBracket;

  if (startIdx !== -1) {
    const isObject = cleaned[startIdx] === '{';
    const lastIdx = isObject ? cleaned.lastIndexOf('}') : cleaned.lastIndexOf(']');
    if (lastIdx !== -1 && lastIdx >= startIdx) {
      return cleaned.slice(startIdx, lastIdx + 1);
    }
  }

  return cleaned;
}