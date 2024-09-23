export function blinnPhong(z: { real: number; imag: number }, light: number[]): number {
  const normal = { real: z.real / Math.sqrt(z.real * z.real + z.imag * z.imag), imag: z.imag / Math.sqrt(z.real * z.real + z.imag * z.imag) };
  const ldiff = (normal.real * Math.cos(light[0]) * Math.cos(light[1]) +
    normal.imag * Math.sin(light[0]) * Math.cos(light[1]) +
    1 * Math.sin(light[1])) / (1 + 1 * Math.sin(light[1]));

  const phiHalf = (Math.PI / 2 + light[1]) / 2;
  const lspec = (normal.real * Math.cos(light[0]) * Math.sin(phiHalf) +
    normal.imag * Math.sin(light[0]) * Math.sin(phiHalf) +
    1 * Math.cos(phiHalf)) / (1 + 1 * Math.cos(phiHalf));

  const bright = light[3] + light[4] * ldiff + light[5] * (Math.pow(lspec, light[6]));
  return bright * light[2] + (1 - light[2]) / 2;
}