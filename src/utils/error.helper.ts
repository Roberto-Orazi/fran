import { ErrorData, errorsCatalogs } from '../types/errors.catalogs'

export const getErrorMessage = (code: string): string => {
  const errorData = (errorsCatalogs as any)[code] as ErrorData
  if (!errorData) return 'Error desconocido'
  return errorData.message
}
