import * as React from 'react'
import { alfredTip } from '@kentcdodds/react-workshop-app/test-utils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/06'
// import App from '../exercise/06'

let windowFetchSpy: jest.SpyInstance<ReturnType<typeof window['fetch']>, Parameters<typeof window['fetch']>>

beforeEach(() => {
  windowFetchSpy = jest.spyOn(window, 'fetch')
})
afterEach(() => {
  windowFetchSpy.mockRestore()
})

test('displays the pokemon', async () => {
  render(<App />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  await userEvent.type(input, 'pikachu')
  await userEvent.click(submit)

  await screen.findByRole('heading', { name: /pikachu/i })

  // verify that a request is made when props change
  await userEvent.clear(input)
  await userEvent.type(input, 'ditto')
  await userEvent.click(submit)

  await screen.findByRole('heading', { name: /ditto/i })

  // verify that when props remain the same a request is not made
  windowFetchSpy.mockClear()
  await userEvent.click(submit)

  await screen.findByRole('heading', { name: /ditto/i })

  alfredTip(
    () => expect(window.fetch).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect.',
  )
})
