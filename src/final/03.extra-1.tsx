// Lifting state
// 💯 colocating state
// http://localhost:3000/isolated/final/03.extra-1.tsx

import * as React from 'react'

type FavoriteAnimalProps = {
  animal: string
  onAnimalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type DisplayProps = {
  animal: string
}

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

function FavoriteAnimal({ animal, onAnimalChange }: FavoriteAnimalProps) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

function Display({ animal }: DisplayProps) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App
