import { useRef, useEffect } from 'react'

interface LSystemProps {
  axiom: string
  rules: Record<string, string>
  angle: number
  depth: number
}

export default function LSystem({ axiom = 'F', rules = { 'F': 'FF+[+F-F-F]-[-F+F+F]' }, angle = 25, depth = 4 }: LSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = 800
        canvas.height = 600

        function generateLSystem(axiom: string, rules: Record<string, string>, depth: number): string {
          if (depth === 0) return axiom
          return axiom.split('').map(char => rules[char] || char).join('')
        }

        function drawLSystem(instructions: string, angle: number) {
          const stack: [number, number, number][] = []
          ctx.beginPath()
          ctx.moveTo(400, 600)
          let x = 400, y = 600
          let direction = -90

          for (const char of instructions) {
            switch (char) {
              case 'F':
                const radians = direction * Math.PI / 180
                x += Math.cos(radians) * 5
                y += Math.sin(radians) * 5
                ctx.lineTo(x, y)
                break
              case '+':
                direction += angle
                break
              case '-':
                direction -= angle
                break
              case '[':
                stack.push([x, y, direction])
                break
              case ']':
                [x, y, direction] = stack.pop()!
                ctx.moveTo(x, y)
                break
            }
          }

          ctx.strokeStyle = 'green'
          ctx.stroke()
        }

        const lSystemInstructions = generateLSystem(axiom, rules, depth)
        drawLSystem(lSystemInstructions, angle)
      }
    }
  }, [axiom, rules, angle, depth])

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
}