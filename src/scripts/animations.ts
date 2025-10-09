/**
 * Global animation utilities
 */

/**
 * Add fade-in animation to images marked with data-fade-in attribute.
 * - Cached images: appear immediately without animation
 * - Uncached images: smooth fade-in effect on load
 * Optimized to minimize main-thread work
 */
export function initFadeInImages() {
  const images = document.querySelectorAll<HTMLImageElement>("[data-fade-in]");

  // Use requestAnimationFrame to avoid layout thrashing
  requestAnimationFrame(() => {
    images.forEach((img) => {
      // If already loaded (cached), show immediately without animation
      if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = "1";
      } else {
        // Otherwise wait for load and animate
        const handleLoad = () => {
          img.classList.add("animate-fade-in");
          img.style.opacity = "1";
          img.removeEventListener("load", handleLoad); // Clean up listener
        };
        img.addEventListener("load", handleLoad, { once: true, passive: true });
      }
    });
  });
}
