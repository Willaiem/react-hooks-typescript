// useRef and useEffect: DOM interaction
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/05-classes.tsx

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.

type TiltProps = {
  children: React.ReactNode
}

class Tilt extends React.Component<TiltProps> {
  // 🐨 You need to add additional type for tiltRef to use VanillaTilt's destroy method!
  // 💰 `& { vanillaTilt: VanillaTilt }` will do it!
  tiltRef = React.createRef<HTMLDivElement>()
  componentDidMount() {
    const tiltNode = this.tiltRef.current

    // 🐨 Check if tiltNode is null and return if so
    // 💰 (`if (!tiltNode) return` will do it!)

    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    }
    // 💣 Uncomment when you typed the ref correctly
    // VanillaTilt.init(tiltNode, vanillaTiltOptions)
  }
  componentWillUnmount() {
    // 🐨 Check if tiltNode.current is null here as well
    // 💰 (`if (!tiltNode.current) return` will do it!)

    // 💣 Uncomment when you checked the tiltNode correctly
    // this.tiltRef.current.vanillaTilt.destroy()
  }
  render() {
    return (
      <div ref={this.tiltRef} className="tilt-root">
        <div className="tilt-child">{this.props.children}</div>
      </div>
    )
  }
}
function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
