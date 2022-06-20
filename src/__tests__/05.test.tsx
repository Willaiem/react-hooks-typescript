import * as React from 'react'
import { render } from '@testing-library/react'
import VanillaTilt from 'vanilla-tilt'
import App from '../final/05'
// import App from '../exercise/05'

function assertsElementIsVanillaTilt<E>(element: E): asserts element is E & { vanillaTilt: VanillaTilt } {
  expect(element).toHaveProperty('vanillaTilt')
}

test('calls VanillaTilt.init with the root node', async () => {
  const { container, unmount } = render(<App />)
  const tiltRoot = container.querySelector('.tilt-root')
  assertsElementIsVanillaTilt(tiltRoot)

  const destroy = jest.spyOn(tiltRoot.vanillaTilt, 'destroy')
  expect(destroy).toHaveBeenCalledTimes(0)

  unmount()

  expect(destroy).toHaveBeenCalledTimes(1)
})
