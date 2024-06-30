// lib/imageConverter.ts

import sharp from "sharp";
import fs from "fs";
import path from "path"; // Import 'path' module explicitly

// Function to convert JPG to WebP
export async function convertJpgToWebp(inputPath: string, outputPath: string) {
  try {
    // Read image using sharp
    const inputBuffer = await sharp(inputPath).toBuffer();

    // Convert to WebP
    const outputBuffer = await sharp(inputBuffer).webp().toBuffer();

    // Save converted image
    fs.writeFileSync(outputPath, outputBuffer);

    return outputPath; // Return path of the converted image
  } catch (err) {
    console.error("Error converting image:", err);
    return null; // Handle error here if needed
  }
}
