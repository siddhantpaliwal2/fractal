export class SmoothBrush {
  maxIterations: number
  color: string

  constructor(maxIterations: number, color: string) {
    this.maxIterations = maxIterations
    this.color = color
  }

  getColor(iteration: number, escapeMagnitude: number): string {
    if (iteration === this.maxIterations) {
      return this.color // Use the selected color for the core part
    }

    // Calculate a normalized value between 0 and 1
    const smooth = iteration + 1 - Math.log(Math.log(escapeMagnitude)) / Math.log(2.0)
    const t = smooth / this.maxIterations

    // Interpolate between the selected color and white for a glowing effect
    const color = this.interpolateColor(this.color, '#FFFFFF', t)
    return color
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