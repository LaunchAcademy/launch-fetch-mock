import mockFetch from 'mockFetch'
const FIXTURE_PATH = `${__dirname}/fixtures`
describe('mocking fetch', () => {
  it('returns a promise yielding a response if fixture is found', (done) => {
    mockFetch({
      '/api/v1/widget': 'response'
    }, FIXTURE_PATH)

    fetch('/api/v1/widget').then((response) => {
      return response.json()
    }).then((json) => {
      expect(json.key).toBe('text')
      done()
    })
    
  })

  it('returns a promise that throws when a fixture is not found', (done) => {
    fetch('/does/not/exist').catch((error) => {
      expect(error).toEqual(expect.stringMatching("STUBBED URL NOT FOUND"))
      done()
    })
  })
})