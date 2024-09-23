import { useState } from 'react'
import { Box, Select, MenuItem, FormControl, InputLabel, Typography, Slider, Button, TextField } from '@mui/material'

interface ControlsPanelProps {
  parameters: any
  onParameterChange: (newParameters: any) => void
  onAlgorithmChange: (algorithm: string) => void
  onDownload: () => void
  onReset: () => void
}

export default function ControlsPanel({ parameters, onParameterChange, onAlgorithmChange, onDownload, onReset }: ControlsPanelProps) {
  const [algorithm, setAlgorithm] = useState('CellularAutomata')

  const handleAlgorithmChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string
    setAlgorithm(value)
    onAlgorithmChange(value)
  }

  const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
    onParameterChange({ ...parameters, [name]: newValue })
  }

  const handleColorChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = parseInt(event.target.value.replace('#', ''), 16) / 0xFFFFFF
    onParameterChange({ ...parameters, [name]: colorValue })
  }

  const handleBrushChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onParameterChange({ ...parameters, brushType: event.target.value as string })
  }

  return (
    <Box>
      <Typography variant="h6">Controls Panel</Typography>
      <FormControl fullWidth>
        <InputLabel>Algorithm</InputLabel>
        <Select value={algorithm} onChange={handleAlgorithmChange}>
          <MenuItem value="CellularAutomata">Cellular Automata</MenuItem>
          <MenuItem value="FractalGenerator">Fractal Generator</MenuItem>
          <MenuItem value="LSystem">L-System</MenuItem>
        </Select>
      </FormControl>
      {algorithm === 'FractalGenerator' && (
        <Box>
          <Typography>Iteration Depth</Typography>
          <Slider
            value={parameters.iterationDepth || 100}
            onChange={handleSliderChange('iterationDepth')}
            min={1}
            max={1000}
            step={1}
          />
          <Typography>Zoom</Typography>
          <Slider
            value={parameters.zoom || 1}
            onChange={handleSliderChange('zoom')}
            min={0.1}
            max={10}
            step={0.1}
          />
          <Typography>Offset X</Typography>
          <Slider
            value={parameters.offsetX || 0}
            onChange={handleSliderChange('offsetX')}
            min={-2}
            max={2}
            step={0.01}
          />
          <Typography>Offset Y</Typography>
          <Slider
            value={parameters.offsetY || 0}
            onChange={handleSliderChange('offsetY')}
            min={-2}
            max={2}
            step={0.01}
          />
          <Typography>Brush Type</Typography>
          <FormControl fullWidth>
            <InputLabel>Brush</InputLabel>
            <Select value={parameters.brushType || 'Smooth'} onChange={handleBrushChange}>
              <MenuItem value="Smooth">Smooth</MenuItem>
              <MenuItem value="Elegant">Elegant</MenuItem>
              <MenuItem value="Binary">Binary</MenuItem>
              <MenuItem value="Banded">Banded</MenuItem>
            </Select>
          </FormControl>
          <Typography>Color Scheme</Typography>
          <TextField
            type="color"
            value={`#${Math.floor(parameters.colorScheme * 0xFFFFFF).toString(16).padStart(6, '0')}`}
            onChange={handleColorChange('colorScheme')}
          />
          <Typography>Julia Set</Typography>
          <FormControl fullWidth>
            <InputLabel>Julia Set</InputLabel>
            <Select
              value={parameters.isJulia ? 'Julia' : 'Mandelbrot'}
              onChange={(event) => onParameterChange({ ...parameters, isJulia: event.target.value === 'Julia' })}
            >
              <MenuItem value="Mandelbrot">Mandelbrot</MenuItem>
              <MenuItem value="Julia">Julia</MenuItem>
            </Select>
          </FormControl>
          {parameters.isJulia && (
            <Box>
              <Typography>Julia Re</Typography>
              <Slider
                value={parameters.juliaRe || 0}
                onChange={handleSliderChange('juliaRe')}
                min={-2}
                max={2}
                step={0.01}
              />
              <Typography>Julia Im</Typography>
              <Slider
                value={parameters.juliaIm || 0}
                onChange={handleSliderChange('juliaIm')}
                min={-2}
                max={2}
                step={0.01}
              />
            </Box>
          )}
        </Box>
      )}
      <Button onClick={onDownload}>Download Art</Button>
      <Button onClick={onReset}>Reset</Button>
    </Box>
  )
}