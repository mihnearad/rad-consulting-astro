import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const publicDir = './public';
const originalsDir = './public/originals';

// Images to convert (PNG and JPG files)
const imagesToConvert = [
  'logo_raddigitalsolutions.png',
  'Mihnea.JPG',
  'V1.png'
];

async function convertToWebP() {
  try {
    // Create originals directory if it doesn't exist
    await fs.mkdir(originalsDir, { recursive: true });
    console.log('✅ Created originals directory');

    for (const filename of imagesToConvert) {
      const inputPath = path.join(publicDir, filename);
      const originalBackupPath = path.join(originalsDir, filename);
      const outputFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPath = path.join(publicDir, outputFilename);

      try {
        // Check if file exists
        await fs.access(inputPath);

        // Copy original to backup folder
        await fs.copyFile(inputPath, originalBackupPath);
        console.log(`📁 Backed up: ${filename} → originals/${filename}`);

        // Convert to WebP
        await sharp(inputPath)
          .webp({ quality: 90 }) // High quality WebP
          .toFile(outputPath);

        // Get file sizes for comparison
        const originalStats = await fs.stat(inputPath);
        const webpStats = await fs.stat(outputPath);
        const savings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);

        console.log(`✅ Converted: ${filename} → ${outputFilename}`);
        console.log(`   Original: ${(originalStats.size / 1024).toFixed(1)} KB`);
        console.log(`   WebP: ${(webpStats.size / 1024).toFixed(1)} KB`);
        console.log(`   Savings: ${savings}% smaller\n`);

      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
      }
    }

    console.log('🎉 Image conversion complete!');
    console.log('\nNext steps:');
    console.log('1. Update image references in your code to use .webp files');
    console.log('2. Original files are backed up in /public/originals/');
    console.log('3. You can delete the original PNG/JPG files from /public/ if desired');

  } catch (error) {
    console.error('❌ Conversion failed:', error);
  }
}

convertToWebP();
