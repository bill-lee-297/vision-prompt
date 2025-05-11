import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './ImageSlider.css';
import ColorThief from 'colorthief';
import useThemeStore from '../store/useThemeStore';

const images = [
  '/src/assets/1.png',
  '/src/assets/2.png',
  '/src/assets/3.png',
  '/src/assets/4.png',
  '/src/assets/5.png',
];

const ImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(4);
  const imgRef = useRef<HTMLImageElement>(null);
  const setBgColor = useThemeStore((state) => state.setBgColor);

  useEffect(() => {
    const img = imgRef.current;
    const colorThief = new ColorThief();
    
    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(img);
      const rgb = `rgb(${r}, ${g}, ${b})`;
      setBgColor(rgb);
    };

    if(img?.complete) {
      handleLoad();
    } else {
      img?.addEventListener('load', handleLoad);
      return () => img?.removeEventListener('load', handleLoad);
    }
  }, [current, imgRef, setBgColor]);

  const onClickNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const onClickPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider">
      <img src={images[(current - 1 + images.length) % images.length]} alt={`slide-${images.length-current}`} className="slider-img" onClick={onClickPrev} />
      <img ref={imgRef} src={images[current]} alt={`slide-${current}`} className="slider-img" />
      <img src={images[(current + 1) % images.length]} alt={`slide-${current+1}`} className="slider-img" onClick={onClickNext} />
    </div>
  );
};

export default ImageSlider; 