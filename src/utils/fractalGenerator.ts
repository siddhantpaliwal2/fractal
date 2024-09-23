import { blinnPhong } from './blinnPhong';

export function smoothIter(c: { real: number; imag: number }, maxIter: number, stripeS: number, stripeSig: number, isJulia: boolean, juliaRe: number, juliaIm: number): [number, number, number, { real: number; imag: number }] {
  const escRadius2 = 10 ** 10;
  let z = isJulia ? c : { real: 0, imag: 0 };
  let dz = { real: 1, imag: 0 };
  let stripeA = 0;
  const constant = isJulia ? { real: juliaRe, imag: juliaIm } : c;

  for (let n = 0; n < maxIter; n++) {
    dz = { real: 2 * z.real * dz.real - 2 * z.imag * dz.imag + 1, imag: 2 * z.real * dz.imag + 2 * z.imag * dz.real };
    z = { real: z.real * z.real - z.imag * z.imag + constant.real, imag: 2 * z.real * z.imag + constant.imag };

    if (stripeS > 0 && stripeSig > 0) {
      const stripeT = (Math.sin(stripeS * Math.atan2(z.imag, z.real)) + 1) / 2;
      stripeA = stripeA * stripeSig + stripeT * (1 - stripeSig);
    }

    if (z.real * z.real + z.imag * z.imag > escRadius2) {
      const modz = Math.sqrt(z.real * z.real + z.imag * z.imag);
      const logRatio = 2 * Math.log(modz) / Math.log(escRadius2);
      const smoothI = 1 - Math.log(logRatio) / Math.log(2);

      if (stripeS > 0 && stripeSig > 0) {
        stripeA = stripeA / (1 - Math.pow(stripeSig, n) * (1 + smoothI * (stripeSig - 1)));
      }

      const u = { real: z.real / dz.real, imag: z.imag / dz.imag };
      const dem = modz * Math.log(modz) / Math.sqrt(dz.real * dz.real + dz.imag * dz.imag) / 2;

      return [n + smoothI, stripeA, dem, u];
    }
  }

  return [0, 0, 0, { real: 0, imag: 0 }];
}

export function computeSet(creal: number[], cim: number[], maxIter: number, colortable: number[][], ncycle: number, stripeS: number, stripeSig: number, stepS: number, diag: number, light: number[], isJulia: boolean, juliaRe: number, juliaIm: number): number[][][] {
  const xpixels = creal.length;
  const ypixels = cim.length;
  const mat = Array.from({ length: ypixels }, () => Array.from({ length: xpixels }, () => [0, 0, 0]));

  for (let x = 0; x < xpixels; x++) {
    for (let y = 0; y < ypixels; y++) {
      const c = { real: creal[x], imag: cim[y] };
      const [niter, stripeA, dem, normal] = smoothIter(c, maxIter, stripeS, stripeSig, isJulia, juliaRe, juliaIm);

      if (niter > 0) {
        const ncol = colortable.length - 1;
        const niterMod = Math.sqrt(niter) % ncycle / ncycle;
        const colI = Math.round(niterMod * ncol);

        const bright = blinnPhong(normal, light);
        const demNorm = -Math.log(dem) / 12;
        const demSigmoid = 1 / (1 + Math.exp(-10 * ((2 * demNorm - 1) / 2)));

        const shader = stripeA > 0 ? stripeA : 0;
        const finalBright = shader > 0 ? (bright * (1 - demSigmoid) + demSigmoid * bright) : bright;

        for (let i = 0; i < 3; i++) {
          mat[y][x][i] = colortable[colI][i] * finalBright;
        }
      }
    }
  }

  return mat;
}