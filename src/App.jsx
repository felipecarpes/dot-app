import { useState } from 'react'

function App() {
  const [dots, setDots] = useState([])
  const [currentDots, setCurrentDots] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  const generateShape = (event) => {
    event.stopPropagation()
    if (dots.length < 3) {
      alert('Add at least 3 dots to generate a shape!')
      return
    }
    setIsConnected(!isConnected)
  }

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    }

    setDots((prevState) => [...prevState, newDot])
    setCurrentDots([])
    setIsConnected(false)
  }  
  
  const handleUndo = (event) => {
    event.stopPropagation()

    if (dots.length === 0) return

    const lastDot = dots[dots.length - 1]
    setCurrentDots((prevState) => [...prevState, lastDot])
    setDots((prevState) => {
      const dotsArr = [...prevState].slice(0, -1)
      return dotsArr
    })
    setIsConnected(false)
  }  
  
  const handleRedo = (event) => {
    event.stopPropagation()

    if (currentDots.length === 0) return

    const lastDot = currentDots[currentDots.length - 1]
    setCurrentDots((prevState) => {
      const dotsArr = [...prevState].slice(0, -1)
      return dotsArr
    })
    setDots((prevState) =>[...prevState, lastDot])
    setIsConnected(false)
  }

  const handleClear = (event) => {
    event.stopPropagation()
    setDots([])
    setCurrentDots([])
    setIsConnected(false)
  }

  const renderLines = () => {
    if (!isConnected || dots.length < 2) return null;

    const pathData = dots.reduce((path, dot, index) => {
      if (index === 0) return `M ${dot.clientX} ${dot.clientY}`;
      return `${path} L ${dot.clientX} ${dot.clientY}`;
    }, '');

    // Fechar o caminho conectando o último ponto ao primeiro
    const firstDot = dots[0];
    const closePath = ` L ${firstDot.clientX} ${firstDot.clientY}`;

    return (
      <svg className="shape-lines">
        <path
          d={pathData + closePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#ff8787" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">
          <span className="title-dot">dot</span>
          <span className="title-app">app</span>
        </h1>
        <div className="buttons-container">
          <button onClick={handleUndo}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 14L4 9l5-5"/>
              <path d="M4 9h12c4 0 6 2 6 6v2"/>
            </svg>
            Undo
          </button>
          <button onClick={handleRedo}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14l5-5-5-5"/>
              <path d="M20 9H8c-4 0-6 2-6 6v2"/>
            </svg>
            Redo
          </button>
          <button onClick={generateShape} disabled={dots.length < 3}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            {isConnected ? 'Hide Shape' : 'Connect Dots'}
          </button>
          <button onClick={handleClear}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Clear
          </button>
        </div>
      </div>
      <div className="dots-container" onClick={handleClick}>
        {renderLines()}
        {dots.map(({ clientY, clientX }, index) => (
          <div 
            className="dot" 
            style={{ top: clientY, left: clientX }} 
            key={index}
          />
        ))}
      </div>
      <div className="footer">
        Click anywhere to create dots • Use undo/redo to control your creation • Connect dots to create shapes
      </div>
    </div>
  )
}

export default App
