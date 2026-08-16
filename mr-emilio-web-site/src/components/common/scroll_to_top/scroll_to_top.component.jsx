import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollWindowToTop = () => {
  const html = document.documentElement;
  const body = document.body;

  const previousHtmlScrollBehavior = html.style.scrollBehavior;
  const previousBodyScrollBehavior = body.style.scrollBehavior;

  /**
   * Route changes should always jump immediately to the top.
   *
   * This temporarily overrides the global:
   *
   * html {
   *   scroll-behavior: smooth;
   * }
   *
   * which we still want to preserve for normal in-page scrolling.
   */
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  html.scrollTop = 0;
  body.scrollTop = 0;

  html.style.scrollBehavior = previousHtmlScrollBehavior;
  body.style.scrollBehavior = previousBodyScrollBehavior;
};

const ScrollToTop = () => {
  const location = useLocation();

  /**
   * Disable the browser's automatic scroll-position restoration.
   *
   * Mobile Safari in particular may otherwise restore the previous
   * scroll position after React Router has already rendered the
   * destination route.
   */
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  /**
   * useLayoutEffect runs before the newly-rendered page is painted.
   */
  useLayoutEffect(() => {
    scrollWindowToTop();

    /**
     * iOS browsers can perform viewport/scroll restoration slightly
     * later than React's layout effect.
     *
     * Run the reset again after two animation frames so our route
     * position wins after Safari has completed that work.
     */
    let secondFrameId = null;

    const firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        scrollWindowToTop();
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);

      if (secondFrameId !== null) {
        window.cancelAnimationFrame(secondFrameId);
      }
    };
  }, [location.pathname, location.key]);

  return null;
};

export default ScrollToTop;
