import fs from 'fs'
import 'whatwg-fetch'

const responseFromFixture = (fixtureFile, statusCode = 200) => {
  try {
    const contents = fs.readFileSync(fixtureFile, 'utf8') 
    const response = new Response(contents, {
      status: statusCode,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' }
    })
    response.body = contents
    return Promise.resolve(response)
  }
  catch(err){
    return Promise.reject(err)
  }
}

export default responseFromFixture