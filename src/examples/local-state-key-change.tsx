// useEffect: persistent state
// flexible localStorage hook - changing the key in localStorage
// http://localhost:3000/isolated/examples/local-state-key-change.tsx

import React, { useState } from 'react'
import { useLocalStorageState } from '../utils'

type GreetingProps = {
  initialName?: string
}

function Greeting({ initialName = '' }: GreetingProps) {
  const [key, setKey] = useState('name')
  const [name, setName] = useLocalStorageState(key, initialName)

  function handleClick() {
    if (key === 'name') {
      setKey('firstName')
    } else if (key === 'firstName') {
      setKey('Name')
    } else {
      setKey('name')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Change key!
      </button>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

export default Greeting
