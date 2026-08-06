import { useCallback, useEffect, useRef, useState } from "react";

export const useShopProductsCarousel = ({ productCount = 0 } = {}) => {
  const viewportRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const getScrollStep = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return 0;
    }

    const firstCard = viewport.querySelector("[data-product-card]");

    if (!firstCard) {
      return viewport.clientWidth;
    }

    const track = firstCard.parentElement;

    if (!track) {
      return firstCard.getBoundingClientRect().width;
    }

    const trackStyles = window.getComputedStyle(track);

    const gap =
      Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  }, []);

  const updateCarouselState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maximumScroll = viewport.scrollWidth - viewport.clientWidth;

    const scrollStep = getScrollStep();

    if (maximumScroll <= 1 || scrollStep <= 0) {
      setActiveIndex(0);
      setPageCount(1);

      return;
    }

    const calculatedPageCount = Math.max(
      1,
      Math.ceil(maximumScroll / scrollStep) + 1
    );

    const calculatedIndex = Math.min(
      calculatedPageCount - 1,
      Math.round(viewport.scrollLeft / scrollStep)
    );

    setPageCount(calculatedPageCount);
    setActiveIndex(calculatedIndex);
  }, [getScrollStep]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    let animationFrameId = null;

    const scheduleCarouselUpdate = () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(updateCarouselState);
    };

    viewport.addEventListener("scroll", scheduleCarouselUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleCarouselUpdate);

    scheduleCarouselUpdate();

    return () => {
      viewport.removeEventListener("scroll", scheduleCarouselUpdate);

      window.removeEventListener("resize", scheduleCarouselUpdate);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [productCount, updateCarouselState]);

  const scrollCarousel = useCallback(
    (direction) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const scrollStep = getScrollStep();

      viewport.scrollBy({
        left: direction === "next" ? scrollStep : -scrollStep,
        behavior: "smooth",
      });
    },
    [getScrollStep]
  );

  const scrollToPage = useCallback(
    (index) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      viewport.scrollTo({
        left: getScrollStep() * index,
        behavior: "smooth",
      });
    },
    [getScrollStep]
  );

  return {
    viewportRef,
    activeIndex,
    pageCount,
    scrollCarousel,
    scrollToPage,
  };
};
