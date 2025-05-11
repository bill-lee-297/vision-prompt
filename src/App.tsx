import './App.css'
import ImageSlider from './components/ImageSlider';

function App() {
  return (
    <div className="container">
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
