export class ElegantBrush {
  maxIterations: number
  color: string

  constructor(maxIterations: number, color: string) {
    this.maxIterations = maxIterations
    this.color = color
  }

  getColor(iteration: number): string {
    if (iteration === this.maxIterations) {
      return this.color // Use the selected color for the core part
    }

    // Calculate brightness using a cosine function for smooth transitions
    const brightness = 0.5 + 0.5 * Math.cos((iteration * Math.PI) / this.maxIterations)
    return this.interpolateColor(this.color, '#FFFFFF', brightness)
  }

  interpolateColor(color1: string, color2: string, factor: number): string {
    const c1 = this.hexToRgb(color1)
    const c2 = this.hexToRgb(color2)
    const r = Math.round(c1.r + factor * (c2.r - c1.r))
    const g = Math.round(c1.g + factor * (c2.g - c1.g))
    const b = Math.round(c1.b + factor * (c2.b - c1.b))
    return `rgb(${r}, ${g}, ${b})`
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.slice(1), 16)
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    }
  }
}