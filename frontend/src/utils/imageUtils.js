// Generate placeholder images with SVG
export const generatePlaceholderImage = (width = 400, height = 300, text = 'No Image') => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text x="50%" y="50%" font-size="24" fill="white" text-anchor="middle" dy=".3em" font-family="Arial">
        ${text}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Generate category-specific placeholder images
export const getCategoryImage = (category) => {
  const categoryEmojis = {
    'Electronics': '🖥️',
    'Books': '📚',
    'Furniture': '🛋️',
    'Sports': '⚽',
    'Tools': '🔧',
    'Garden': '🌱',
    'Appliances': '🍳',
    'Toys': '🎮',
    'Clothing': '👕',
    'Other': '📦'
  };
  
  const emoji = categoryEmojis[category] || '📦';
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.1;"/>
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.1;"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad)"/>
      <rect width="400" height="300" fill="white" opacity="0.9"/>
      <text x="200" y="140" font-size="80" text-anchor="middle" dy=".3em">${emoji}</text>
      <text x="200" y="200" font-size="20" fill="#667eea" text-anchor="middle" dy=".3em" font-weight="bold">${category}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Get a default resource image if none exists
export const getResourceImage = (imageUrl, category) => {
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  return getCategoryImage(category);
};
