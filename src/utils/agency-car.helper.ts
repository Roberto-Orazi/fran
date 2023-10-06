export const extractImagePositionFromUrl = (url: string): string => {
  const data = url.split('/')
  const imagePosition = data[data.length - 1]

  return imagePosition
}
