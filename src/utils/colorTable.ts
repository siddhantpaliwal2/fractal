export function sinColorTable(rgbThetas: [number, number, number] = [0.85, 0.0, 0.15], ncol: number = 4096): number[][] {
  function colormap(x: number[], rgbThetas: [number, number, number]): number[][] {
    const y = x.map((val) => [
      (val + rgbThetas[0]) * 2 * Math.PI,
      (val + rgbThetas[1]) * 2 * Math.PI,
      (val + rgbThetas[2]) * 2 * Math.PI,
    ]);
    return y.map((val) => val.map((v) => 0.5 + 0.5 * Math.sin(v)));
  }

  const x = Array.from({ length: ncol }, (_, i) => i / (ncol - 1));
  return colormap(x, rgbThetas);
}