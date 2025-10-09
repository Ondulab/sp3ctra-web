/**
 * Global animation utilities
 */

/**
 * Add fade-in animation to images marked with data-fade-in attribute.
 * - Cached images: appear immediately without animation
 * - Uncached images: smooth fade-in effect on load
 */
export function initFadeInImages() {
  const images = document.querySelectorAll("[data-fade-in]");

  images.forEach((img) => {
    if (img instanceof HTMLImageElement) {
      // If already loaded (cached), show immediately without animation
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.remove("opacity-0");
      } else {
        // Otherwise wait for load and animate
        img.addEventListener("load", () => {
          img.classList.add("animate-fade-in");
          img.classList.remove("opacity-0");
        });
      }
    }
  });
}
