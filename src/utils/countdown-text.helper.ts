const padTo2Digits = (num: number): string => num.toString().padStart(2, '0')

export const getTimeFromSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
  return result
}
