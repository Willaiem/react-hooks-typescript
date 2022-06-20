// useState: greeting
// 💯 accept an initialName
// http://localhost:3000/isolated/final/01.extra-1.tsx

import * as React from 'react'

type GreetingProps = {
  initialName?: string
}

function Greeting({ initialName = '' }: GreetingProps) {
  const [name, setName] = React.useState(initialName)
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Kody" />
}

export default App
