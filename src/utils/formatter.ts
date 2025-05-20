export const formatTime = (time: number) => {
  if (time == null) return `0:00`

  const seconds = Math.floor(time / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${minutes}:${formattedSeconds}`
}
