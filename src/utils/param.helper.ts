export const getPaginationParams = (search: string, page: number) => ({
  page: page || 1,
  search: search || '',
})
