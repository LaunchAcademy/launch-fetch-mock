import makeFixtureConfig from 'makeFixtureConfig'
describe('making a fixture config', () => {
  const widgetPath = '/api/v1/widget'
  const widgetFixtureFile = 'aResponse'
  const gearPath = '/api/v1/gears'
  const leverPath = '/api/v1/levers'
  const createGearFixtureFile = 'createGears'

  const config = {
    [widgetPath]: widgetFixtureFile,
    [gearPath]: { POST: 'createGears' },
    [leverPath]: { GET: ['leverFixtureFile', 404]},
    '/api/v1/user_authentications': { POST: 'studentAccountSuccess' },
  }

  it('normalizes a simple path to string', () => {
    expect(makeFixtureConfig(config)[widgetPath]['GET']).toEqual({
      statusCode: 200,
      bodyFixture: widgetFixtureFile
    })
  })

  it('normalizes a path to an object', () => {
    expect(makeFixtureConfig(config)[gearPath]['POST']).toEqual({
      statusCode: 200,
      bodyFixture: createGearFixtureFile
    })
  })

  it.only('sets a nondefault status code', () => {
    expect(makeFixtureConfig(config)[leverPath]['GET'].statusCode).toEqual(404)
  })
})