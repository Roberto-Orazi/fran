export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat('es-ES')

  return formatter.format(price)
}
