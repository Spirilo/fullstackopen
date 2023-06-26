import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = userToken => {
  token = `Bearer ${userToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const save = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return response.data
}

const dlt = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, save, dlt }