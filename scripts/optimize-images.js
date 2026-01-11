#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Resizes images according to the specifications in specs/004-image-optimization/image-resize-plan.md
 * Preserves original images in 'original/' subdirectories
 *
 * Usage:
 *   pnpm optimize-images [--dry-run]
 */

import { readdir, mkdir, copyFile, stat } from "fs/promises";
import { join, basename, dirname } from "path";
import sharp from "sharp";

const isDryRun = process.argv.includes("--dry-run");
const BASE_PATH = "src/assets/images";

// Image resize configurations based on usage patterns
const RESIZE_CONFIG = {
  // Full-width hero images
  "home/sp3ctra-hero-main.jpg": { width: 1280, quality: 85, category: "hero" },
  "site/sp3ctra-bg-spectrum.jpg": { width: 1280, quality: 85, category: "hero" },

  // Two-column grid images (FeatureSection MediaCards)
  "home/sp3ctra-live-concert.jpg": { width: 600, quality: 85, category: "grid" },
  "home/sp3ctra-live-visual.jpg": { width: 600, quality: 85, category: "grid" },
  "home/sp3ctra-product-device.jpg": { width: 600, quality: 85, category: "grid" },
  "home/sp3ctra-expo-photons.jpg": { width: 600, quality: 85, category: "grid" },
  "blog/2025-10-18-cite-des-sciences/sp3ctra-cite-exhibition-02.jpg": {
    width: 600,
    quality: 85,
    category: "grid",
  },

  // News card images (50/50 split)
  "blog/2025-10-18-cite-des-sciences/sp3ctra-cite-hero.jpg": {
    width: 640,
    quality: 85,
    category: "news",
  },

  // Logo (PNG with transparency)
  "site/sp3ctra-logo.png": { height: 48, quality: 100, category: "logo" },

  // OG/Social share image (exact dimensions)
  "site/sp3ctra-og.jpg": { width: 1200, height: 630, fit: "cover", quality: 85, category: "og" },

  // Blog gallery images (future use) - only process if user wants
  // 'blog/2025-10-18-cite-des-sciences/sp3ctra-cite-ateliers-01.jpg': { width: 800, quality: 85, category: 'gallery' },
  // 'blog/2025-10-18-cite-des-sciences/sp3ctra-cite-ateliers-02.jpg': { width: 800, quality: 85, category: 'gallery' },
  // ... add more as needed
};

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warning: (msg) => console.log(`⚠️  ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  dry: (msg) => console.log(`🔍 [DRY RUN] ${msg}`),
};

/**
 * Check if original already exists
 */
async function hasOriginal(imagePath) {
  const dir = dirname(imagePath);
  const file = basename(imagePath);
  const originalPath = join(dir, "original", file);

  try {
    await stat(originalPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Backup original image to 'original/' subdirectory
 */
async function backupOriginal(imagePath) {
  const dir = dirname(imagePath);
  const file = basename(imagePath);
  const originalDir = join(dir, "original");
  const originalPath = join(originalDir, file);

  // Check if original already exists
  if (await hasOriginal(imagePath)) {
    log.warning(`Original already exists: ${originalPath}`);
    return originalPath;
  }

  if (isDryRun) {
    log.dry(`Would create directory: ${originalDir}`);
    log.dry(`Would copy ${imagePath} → ${originalPath}`);
    return originalPath;
  }

  // Create original directory if it doesn't exist
  await mkdir(originalDir, { recursive: true });

  // Copy original file
  await copyFile(imagePath, originalPath);
  log.success(`Backed up: ${originalPath}`);

  return originalPath;
}

/**
 * Resize image according to configuration
 */
async function resizeImage(imagePath, config) {
  const { width, height, quality, fit = "inside" } = config;

  if (isDryRun) {
    const dims = width && height ? `${width}×${height}` : width ? `${width}w` : `${height}h`;
    log.dry(`Would resize ${imagePath} to ${dims} (quality: ${quality}%)`);
    return;
  }

  try {
    const image = sharp(imagePath);

    // Get original dimensions
    const metadata = await image.metadata();
    const originalSize = `${metadata.width}×${metadata.height}`;

    // Skip if already at target size
    if (width && !height && metadata.width <= width) {
      log.info(`Skipping ${imagePath} - already at or below target width (${originalSize})`);
      return;
    }
    if (height && !width && metadata.height <= height) {
      log.info(`Skipping ${imagePath} - already at or below target height (${originalSize})`);
      return;
    }

    // Configure resize options
    const resizeOptions = {};
    if (width) resizeOptions.width = width;
    if (height) resizeOptions.height = height;
    resizeOptions.fit = fit;
    resizeOptions.withoutEnlargement = true; // Don't upscale

    // Process image
    await image
      .resize(resizeOptions)
      .jpeg({ quality, mozjpeg: true })
      .png({ quality, compressionLevel: 9 })
      .toFile(imagePath + ".tmp");

    // Replace original with optimized version
    await copyFile(imagePath + ".tmp", imagePath);
    await stat(imagePath + ".tmp").then((stats) => stats.size);

    const newMetadata = await sharp(imagePath).metadata();
    const newSize = `${newMetadata.width}×${newMetadata.height}`;

    log.success(`Resized: ${imagePath} (${originalSize} → ${newSize})`);

    // Clean up temp file
    const fs = await import("fs");
    fs.unlinkSync(imagePath + ".tmp");
  } catch (error) {
    log.error(`Failed to resize ${imagePath}: ${error.message}`);
    throw error;
  }
}

/**
 * Process all configured images
 */
async function processImages() {
  log.info(`Starting image optimization ${isDryRun ? "(DRY RUN)" : ""}...\n`);

  const results = {
    processed: 0,
    skipped: 0,
    failed: 0,
  };

  for (const [relativePath, config] of Object.entries(RESIZE_CONFIG)) {
    const imagePath = join(BASE_PATH, relativePath);

    try {
      // Check if file exists
      await stat(imagePath);

      log.info(`Processing [${config.category}]: ${relativePath}`);

      // Backup original
      await backupOriginal(imagePath);

      // Resize image
      await resizeImage(imagePath, config);

      results.processed++;
      console.log(""); // Empty line for readability
    } catch (error) {
      if (error.code === "ENOENT") {
        log.warning(`File not found: ${imagePath}`);
        results.skipped++;
      } else {
        log.error(`Error processing ${relativePath}: ${error.message}`);
        results.failed++;
      }
      console.log(""); // Empty line for readability
    }
  }

  // Summary
  console.log("═".repeat(60));
  log.info("Summary:");
  log.success(`Processed: ${results.processed}`);
  if (results.skipped > 0) log.warning(`Skipped: ${results.skipped}`);
  if (results.failed > 0) log.error(`Failed: ${results.failed}`);
  console.log("═".repeat(60));

  if (isDryRun) {
    log.info("\nThis was a dry run. Run without --dry-run to apply changes.");
  } else {
    log.info('\nDone! Run "pnpm build" to regenerate AVIF/WebP versions.');
  }
}

// Run the script
processImages().catch((error) => {
  log.error(`Script failed: ${error.message}`);
  process.exit(1);
});
