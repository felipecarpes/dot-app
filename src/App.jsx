import { useState } from 'react'

function App() {
  const [dots, setDots] = useState([])
  const [currentDots, setCurrentDots] = useState([])

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    }

    setDots((prevState) => [...prevState, newDot])
    setCurrentDots([])
  }  
  
  const handleUndo = (event) => {
    event.stopPropagation();

    if (dots.length === 0) return;

    const lastDot = dots[dots.length - 1]

    setCurrentDots((prevState) => [...prevState, lastDot])

    setDots((prevState) => {
      const dotsArr = [...prevState].slice(0, -1)
      return dotsArr;
    })
  }  
  
  const handleRedo = (event) => {
    event.stopPropagation();

    if (currentDots.length === 0) return;

    const lastDot = currentDots[currentDots.length - 1];

    setCurrentDots((prevState) => {
      const dotsArr = [...prevState].slice(0, -1);
      return dotsArr;
    })

    setDots((prevState) =>[...prevState, lastDot])
  }

  return (
    <div className="page" onClick={handleClick}>
      <div className="header">
        <button onClick={handleUndo}>
          Undo
        </button>
        <button onClick={handleRedo}>
          Redo
        </button>
      </div>
      {
        dots.map(({ clientY, clientX }, index) => <div className="dot" style={{ top: clientY, left: clientX }} key={index}></div>)
      }
    </div>
  )
}

export default App
