// useEffect: HTTP requests
// 💯 reset the error boundary
// http://localhost:3000/isolated/final/06.extra-7.js

import * as React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
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

type ErrorFallbackProps = FallbackProps

function PokemonInfo({ pokemonName }: PokemonInfoProps) {
  const [state, setState] = React.useState<PokemonInfoState>({
    status: pokemonName ? 'pending' : 'idle',
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
    // this will be handled by an error boundary
    throw error
  } else if (status === 'resolved') {
    const { pokemon } = state
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
