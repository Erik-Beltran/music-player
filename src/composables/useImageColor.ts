import ColorThief from 'colorthief'

export function useDominantColor() {
  async function getDominantColor(imageUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = imageUrl

      img.onload = () => {
        try {
          const colorThief = new ColorThief()
          const [r, g, b] = colorThief.getColor(img)
          resolve(`rgb(${r},${g},${b})`)
        } catch (e) {
          console.error('Error extracting color', e)
          resolve('#18181b') // fallback color
        }
      }

      img.onerror = () => {
        console.error('Failed to load image for color extraction')
        resolve('#18181b') // fallback color
      }
    })
  }

  return { getDominantColor }
}
