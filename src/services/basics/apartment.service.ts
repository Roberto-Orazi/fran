import API, { AxiosConfig, tryGetAPIHeaders } from '../../config/axios.config'
import { Paginated, Res } from '../../types/response.types'
import { Apartments } from '../../types/types'
import { CreateApartmentDto, UpdateApartmentDto } from '../../validations/apartment.dto'

const adminResourcePath = '/apartments'
type Resource = Apartments

const create = async (dto: CreateApartmentDto): Promise<Resource> => {
  const res = await API.post<Res<Resource>>(adminResourcePath, dto, await AxiosConfig())
  return res.data.data
}

const update = async (dto: UpdateApartmentDto): Promise<Resource> => {
  const res = await API.put<Res<Resource>>(adminResourcePath, dto, await AxiosConfig())
  return res.data.data
}

const getOne = async (id: string): Promise<Res<Resource>> => {
  const res = await API.get<Res<Resource>>(`${adminResourcePath}/${id}`, await AxiosConfig())
  return res.data
}

const deleteOne = async (id: string): Promise<void> => {
  await API.delete(`${adminResourcePath}/${id}`, AxiosConfig())
}

export const list = async (
  search: string,
  page: number,
  city: string
): Promise<Res<Paginated<Apartments>>> => {
  const res = await API.get<Res<Paginated<Apartments>>>('/apartments', {
    params: {
      search,
      page,
      city
    },
    headers: tryGetAPIHeaders(),
  })
  return res.data
}

const ApartmentService = {
  create,
  update,
  getOne,
  deleteOne,
  list
}

export default ApartmentService
