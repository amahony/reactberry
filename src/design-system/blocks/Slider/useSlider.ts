import { useState, useEffect } from "react";

export interface SliderConfig {
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  dots?: boolean;
  arrows?: boolean;
  spacing?: number;
  paddingX?: number;
  paddingY?: number;
  maxItemWidth?: number;
}

export interface ResponsiveConfig {
  breakpoint: number;
  settings: SliderConfig;
}

const useSlider = (
  data: any[],
  config: SliderConfig = {},
  responsiveConfig: ResponsiveConfig[] = [],
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [scrollTo, setScrollTo] = useState<boolean>(false);
  const [resized, setResized] = useState<boolean>(false);

  const [settings, setSettings] = useState({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    arrows: true,
    spacing: 0,
    paddingX: 0,
    paddingY: 0,
    maxItemWidth: 300,
    responsive: [],
    ...config,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / settings.slidesToShow),
  );

  const nextSlide = () => {
    if (!canGoNext) return;
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevSlide = () => {
    if (!canGoPrev) return;
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (settings.infinite) {
      setCanGoNext(true);
      setCanGoPrev(true);
    } else {
      setCanGoNext(currentPage < totalPages - 1);
      setCanGoPrev(currentPage > 0);
    }
  }, [
    settings.infinite,
    settings.slidesToShow,
    currentPage,
    data.length,
    totalPages,
  ]);

  const currentSlide = currentPage * settings.slidesToShow;
  const slideWidth = (100 * data.length) / settings.slidesToShow;

  const handleResize = () => {
    const width = window.innerWidth;
    if (responsiveConfig.length === 0) return;

    const responsiveSettings = responsiveConfig.find(
      (item) => item.breakpoint < width,
    );

    if (responsiveSettings) {
      setSettings({
        ...settings,
        ...responsiveSettings.settings,
      });
    }
  };

  useEffect(() => {
    if (!resized) {
      handleResize();
      setResized(true);
      return;
    }
  }, [resized]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return {
    currentSlide,
    currentPage,
    canGoNext,
    canGoPrev,
    scrollTo,
    settings,
    slideWidth,
    totalPages,
    setScrollTo,
    setCurrentPage,
    nextSlide,
    prevSlide,
  };
};

export default useSlider;
