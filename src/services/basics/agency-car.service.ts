import API, { AxiosConfig, getAPIHeaders, tryGetAPIHeaders } from '../../config/axios.config'
import { Paginated, Res } from '../../types/response.types'
import { AgencyCar } from '../../types/types'
import { getPaginationParams } from '../../utils/param.helper'
import { CreateAgencyCarDto, UpdateAgencyCarDto } from '../../validations/agency-car.dto'

export interface SelectedImages<T> {
  'image-1'?: T,
  'image-2'?: T,
  'image-3'?: T,
  'image-4'?: T,
  'image-5'?: T,
  'image-6'?: T,
  'image-7'?: T,
  'image-8'?: T,
  'image-9'?: T,
  'image-10'?: T,
  'image-11'?: T,
  'image-12'?: T,
  'image-13'?: T,
  'image-14'?: T,
  'image-15'?: T,
}

const resourcePath = '/admin/agency-cars'
type Resource = AgencyCar

const create = async (obj: { dto: CreateAgencyCarDto, files: SelectedImages<File> }): Promise<Res<Resource>> => {
  const { dto, files } = obj
  const res = await API.post<Res<Resource>>(resourcePath, dto, await AxiosConfig())
  const resData = res.data

  await uploadImages(resData.data.id, files)

  return resData
}

const getOne = async (id: string): Promise<Res<Resource>> => {
  const res = await API.get<Res<Resource>>(`${resourcePath}/${id}`, await AxiosConfig())
  return res.data
}

const uploadImages = async (id: string, files: SelectedImages<File>) => {
  const formData = new FormData()

  Object.keys(files).forEach((key) => {
    formData.append(key, (files as any)[key])
  })

  const res = await API.put<Res<any>>(`${resourcePath}/images/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAPIHeaders()
    }
  })

  return res.data
}

const update = async (obj: { dto: UpdateAgencyCarDto, files?: SelectedImages<File> }): Promise<Res<Resource>> => {
  const { dto, files } = obj
  const res = await API.put<Res<Resource>>(resourcePath, dto, await AxiosConfig())
  const resData = res.data

  if (files && Object.values(files).length > 0) {
    await uploadImages(dto.id, files)
  }

  return resData
}

const deleteOne = async (id: string): Promise<void> => {
  await API.delete(`${resourcePath}/${id}`, AxiosConfig())
}

const list = async (
  search: string,
  page: number,
  min: number | null,
  max: number | null
): Promise<Res<Paginated<Resource>>> => {
  const res = await API.get<Res<Paginated<Resource>>>(resourcePath, {
    params: {
      ...getPaginationParams(search, page),
      min: min || '',
      max: max || ''
    },
    headers: tryGetAPIHeaders()
  })
  return res.data
}

const AgencyCarService = {
  create,
  update,
  deleteOne,
  list,
  getOne
}

export default AgencyCarService
