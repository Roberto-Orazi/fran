import API from '../../config/axios.config'

const resourcePath = '/health'

const healthCheck = async (): Promise<any> => {
  const res = await API.get(`${resourcePath}`)
  return res
}

const HealthService = {
  healthCheck
}

export default HealthService
