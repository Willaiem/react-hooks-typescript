// useEffect: persistent state
// 💯 lazy state initialization
// http://localhost:3000/isolated/final/02.extra-1.tsx

import * as React from 'react'

function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') ?? initialName,
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

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
  return <Greeting />
}

export default App
