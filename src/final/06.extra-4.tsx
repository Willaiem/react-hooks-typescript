// useEffect: HTTP requests
// 💯 create an ErrorBoundary component
// http://localhost:3000/isolated/final/06.extra-4.js

import * as React from 'react'
import { FallbackProps } from 'react-error-boundary'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'
import { PokemonData } from '../types'

type EBProps = {
  FallbackComponent: React.ComponentType<Pick<FallbackProps, 'error'>>
  children: React.ReactNode
}

type EBState = { error: Error | null }

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

type ErrorFallbackProps = {
  error: Error
}

class ErrorBoundary extends React.Component<EBProps, EBState> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    const { error } = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
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
    // this will be handled by an error boundary
    throw error
  } else if (status === 'resolved') {
    const { pokemon } = state
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  )
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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
