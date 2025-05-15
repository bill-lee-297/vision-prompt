import './App.css'
import { useLayoutEffect, useRef } from 'react';
import ImageSlider from './components/ImageSlider';
import useThemeStore from './store/useThemeStore';
import gsap from 'gsap';

function App() {
  const bgColor = useThemeStore((state) => state.bgColor);

  const titleRef = useRef<HTMLDivElement>(null);
  const menuInfoRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const textTl = gsap.timeline();

    textTl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power5.out",
    })
    textTl.to(menuInfoRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power5.out",
    }, "-=0.5")

    textTl.to(menuListRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power5.out",
    }, "<")
  }, []);

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <div className="header">
        <div className="title" ref={titleRef}>
          <a href="/">Vision Prompt</a>
        </div>
      </div>
      <div className="contents">
        <ImageSlider />
      </div>
      <div className='menu'>
        <div className="info" ref={menuInfoRef}>
          <a href="/info">INFO</a>
        </div>
        <div className="list" ref={menuListRef}>
          <a href="/list">LIST</a>
        </div>
      </div>
    </div>
  )
}

export default App
