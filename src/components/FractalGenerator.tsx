import { useRef, useEffect } from 'react'
import { computeSet } from '../utils/fractalGenerator'
import { sinColorTable } from '../utils/colorTable'
import { SmoothBrush } from '../brushes/SmoothBrush'
import { ElegantBrush } from '../brushes/ElegantBrush'
import { BinaryBrush } from '../brushes/BinaryBrush'
import { BandedBrush } from '../brushes/BandedBrush'

interface FractalGeneratorProps {
  iterationDepth: number
  color: string
  zoom: number
  offsetX: number
  offsetY: number
  brushType: string
  isJulia: boolean
  juliaRe: number
  juliaIm: number
}

export default function FractalGenerator({
  iterationDepth = 100,
  color = '#00ff00',
  zoom = 1,
  offsetX = 0,
  offsetY = 0,
  brushType = 'Smooth',
  isJulia = false,
  juliaRe = 0,
  juliaIm = 0,
}: FractalGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const width = 640 // Reduced width by 20%
        const height = 600

        // Convert color to RGB values
        const rgbColor = hexToRgb(color)
        const rgbThetas: [number, number, number] = [rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255]

        const colortable = sinColorTable(rgbThetas, 4096)
        const creal = Array.from({ length: width }, (_, i) => ((i - width / 2) * (4 / width)) / zoom + offsetX)
        const cim = Array.from({ length: height }, (_, i) => ((i - height / 2) * (4 / width)) / zoom + offsetY)
        const light = [45 * Math.PI / 180, 45 * Math.PI / 180, 0.75, 0.2, 0.5, 0.5, 20]

        let brush
        switch (brushType) {
          case 'Elegant':
            brush = new ElegantBrush(iterationDepth, color)
            break
          case 'Binary':
            brush = new BinaryBrush(iterationDepth, color)
            break
          case 'Banded':
            brush = new BandedBrush(iterationDepth, color)
            break
          case 'Smooth':
          default:
            brush = new SmoothBrush(iterationDepth, color)
            break
        }

        const mat = computeSet(creal, cim, iterationDepth, colortable, 32, 0, 0.9, 0, Math.sqrt((4 / width) ** 2 + (4 / height) ** 2), light, isJulia, juliaRe, juliaIm)

        const imageData = ctx.createImageData(width, height)
        const data = imageData.data

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            const idx = (y * width + x) * 4
            const [r, g, b] = mat[y][x]

            data[idx] = r * 255
            data[idx + 1] = g * 255
            data[idx + 2] = b * 255
            data[idx + 3] = 255 // Alpha
          }
        }

        ctx.putImageData(imageData, 0, 0)
      }
    }
  }, [
    iterationDepth,
    color,
    zoom,
    offsetX,
    offsetY,
    brushType,
    isJulia,
    juliaRe,
    juliaIm,
  ])

  return (
    <canvas
      ref={canvasRef}
      width={640} // Reduced width by 20%
      height={600}
      style={{ border: '1px solid black' }}
    />
  )
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const bigint = parseInt(hex.slice(1), 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}