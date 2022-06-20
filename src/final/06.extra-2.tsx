// useEffect: HTTP requests
// 💯 use a status
// http://localhost:3000/isolated/final/06.extra-2.tsx

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'
import { PokemonData } from '../types'

type PokemonInfoProps = {
  pokemonName: string
}

type LoadingStatus = 'idle' | 'pending' | 'resolved' | 'rejected'

function PokemonInfo({ pokemonName }: PokemonInfoProps) {
  const [status, setStatus] = React.useState<LoadingStatus>('idle')
  const [pokemon, setPokemon] = React.useState<PokemonData | null>(null)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setStatus('pending')
    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemon(pokemon)
        setStatus('resolved')
      },
      error => {
        setError(error)
        setStatus('rejected')
      },
    )
  }, [pokemonName])

  if (status === 'idle') {
    return <>Submit a pokemon</>
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (error && status === 'rejected') {
    return (
      <div>
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    )
  } else if (pokemon && status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
