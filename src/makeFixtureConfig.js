const defaultMethod = 'GET'
const defaultStatusCode = 200

const makeFixture = (bodyFixture, statusCode = defaultStatusCode) => {
  return {
    bodyFixture,
    statusCode
  }
}

const normalizeConfig = (config) => {
  if(typeof config === 'string') {
    return {
      [defaultMethod]: makeFixture(config)
    }
  }
  else if(typeof config === 'object') {
    let normalizedConfig = {}
    for(let method in config) {
      let statusCode = defaultStatusCode
      let fixtureFile = config[method]
      if(Array.isArray(config[method])) {
        statusCode = config[method][1]
        fixtureFile = config[method][0]
      }
      normalizedConfig[method] = makeFixture(fixtureFile, statusCode)
    }
    return normalizedConfig
  }
}

export const makeFixtureConfig = (map) => {
  let config = {}
  for(let path in map) {
    config[path] = normalizeConfig(map[path])
  }
  return config
}

export default makeFixtureConfig