import API, { AxiosConfig } from '../../config/axios.config'
import { Res } from '../../types/response.types'
import { User } from '../../types/types'
import {
  UpdateMyProfileDto
} from '../../validations/basic/profile.dto'

const resourcePath = '/users'
type Resource = User

const updateProfile = async (dto: UpdateMyProfileDto): Promise<Res<Resource>> => {
  const res = await API.put<Res<Resource>>(`${resourcePath}/me`, dto, await AxiosConfig())
  return res.data
}

const UserProfileService = {
  updateProfile,
}

export default UserProfileService
