import React, { useState, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import ColorThief from 'colorthief';
import useThemeStore from '@/store/useThemeStore';
import { brightenColor } from '@/utils/colors';
import gsap from 'gsap';
import data from '@/data/data.json';

const images = data.images;

const imageWidth = 40;
const imageMargin = 1;
const imageLeft = 10;
const transitionLeft = imageWidth + imageMargin;

const getImageLeft = (index: number) => index === 0 ? `${-imageLeft}vw` : `${(index * imageWidth - imageLeft)+index*imageMargin}vw`;

const ImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const setBgColor = useThemeStore((state) => state.setBgColor);
  const navigate = useNavigate();

  const setAnimating = (value: boolean) => {
    containerRef.current?.querySelectorAll('img').forEach(img => {
      img.setAttribute('data-animating', String(value));
    });
  };

  useLayoutEffect(() => {
    const img = containerRef.current?.querySelector(`[data-idx="${current}"]`) as HTMLImageElement | null;

    if (!img) return;

    const colorThief = new ColorThief();

    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(img);
      const [newR, newG, newB] = brightenColor([r, g, b]);
      setBgColor(`rgb(${newR}, ${newG}, ${newB})`);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, [current, setBgColor]);

  const onClickNext = () => {
    if (containerRef.current?.querySelector('img')?.getAttribute('data-animating') === 'true') return;

    const container = containerRef.current;
    const firstImage = container?.firstElementChild;
    const lastImage = container?.lastElementChild;

    setAnimating(true);

    if(container) {
      gsap.to(container?.querySelectorAll('img'), {
        duration: 1,
        left: `-=${transitionLeft}vw`,
        ease: 'power2.inOut',
        onComplete: () => {
          if (firstImage instanceof HTMLElement && lastImage instanceof HTMLElement) {
            const lastLeft = parseInt(lastImage.style.left.replace('vw', ''));
            firstImage.style.left = `${lastLeft + imageWidth + imageMargin}vw`;
            container?.appendChild(firstImage);
          }
          setAnimating(false);
        }
      });
    }

    container?.querySelectorAll('img').forEach(img => {
      img.style.zIndex = '2';
    });


    setCurrent((prev) => (prev + 1) % images.length);
  };

  const onClickPrev = () => {
    if (containerRef.current?.querySelector('img')?.getAttribute('data-animating') === 'true') return;

    const container = containerRef.current;
    const currentIndex = (current - 1 + images.length) % images.length;
    const lastImage = container?.lastElementChild as HTMLElement | null;

    if (lastImage) {
      lastImage.style.left = `-${transitionLeft+imageLeft}vw`;
      container?.insertBefore(lastImage, container.firstChild);
    }

    setAnimating(true);

    if(container) {
      gsap.to(container?.querySelectorAll('img'), {
        duration: 1,
        left: `+=${transitionLeft}vw`,
        ease: 'power2.inOut',
        onComplete: () => setAnimating(false),
      });
    }

    container?.querySelectorAll('img').forEach(img => {
      img.style.zIndex = '2';
    });

    setCurrent(currentIndex);
  };

  const handleHover = () => {
    const img = containerRef.current?.querySelector(`[data-idx="${current}"]`) as HTMLImageElement | null;

    if (img) {
      gsap.to(img, {
        duration: 0.1,
        scale: 1.3,
        zIndex: 11,
        ease: "power4.out",
      })
    }
  };

  const handleLeaveHover = () => {
    const img = containerRef.current?.querySelector(`[data-idx="${current}"]`) as HTMLImageElement | null;

    if (img) {
      gsap.to(img, {
        duration: 0.2,
        scale: 1,
        ease: "power2.out",
      })
    }
  };

  const handleImageClick = (index: number) => {
    navigate(`/image/${index}`);
  };

  return (
    <div className={styles['image-slider']}>
      <button onClick={onClickPrev} className={styles['prev-button']} aria-label="Previous image"></button>
      <div className={styles['image-slider-container']} ref={containerRef}>
        {images.map((image, index) => (
          <img
            key={index}
            data-idx={index}
            src={`/src/assets/${image.file}`}
            alt="slider"
            style={{ left: getImageLeft(index) }}
            onClick={() => handleImageClick(index)}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleLeaveHover()}
          />
        ))}
      </div>
      <button onClick={onClickNext} className={styles['next-button']} aria-label="Next image"></button>
    </div>
  );
};

export default ImageSlider;