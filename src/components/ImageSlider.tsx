import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './ImageSlider.css';

const images = [
  '/src/assets/1.png',
  '/src/assets/2.png',
  '/src/assets/3.png',
  '/src/assets/4.png',
  '/src/assets/5.png',
];

const ImageSlider: React.FC = () => {
  // const [current, setCurrent] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  // useEffect(() => {
  //   if (imgRef.current) {
  //     gsap.fromTo(
  //       imgRef.current,
  //       { opacity: 0, x: 100 },
  //       { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
  //     );
  //   }
  // }, [current]);

  // const nextImage = () => {
  //   setCurrent((prev) => (prev + 1) % images.length);
  // };
  // const prevImage = () => {
  //   setCurrent((prev) => (prev - 1 + images.length) % images.length);
  // };

  return (
    <div className="image-slider">
      <img ref={imgRef} src={images[0]} alt={`slide-0`} className="slider-img" />
      <img ref={imgRef} src={images[1]} alt={`slide-1`} className="slider-img" />
      <img ref={imgRef} src={images[2]} alt={`slide-2`} className="slider-img" />
    </div>
  );
};

export default ImageSlider; 