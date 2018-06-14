import makeFixtureConfig from './makeFixtureConfig'
import responseFromFixture from './responseFromFixture'

const defaultMethod = 'GET'
const FIXTURE_PATH = `${__dirname}/fixtures`

const normalizePath = (url) => {
  let path = url
  if(path.startsWith('http')){
    let urlObj = new URL(url)
    path = urlObj.pathname
    if(urlObj.search) {
      path = path + urlObj.search
    }
  }
  return path
}

export const mockFetch = (config, fixture_path = null) => {
  const normalizedConfig = makeFixtureConfig(config)
  fetch = jest.fn()
  fetch.mockImplementation((url, options = {}) => {
    let method = options.method || defaultMethod
    let path = normalizePath(url)
    if(normalizedConfig[path] && normalizedConfig[path][method]) {
      const { statusCode, bodyFixture } = normalizedConfig[path][method]
      const fixtureFilePath = `${fixture_path || FIXTURE_PATH}/${bodyFixture}.json`
      return responseFromFixture(fixtureFilePath, statusCode)
    }
    else {
      return Promise.reject(`STUBBED URL NOT FOUND for ${path}`)
    }
  })
}

export default mockFetch