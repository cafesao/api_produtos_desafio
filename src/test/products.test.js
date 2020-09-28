const axios = require('axios').default

const url = 'http://54.232.45.139:3000/v1/products'
const body = [
  {
    id: 123,
    name: 'carlos',
  },
]

describe('Testando as funcionalidades da API', () => {
  test('Deve retornar código 400 quando o body esta incorreto', async () => {
    try {
      await axios.post(url, [{}])
    } catch (error) {
      const status = error.response.status
      expect(status).toEqual(400)
    }
  })
  test('Deve retornar código 200 quando o body esta correto e não foi enviado a 10 minutos atrás', async () => {
    const dataAxios = await axios.post(url, body)
    expect(dataAxios.status).toEqual(200)
  })
  test('Deve retornar código 403 quando o body esta correto mas ja foi enviado a 10 minutos atrás', async () => {
    try {
      await axios.post(url, body)
    } catch (error) {
      const status = error.response.status
      expect(status).toEqual(403)
    }
  })
})
