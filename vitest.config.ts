import react from '@vitejs/plugin-react';
import { defineConfig, configDefaults } from 'vitest/config';
import magicalSvg from 'vite-plugin-magical-svg';

export default defineConfig({
  plugins: [
    // @ts-ignore this has weird typing
    magicalSvg({ target: 'react' }),
    // @ts-ignore same weird typing
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  test: {
    include: ['**/*.vitest.?(c|m)[jt]s?(x)'],
    exclude: [
      ...configDefaults.exclude,
      '**/*.test.[jt]s?(x)',
      '**/playwright/**',
    ],
    globals: true,
    environment: 'jsdom',
    reporters: ['default'],
    setupFiles: './vitest.setup.ts',
    passWithNoTests: true,
    deps: {
      inline: ['@mdxeditor/editor', 'react-diff-view'],
    },
  },
});
