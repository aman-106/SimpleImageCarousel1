import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import "./Carousel.css"; // You can define your own CSS for styling

const Carousel = ({
  duration = 200,
  startIndex = 0,
  loop = false,
  rtl = false,
  onInit = () => {},
  onChange = () => {},
  auto = false,
  selector,
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (auto && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return loop
            ? nextIndex >= itemsRef.current.length
              ? 0
              : nextIndex
            : Math.min(nextIndex, itemsRef.current.length - 1);
        });
      }, duration);

      return () => clearInterval(interval);
    }
  }, [isPaused, duration, loop]);

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    onChange(currentIndex);
  }, [currentIndex, onChange]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      const newIndex = loop
        ? nextIndex < 0
          ? itemsRef.current.length - 1
          : nextIndex
        : Math.max(nextIndex, 0);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      const newIndex = loop
        ? nextIndex >= itemsRef.current.length
          ? 0
          : nextIndex
        : Math.min(nextIndex, itemsRef.current.length - 1);
      return newIndex;
    });
  };

  useLayoutEffect(() => {
    scrollToItem(currentIndex);
  }, [currentIndex]);

  const scrollToItem = (index) => {
    const selectedItem = itemsRef.current[index];
    if (selectedItem) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = selectedItem.offsetWidth;
      const scrollOffset = rtl ? containerWidth - itemWidth : 0;
      const scrollPosition = selectedItem.offsetLeft - scrollOffset;
      carouselRef.current.scrollLeft = scrollPosition;
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {React.Children.map(selector, (child, index) => (
          <div
            key={index}
            ref={(element) => (itemsRef.current[index] = element)}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            {child}
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={handlePrev}>
        Prev
      </button>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
      <div className="indicators">
        {React.Children.map(selector, (_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
