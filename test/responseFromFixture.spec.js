import fs from 'fs'
import responseFromFixture from 'responseFromFixture'

const FIXTURE_PATH = `${__dirname}/fixtures`

describe('creating a response from a fixture', () => {
  let promise
  beforeEach(() => {
    promise = responseFromFixture(`${FIXTURE_PATH}/response.json`)
  })
  it('creates a promise', () => {
    expect(promise).toBeInstanceOf(Promise)
  })

  it('includes a response in the fixture', (done) => {
    promise.then((response) => {
      expect(response).toBeInstanceOf(Response)
      response.json().then((json) => {
        expect(json.key).toBe('text')
        done()
      })
    })
  })
})