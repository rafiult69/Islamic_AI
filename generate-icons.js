const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Use existing image as source
async function generateIcon(size) {
  const inputPath = path.join(__dirname, 'Leonardo_Phoenix_10_A_stylized_lowresolution_pixel_art_logo_of_0.jpg');
  const outputPath = path.join(__dirname, 'public', `icon-${size}x${size}.png`);

  // Resize the image to required dimensions
  await sharp(inputPath)
    .resize(size, size)
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