const padTo2Digits = (num: number): string => num.toString().padStart(2, '0')

export const getTimeFromSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
  return result
}

export const formatHours = (hours: number): string => {
  const result = `${padTo2Digits(hours)}:00`
  return result
}

export const formatMinutes = (minutes: number): string => {
  const result = `${minutes} minutos`
  return result
}

export const FORTNIGHT_IN_DAYS = 15
