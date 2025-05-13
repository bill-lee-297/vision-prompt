import React, { useRef, useLayoutEffect, useState } from 'react';
import './ImageSlider.css';
import ColorThief from 'colorthief';
import useThemeStore from '@/store/useThemeStore';
import { brightenColor } from '@/utils/colors';
import gsap from 'gsap';
import data from '@/data/data.json';

const images = data.images;

const ImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const setBgColor = useThemeStore((state) => state.setBgColor);

  useLayoutEffect(() => {
    // 정중앙 이미지 컬러 추출
    const img = imgRef.current;
    const colorThief = new ColorThief();
    
    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(img);
      const [newR, newG, newB] = brightenColor([r, g, b]);
      
      setBgColor(`rgb(${newR}, ${newG}, ${newB})`);
    };

    if(img?.complete) {
      handleLoad();
    } else {
      img?.addEventListener('load', handleLoad);
      return () => img?.removeEventListener('load', handleLoad);
    }
  }, [current, imgRef, setBgColor]);

  const onClickNext = () => {
    gsap.to('.image-slider img', {
      duration: 1,
      left: '-=41vw',
      ease: 'power2.inOut',
    });
    setCurrent((prev) => (prev + 1) % images.length);

    // TODO: 첫번째 이미지 맨 뒤로 복제

  };

  const onClickPrev = () => {
    gsap.to('.image-slider img', {
      duration: 1,
      left: '+=41vw',
      ease: 'power2.inOut',
    });
    setCurrent((prev) => (prev - 1 + images.length) % images.length);    

    // TODO: 마지막 이미지 맨 앞으로 복제
  };

  return (
    <div className="image-slider">
      <button onClick={onClickPrev} className="prev-button">Prev</button>
      <div className="image-slider-container">
        {images.map((image, index) => (
          <img 
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
      <button onClick={onClickNext} className="next-button">Next</button>
    </div>
  );
};

export default ImageSlider; 