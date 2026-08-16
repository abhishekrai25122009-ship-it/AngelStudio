// Generate live visual direction preview renderings from source image using Canvas 2D
export async function generateDirectionalPreview(
  imageSrc: string,
  category: 'CINEMATIC' | 'LUXURY' | 'FUTURISTIC' | 'EDITORIAL' | 'VINTAGE' | 'TECHNOLOGY' | 'ORGANIC' | 'MINIMALIST'
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(imageSrc);
        return;
      }

      // Maintain aspect ratio for clean preview thumbnail (width 600)
      const targetWidth = 600;
      const targetHeight = Math.round((img.naturalHeight / img.naturalWidth) * targetWidth) || 840;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw base image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Apply Direction-specific aesthetic filters and overlays
      switch (category) {
        case 'CINEMATIC': {
          // Anamorphic cyan/amber grading + 35mm film grain + dark letterbox
          ctx.fillStyle = 'rgba(7, 18, 30, 0.4)';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Horizontal anamorphic flare
          const flareGrad = ctx.createLinearGradient(0, targetHeight * 0.45, targetWidth, targetHeight * 0.45);
          flareGrad.addColorStop(0, 'rgba(78, 224, 216, 0)');
          flareGrad.addColorStop(0.5, 'rgba(78, 224, 216, 0.35)');
          flareGrad.addColorStop(1, 'rgba(78, 224, 216, 0)');
          ctx.fillStyle = flareGrad;
          ctx.fillRect(0, targetHeight * 0.44, targetWidth, 6);

          // Vignette
          const radGrad = ctx.createRadialGradient(
            targetWidth / 2, targetHeight / 2, targetWidth * 0.2,
            targetWidth / 2, targetHeight / 2, targetWidth * 0.75
          );
          radGrad.addColorStop(0, 'rgba(0,0,0,0)');
          radGrad.addColorStop(1, 'rgba(0,0,0,0.7)');
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          break;
        }

        case 'LUXURY': {
          // Warm gold duotone overlay + champagne highlights
          ctx.fillStyle = 'rgba(30, 20, 10, 0.35)';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          const goldGlow = ctx.createRadialGradient(
            targetWidth / 2, targetHeight * 0.4, 50,
            targetWidth / 2, targetHeight * 0.4, targetWidth * 0.6
          );
          goldGlow.addColorStop(0, 'rgba(243, 220, 138, 0.3)');
          goldGlow.addColorStop(1, 'rgba(20, 15, 8, 0.55)');
          ctx.fillStyle = goldGlow;
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Subtle hairline border
          ctx.strokeStyle = 'rgba(229, 193, 88, 0.4)';
          ctx.lineWidth = 2;
          ctx.strokeRect(16, 16, targetWidth - 32, targetHeight - 32);
          break;
        }

        case 'FUTURISTIC':
        case 'TECHNOLOGY': {
          // Holographic cyan/magenta tint + scanline grid
          ctx.fillStyle = 'rgba(10, 20, 38, 0.35)';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Subtle horizontal telemetry lines
          ctx.strokeStyle = 'rgba(78, 224, 216, 0.08)';
          ctx.lineWidth = 1;
          for (let y = 0; y < targetHeight; y += 12) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(targetWidth, y);
            ctx.stroke();
          }

          // Cyber accent corner markings
          ctx.strokeStyle = '#4ee0d8';
          ctx.lineWidth = 3;
          // Top-left
          ctx.beginPath();
          ctx.moveTo(20, 45); ctx.lineTo(20, 20); ctx.lineTo(45, 20); ctx.stroke();
          // Bottom-right
          ctx.beginPath();
          ctx.moveTo(targetWidth - 20, targetHeight - 45);
          ctx.lineTo(targetWidth - 20, targetHeight - 20);
          ctx.lineTo(targetWidth - 45, targetHeight - 20);
          ctx.stroke();
          break;
        }

        case 'EDITORIAL': {
          // High contrast Swiss tone + refined tint
          ctx.fillStyle = 'rgba(245, 245, 247, 0.06)';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Dark moody frame
          const radGrad = ctx.createRadialGradient(
            targetWidth / 2, targetHeight / 2, targetWidth * 0.3,
            targetWidth / 2, targetHeight / 2, targetWidth * 0.7
          );
          radGrad.addColorStop(0, 'rgba(0,0,0,0)');
          radGrad.addColorStop(1, 'rgba(0,0,0,0.5)');
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          break;
        }

        case 'VINTAGE': {
          // Antique sepia tone + warm grain
          ctx.fillStyle = 'rgba(120, 80, 40, 0.3)';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          const sepiaVignette = ctx.createRadialGradient(
            targetWidth / 2, targetHeight / 2, targetWidth * 0.25,
            targetWidth / 2, targetHeight / 2, targetWidth * 0.65
          );
          sepiaVignette.addColorStop(0, 'rgba(255, 240, 210, 0.1)');
          sepiaVignette.addColorStop(1, 'rgba(40, 20, 10, 0.6)');
          ctx.fillStyle = sepiaVignette;
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          break;
        }

        case 'MINIMALIST':
        default: {
          // Clean high-key monochrome
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          break;
        }
      }

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    img.onerror = () => {
      resolve(imageSrc);
    };
  });
}
