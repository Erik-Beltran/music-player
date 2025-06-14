export const formatTime = (time: number) => {
  if (time == null) return `0:00`

  const seconds = Math.floor(time / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${minutes}:${formattedSeconds}`
}

export const formatAudioTime = (time: number) => {
  if (time == null) return `0:00`

  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value)
}
