// useEffect: HTTP requests
// 💯 store the state in an object
// http://localhost:3000/isolated/final/06.extra-3.js

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

type PokemonInfoState = {
  status: 'idle' | 'pending'
  pokemon?: null
  error?: null
} | {
  status: 'resolved',
  pokemon: PokemonData
} | {
  status: 'rejected',
  error: Error
}

function PokemonInfo({ pokemonName }: PokemonInfoProps) {
  const [state, setState] = React.useState<PokemonInfoState>({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const { status } = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({ status: 'pending' })
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({ status: 'resolved', pokemon })
      },
      error => {
        setState({ status: 'rejected', error })
      },
    )
  }, [pokemonName])

  if (status === 'idle') {
    return <>Submit a pokemon</>
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    const { error } = state

    return (
      <div>
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    const { pokemon } = state
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
