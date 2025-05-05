import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  minify: true,
  target: 'es2020',
});
