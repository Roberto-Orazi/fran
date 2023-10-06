import { AxiosConfig } from '../config/axios.config'

export const isLoggedIn = (): boolean => {
  try {
    AxiosConfig()
    return true
  } catch (error) {
    return false
  }
}
