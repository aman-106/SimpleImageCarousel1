import React from "react";
import "./SimpleCarousel.css";

const SimpleCarousel = ({ children }) => {
  return (
    <div className="carousel">
      <div className="carousel-inner">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="carousel-item">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
