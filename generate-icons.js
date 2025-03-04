
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create a simple Islamic-themed icon
// Green background with white crescent moon and star
async function generateIcon(size) {
  const width = size;
  const height = size;
  
  // Create a green background
  const svgImage = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#0d5d36"/>
    <g transform="translate(${width/2}, ${height/2})">
      <!-- Crescent moon -->
      <path d="M ${-width/4} 0 A ${width/4} ${height/4} 0 1 0 0 ${-height/4} A ${width/3} ${height/3} 0 1 1 ${-width/4} 0" fill="white"/>
      <!-- Star -->
      <polygon points="0,${-height/8} ${width/32},${-height/10} ${width/20},${-height/20} ${width/32},${-height/30} 0,0 ${-width/32},${-height/30} ${-width/20},${-height/20} ${-width/32},${-height/10}" fill="white" transform="translate(${width/12}, ${-height/8})"/>
    </g>
  </svg>
  `;

  const outputPath = path.join(__dirname, 'public', `icon-${size}x${size}.png`);
  
  // Convert SVG to PNG
  await sharp(Buffer.from(svgImage))
    .png()
    .toFile(outputPath);
  
  console.log(`Generated ${outputPath}`);
}

// Generate icons for the required sizes
async function main() {
  await generateIcon(192);
  await generateIcon(512);
}

main().catch(err => console.error('Error generating icons:', err));
