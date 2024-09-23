import { useRef, useEffect } from 'react'

interface CellularAutomataProps {
  gridSize: number
  rules: number[]
  colorPalette: string[]
}

export default function CellularAutomata({ gridSize = 50, rules = [2, 3, 3, 3], colorPalette = ['#000000', '#FFFFFF'] }: CellularAutomataProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const cellSize = 10
        canvas.width = gridSize * cellSize
        canvas.height = gridSize * cellSize

        let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0))

        // Initialize random cells
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            grid[i][j] = Math.random() > 0.5 ? 1 : 0
          }
        }

        function drawGrid() {
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              ctx.fillStyle = colorPalette[grid[i][j]]
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
          }
        }

        function updateGrid() {
          const newGrid = grid.map(arr => [...arr])
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              const neighbors = countNeighbors(i, j)
              if (grid[i][j] === 1 && (neighbors < rules[0] || neighbors > rules[1])) {
                newGrid[i][j] = 0
              } else if (grid[i][j] === 0 && neighbors >= rules[2] && neighbors <= rules[3]) {
                newGrid[i][j] = 1
              }
            }
          }
          grid = newGrid
        }

        function countNeighbors(x: number, y: number) {
          let count = 0
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue
              const newX = (x + i + gridSize) % gridSize
              const newY = (y + j + gridSize) % gridSize
              count += grid[newX][newY]
            }
          }
          return count
        }

        function animate() {
          drawGrid()
          updateGrid()
          requestAnimationFrame(animate)
        }

        animate()
      }
    }
  }, [gridSize, rules, colorPalette])

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
}