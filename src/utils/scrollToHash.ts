/**
 * Reliably scrolls to a hash anchor element, accounting for asynchronous
 * layout shifts, image loading, and Framer Motion mount states.
 */
export function scrollToHash(hash: string, isInstantOnMount: boolean = false): () => void {
  const targetId = hash.replace('#', '');
  if (!targetId) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return () => {};
  }

  const scroll = (behavior: ScrollBehavior) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior, block: 'start' });
      return true;
    }
    return false;
  };

  // Immediate attempt
  scroll(isInstantOnMount ? 'instant' : 'smooth');

  // Staggered retries to absorb font loads, Framer Motion animations, and layout reflow
  const timers = [
    setTimeout(() => scroll(isInstantOnMount ? 'instant' : 'smooth'), 50),
    setTimeout(() => scroll('smooth'), 150),
    setTimeout(() => scroll('smooth'), 350),
    setTimeout(() => scroll('smooth'), 700),
    setTimeout(() => scroll('smooth'), 1200),
  ];

  // Re-align whenever pending images finish loading
  const handleImageLoad = () => {
    scroll('smooth');
  };

  const images = Array.from(document.querySelectorAll('img'));
  images.forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', handleImageLoad, { once: true });
    }
  });

  return () => {
    timers.forEach(clearTimeout);
    images.forEach((img) => {
      img.removeEventListener('load', handleImageLoad);
    });
  };
}
