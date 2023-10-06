export const formatCost = (cost: number): string => {
  const formatter = new Intl.NumberFormat('es-ES')

  return formatter.format(cost)
}
