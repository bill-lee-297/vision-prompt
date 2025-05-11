import './App.css'
import ImageSlider from './components/ImageSlider';
import useThemeStore from './store/useThemeStore';

function App() {
  const bgColor = useThemeStore((state) => state.bgColor);

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <div className="header">
        <div className="title">
          <a href="/">Vision Prompt</a>
        </div>
      </div>
      <div className="contents">
        <ImageSlider />
      </div>
      <div className='menu'>
        <div className="info">
          <a href="/info">INFO</a>
        </div>
        <div className="list">
          <a href="/list">LIST</a>
        </div>
      </div>
    </div>
  )
}

export default App
