// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/final/05.tsx

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

type TiltProps = { children: React.ReactNode }

type VanillaTiltElement = {
  vanillaTilt: VanillaTilt
}

function Tilt({ children }: TiltProps) {
  const tiltRef = React.useRef<HTMLDivElement & VanillaTiltElement>(null)

  React.useEffect(() => {
    if (!tiltRef.current) return

    const { current: tiltNode } = tiltRef
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    }
    VanillaTilt.init(tiltNode, vanillaTiltOptions)
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
