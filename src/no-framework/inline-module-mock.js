/**
 * Task: refactor the code to mock the entire module.
 * --verbose=false
 * Execute: Use `npx jest --watch src/no-framework/inline-module-mock.js` to watch the test
 */

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}

const utilisPath = require.resolve('../utils')
console.log(require.cache[utilisPath])


require.cache[utilisPath] = {
  id: utilisPath,
  filename: utilisPath,
  loaded: true,
  exports: {
    getWinner: fn((p1,p2) => p1)
  }
}
console.log(require.cache[utilisPath])

const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')


const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler'],
])

// cleanup
delete require.cache[utilisPath]

/**
 * Hints:
 * - https://nodejs.org/api/modules.html#modules_caching
 *
 * Checkout master branch to see the answer.
 */
