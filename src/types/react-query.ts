export enum RQueryKeys {
  AgencyCars = 'AgencyCars',
  AgencyCar = 'AgencyCar',
  Apartments = 'Apartments',
  Apartment = 'Apartment',
  Expenses = 'Expenses',
  Expense = 'Expense'
}

export const getAgencyCarQueryKey = (id: string) => `${RQueryKeys.AgencyCar}/${id}`
export const getApartmentQueryKey = (id: string) => `${RQueryKeys.Apartment}/${id}`
export const getExpenseQueryKey = (id: string) => `${RQueryKeys.Expense}/${id}`
