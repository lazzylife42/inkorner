// components/Carousel.js
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ colorTheme }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { id: 1, image: "/images/carousel/nouveaute.jpg", title: "Nouveautés" },
    { id: 2, image: "/images/carousel/promo.jpg", title: "Promotions" },
    { id: 3, image: "/images/carousel/start.jpg", title: "Start Tattoo" },
    { id: 4, image: "/images/carousel/actualite.jpg", title: "Actualités" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-white">
      <div className="overflow-hidden relative h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white transition-all duration-300 hover:scale-105">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: `${colorTheme.primary}80` }}
        >
          <ChevronLeft className="h-6 w-6" style={{ color: colorTheme.text }} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: `${colorTheme.primary}80` }}
        >
          <ChevronRight className="h-6 w-6" style={{ color: colorTheme.text }} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;