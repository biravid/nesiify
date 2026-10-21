/**
 * convert-to-webp.js
 * Converts all JPG/PNG images in assets/images/ to WebP format (quality 82)
 * Keeps originals intact. Outputs .webp files in the same folder.
 */

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const INPUT_DIR  = path.join(__dirname, 'assets', 'images');
const QUALITY    = 82;   // 82% = excellent visual quality, ~70% smaller than JPG

const files = fs.readdirSync(INPUT_DIR).filter(f =>
  /\.(jpg|jpeg|png)$/i.test(f)
);

console.log(`\nConverting ${files.length} images to WebP (quality: ${QUALITY})...\n`);

Promise.all(
  files.map(async (file) => {
    const inputPath  = path.join(INPUT_DIR, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(INPUT_DIR, outputName);

    const inStat = fs.statSync(inputPath);

    await sharp(inputPath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const outStat = fs.statSync(outputPath);
    const savings = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);

    console.log(
      `  ✓  ${file.padEnd(30)} ${(inStat.size/1024).toFixed(0).padStart(5)} KB  →  ` +
      `${outputName.padEnd(33)} ${(outStat.size/1024).toFixed(0).padStart(5)} KB  ` +
      `(-${savings}%)`
    );
  })
).then(() => {
  console.log('\n✅  All images converted successfully!\n');
}).catch(err => {
  console.error('❌  Error during conversion:', err.message);
  process.exit(1);
});
