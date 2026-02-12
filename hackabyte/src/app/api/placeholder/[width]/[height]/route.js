const MIN_DIMENSION = 16;
const MAX_DIMENSION = 2400;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

function clampDimension(rawValue, fallbackValue) {
  const parsedValue = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsedValue)) {
    return fallbackValue;
  }

  return Math.min(Math.max(parsedValue, MIN_DIMENSION), MAX_DIMENSION);
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function inferPlaceholderType(width, height) {
  const ratio = width / height;

  if (ratio >= 2.2 && height <= 120) {
    return {
      label: 'Partner Logo',
      startColor: '#111827',
      endColor: '#1F2937',
      accentColor: '#94A3B8',
      textColor: '#F8FAFC'
    };
  }

  if (Math.abs(ratio - 1) <= 0.25 && width <= 420) {
    return {
      label: 'Profile Photo',
      startColor: '#1E293B',
      endColor: '#334155',
      accentColor: '#F93236',
      textColor: '#F8FAFC'
    };
  }

  if (ratio >= 1.2 && ratio <= 1.8) {
    return {
      label: 'Event Image',
      startColor: '#1A1A1E',
      endColor: '#111827',
      accentColor: '#FF2247',
      textColor: '#F8FAFC'
    };
  }

  return {
    label: 'Image Placeholder',
    startColor: '#111827',
    endColor: '#1F2937',
    accentColor: '#FF2247',
    textColor: '#F8FAFC'
  };
}

function buildSvgMarkup(width, height, label, style) {
  const safeLabel = escapeXml(label.length > 30 ? `${label.slice(0, 27)}...` : label);
  const safeSubtitle = escapeXml(`${width} x ${height}`);
  const iconSize = Math.max(36, Math.floor(Math.min(width, height) * 0.22));
  const iconX = Math.floor((width - iconSize) / 2);
  const iconY = Math.floor((height - iconSize) / 2) - Math.floor(iconSize * 0.15);
  const headerFontSize = Math.max(12, Math.floor(Math.min(width, height) * 0.08));
  const subtitleFontSize = Math.max(10, Math.floor(headerFontSize * 0.55));
  const textY = iconY + iconSize + Math.floor(headerFontSize * 1.35);
  const subtitleY = textY + Math.floor(subtitleFontSize * 1.8);
  const cornerCircle = Math.max(20, Math.floor(Math.min(width, height) * 0.12));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${safeLabel}">
  <defs>
    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${style.startColor}" />
      <stop offset="100%" stop-color="${style.endColor}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#backgroundGradient)" />
  <circle cx="${Math.floor(width * 0.08)}" cy="${Math.floor(height * 0.16)}" r="${cornerCircle}" fill="${style.accentColor}" opacity="0.15" />
  <circle cx="${Math.floor(width * 0.92)}" cy="${Math.floor(height * 0.82)}" r="${cornerCircle}" fill="${style.accentColor}" opacity="0.15" />
  <g fill="none" stroke="${style.accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
    <rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${Math.floor(iconSize * 0.12)}" />
    <circle cx="${iconX + Math.floor(iconSize * 0.72)}" cy="${iconY + Math.floor(iconSize * 0.28)}" r="${Math.max(4, Math.floor(iconSize * 0.1))}" />
    <path d="M${iconX + Math.floor(iconSize * 0.18)} ${iconY + Math.floor(iconSize * 0.82)} L${iconX + Math.floor(iconSize * 0.44)} ${iconY + Math.floor(iconSize * 0.56)} L${iconX + Math.floor(iconSize * 0.62)} ${iconY + Math.floor(iconSize * 0.72)} L${iconX + Math.floor(iconSize * 0.84)} ${iconY + Math.floor(iconSize * 0.46)}" />
  </g>
  <text x="${Math.floor(width / 2)}" y="${textY}" fill="${style.textColor}" text-anchor="middle" font-size="${headerFontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="600">${safeLabel}</text>
  <text x="${Math.floor(width / 2)}" y="${subtitleY}" fill="${style.textColor}" text-anchor="middle" font-size="${subtitleFontSize}" font-family="Arial, Helvetica, sans-serif" opacity="0.8">${safeSubtitle}</text>
</svg>`;
}

export function GET(request, { params }) {
  const width = clampDimension(params?.width, DEFAULT_WIDTH);
  const height = clampDimension(params?.height, DEFAULT_HEIGHT);
  const inferredStyle = inferPlaceholderType(width, height);
  const requestedLabel = request.nextUrl.searchParams.get('label');
  const label = requestedLabel && requestedLabel.trim().length > 0 ? requestedLabel.trim() : inferredStyle.label;
  const svg = buildSvgMarkup(width, height, label, inferredStyle);

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
