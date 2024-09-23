'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FractalGenerator from "@/components/FractalGenerator"

export function FractalLandingPage() {
  const [fractalSet, setFractalSet] = useState('mandelbrot')
  const [showJuliaControls, setShowJuliaControls] = useState(false)
  const [color, setColor] = useState('#00ff00')
  const [juliaRe, setJuliaRe] = useState(0) // Use a single value
  const [juliaIm, setJuliaIm] = useState(0) // Use a single value
  const [iterationDepth, setIterationDepth] = useState(50)
  const [zoom, setZoom] = useState(1)
  const [brushType, setBrushType] = useState('Smooth')

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
          <a className="flex items-center justify-center" href="#">
            <span className="sr-only">Fractal</span>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <span className="ml-2 text-2xl font-bold">Fractal</span>
          </a>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <div className="flex flex-col space-y-4 rounded-lg border border-gray-800 p-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
                  <div className="space-y-2">
                    <Label htmlFor="iteration-depth" className="text-white">Iteration Depth</Label>
                    <Slider
                      id="iteration-depth"
                      max={100}
                      min={1}
                      step={1}
                      value={[iterationDepth]} // Provide an array
                      onValueChange={(value) => setIterationDepth(value[0])} // Update state with a single value
                      className="[&>span]:bg-white [&>span]:h-1 [&>[role=slider]]:h-4 [&>[role=slider]]:w-4 [&>[role=slider]]:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zoom" className="text-white">Zoom</Label>
                    <Slider
                      id="zoom"
                      max={10}
                      min={0.1}
                      step={0.1}
                      value={[zoom]} // Provide an array
                      onValueChange={(value) => setZoom(value[0])} // Update state with a single value
                      className="[&>span]:bg-white [&>span]:h-1 [&>[role=slider]]:h-4 [&>[role=slider]]:w-4 [&>[role=slider]]:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brush-type" className="text-white">Brush Type</Label>
                    <Select onValueChange={(value) => setBrushType(value)}>
                      <SelectTrigger id="brush-type" className="bg-gray-800 text-white border-gray-700">
                        <SelectValue placeholder="Select brush type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
                        <SelectItem value="Banded">Banded</SelectItem>
                        <SelectItem value="Binary">Binary</SelectItem>
                        <SelectItem value="Elegant">Elegant</SelectItem>
                        <SelectItem value="Smooth">Smooth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color-picker" className="text-white">Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        id="color-picker"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-10 h-10 p-0 border-0 rounded-md overflow-hidden"
                      />
                      <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fractal-set" className="text-white">Fractal Set</Label>
                    <Select onValueChange={(value) => {
                      setFractalSet(value)
                      setShowJuliaControls(value === 'julia')
                    }}>
                      <SelectTrigger id="fractal-set" className="bg-gray-800 text-white border-gray-700">
                        <SelectValue placeholder="Select fractal set" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
                        <SelectItem value="mandelbrot">Mandelbrot</SelectItem>
                        <SelectItem value="julia">Julia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {showJuliaControls && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="julia-re" className="text-white">Julia Re</Label>
                        <Slider
                          id="julia-re"
                          max={2}
                          min={-2}
                          step={0.01}
                          value={[juliaRe]} // Provide an array
                          onValueChange={(value) => setJuliaRe(value[0])} // Update state with a single value
                          className="[&>span]:bg-white [&>span]:h-1 [&>[role=slider]]:h-4 [&>[role=slider]]:w-4 [&>[role=slider]]:bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="julia-im" className="text-white">Julia Im</Label>
                        <Slider
                          id="julia-im"
                          max={2}
                          min={-2}
                          step={0.01}
                          value={[juliaIm]} // Provide an array
                          onValueChange={(value) => setJuliaIm(value[0])} // Update state with a single value
                          className="[&>span]:bg-white [&>span]:h-1 [&>[role=slider]]:h-4 [&>[role=slider]]:w-4 [&>[role=slider]]:bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center ml-20"> {/* Added margin-left to move the fractal to the right */}
                  <FractalGenerator
                    iterationDepth={iterationDepth}
                    color={color}
                    zoom={zoom}
                    offsetX={0}
                    offsetY={0}
                    brushType={brushType}
                    isJulia={fractalSet === 'julia'}
                    juliaRe={juliaRe}
                    juliaIm={juliaIm}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
          <p className="text-xs text-gray-400">© 2024 Fractal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}