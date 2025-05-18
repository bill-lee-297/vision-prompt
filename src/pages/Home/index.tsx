import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../../components/ImageSlider';
import useThemeStore from '../../store/useThemeStore';
import gsap from 'gsap';
import styles from './style.module.css';

const Home: React.FC = () => {
  const bgColor = useThemeStore(state => state.bgColor);
  const titleRef = useRef<HTMLDivElement>(null);
  const menuInfoRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const textTl = gsap.timeline();

    textTl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power5.out',
    });
    textTl.to(
      menuInfoRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power5.out',
      },
      '-=0.5'
    );

    textTl.to(
      menuListRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power5.out',
      },
      '<'
    );

    return () => {
      textTl.kill();
    };
  }, []);

  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      <div className={styles.header}>
        <div className={styles.title} ref={titleRef}>
          <Link to="/">Vision Prompt</Link>
        </div>
      </div>
      <div className={styles.contents}>
        <ImageSlider />
      </div>
      <div className={styles.menu}>
        <div className={styles.info} ref={menuInfoRef}>
          <Link to="/info">INFO</Link>
        </div>
        <div className={styles.list} ref={menuListRef}>
          <Link to="/list">LIST</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
