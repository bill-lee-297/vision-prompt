import React, { useRef, useState, useEffect } from 'react';
import './ImageSlider.css';
import ColorThief from 'colorthief';
import useThemeStore from '@/store/useThemeStore';
import { brightenColor } from '@/utils/colors';
import gsap from 'gsap';
import data from '@/data/data.json';

const images = data.images;

const ImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const setBgColor = useThemeStore((state) => state.setBgColor);

  useEffect(() => {
    const container = document.querySelector('.image-slider-container');
    const img = container?.querySelector(`[data-idx="${current}"]`);
    const colorThief = new ColorThief();
    
    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(img as HTMLImageElement);
      const [newR, newG, newB] = brightenColor([r, g, b]);
      
      setBgColor(`rgb(${newR}, ${newG}, ${newB})`);
    };

    if(img instanceof HTMLImageElement) {
      handleLoad();
    } else {
      img?.addEventListener('load', handleLoad);
      return () => img?.removeEventListener('load', handleLoad);
    }
  }, [current, setBgColor]);

  const onClickNext = () => {
    const animating = document.querySelector('.image-slider img')?.getAttribute('data-animating');
    
    if (animating === 'true') return;

    const container = document.querySelector('.image-slider-container');
    const firstImage = container?.firstElementChild;
    const lastImage = container?.lastElementChild;

    document.querySelectorAll('.image-slider img').forEach(img => {
      img.setAttribute('data-animating', 'true');
    });

    gsap.to('.image-slider img', {
      duration: 1,
      left: '-=41vw',
      ease: 'power2.inOut',
      onComplete: () => {
        if (firstImage instanceof HTMLElement) {
          let lastImageLeft = lastImage instanceof HTMLElement ? lastImage.style.left : '0';
          lastImageLeft = lastImageLeft.replace('vw', '');
          lastImageLeft = parseInt(lastImageLeft)+41+'vw';
          firstImage.style.left = lastImageLeft;
          container?.appendChild(firstImage);
        }
        document.querySelectorAll('.image-slider img').forEach(img => {
          img.setAttribute('data-animating', 'false');
        });
      }
    });
    
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const onClickPrev = () => {
    const animating = document.querySelector('.image-slider img')?.getAttribute('data-animating');
    
    if (animating === 'true') return;

    const currentIndex = (current - 1 + images.length) % images.length;
    const container = document.querySelector('.image-slider-container');
    const lastImage = container?.lastElementChild;
    
    if (lastImage instanceof HTMLElement) {
      lastImage.style.left = '-51vw';
    }
    if(lastImage) {
      container?.insertBefore(lastImage, container.firstChild);
    }

    document.querySelectorAll('.image-slider img').forEach(img => {
      img.setAttribute('data-animating', 'true');
    });

    gsap.to('.image-slider img', {
      duration: 1,
      left: '+=41vw',
      ease: 'power2.inOut',
      onComplete: () => {
        document.querySelectorAll('.image-slider img').forEach(img => {
          img.setAttribute('data-animating', 'false');
        });
      }
    });
    setCurrent(currentIndex);
  };

  return (
    <div className="image-slider">
      <button onClick={onClickPrev} className="prev-button" aria-label="Previous image"></button>
      <div className="image-slider-container">
        {images.map((image, index) => (
          <img 
            data-idx={index}
            key={image.id}
            src={"/src/assets/"+image.file}
            alt="slider" 
            style={{
              left: index === 0 ? '-10vw' : (index*40-10)+index*1+ 'vw',
            }}
            onClick={() => setCurrent(image.id)}
          />
        ))}
      </div>
      <button onClick={onClickNext} className="next-button" aria-label="Next image"></button>
    </div>
  );
};

export default ImageSlider; 