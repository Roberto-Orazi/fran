import API, { AxiosConfig, tryGetAPIHeaders } from '../config/axios.config'
import { Paginated, Res } from '../types/response.types'
import { Expenses } from '../types/types'
import { CreateExpenseDto, UpdateExpenseDto } from '../validations/expense.dto'

const adminResourcePath = '/expenses'
type Resource = Expenses

const create = async (dto: CreateExpenseDto): Promise<Resource> => {
  const res = await API.post<Res<Resource>>(adminResourcePath, dto, await AxiosConfig())
  return res.data.data
}

const update = async (dto: UpdateExpenseDto): Promise<Resource> => {
  const res = await API.put<Res<Resource>>(adminResourcePath, dto, await AxiosConfig())
  return res.data.data
}

const getOne = async (id: string): Promise<Res<Resource>> => {
  const res = await API.get<Res<Resource>>(`${adminResourcePath}/${id}`, await AxiosConfig())
  return res.data
}

const getMonth = async (apartmentId: string, year: number, month:number): Promise<Res<Resource>> => {
  const res = await API.get<Res<Resource>>(`${adminResourcePath}/${apartmentId}/${year}/${month}`, await AxiosConfig())
  return res.data
}

const deleteOne = async (id: string): Promise<void> => {
  await API.delete(`${adminResourcePath}/${id}`, AxiosConfig())
}

export const list = async (
  search: string,
  page: number,
): Promise<Res<Paginated<Expenses>>> => {
  const res = await API.get<Res<Paginated<Expenses>>>(adminResourcePath, {
    params: {
      search,
      page,
    },
    headers: tryGetAPIHeaders(),
  })
  return res.data
}

const ExpensesService = {
  create,
  update,
  getOne,
  getMonth,
  deleteOne,
  list
}

export default ExpensesService
