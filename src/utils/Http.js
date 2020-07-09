const baseUrl = 'https://beta.autobooking.com/api/test/v1/'

export default class Http {
  static async get(url) {
    try {
      return await request(url)
    } catch(e) {
      return { error: e.message }
    }
  }
}

async function request(url, method = 'GET', data) {
  const res = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {'Content-Type': 'application/json'},
    ...((method === 'POST' || method === 'PATCH') && { body: JSON.stringify(data) })
  })
  return res.json()
}
