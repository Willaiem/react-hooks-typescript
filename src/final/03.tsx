// Lifting state
// http://localhost:3000/isolated/final/03.tsx

import * as React from 'react'

type NameProps = {
  name: string
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type FavoriteAnimalProps = {
  animal: string
  onAnimalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type DisplayProps = {
  name: string
  animal: string
}

function Name({ name, onNameChange }: NameProps) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
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

function Display({ name, animal }: DisplayProps) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App
