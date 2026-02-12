export const PLACEHOLDER_IMAGES = Object.freeze({
  event: '/api/placeholder/600/400',
  eventHero: '/api/placeholder/800/600',
  profile: '/api/placeholder/300/300',
  avatar: '/api/placeholder/120/120',
  logo: '/api/placeholder/150/50'
});

export function resolveImageSrc(imageValue, fallback = PLACEHOLDER_IMAGES.event) {
  if (typeof imageValue !== 'string') {
    return fallback;
  }

  const normalized = imageValue.trim();
  return normalized.length > 0 ? normalized : fallback;
}
