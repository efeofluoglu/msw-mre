// eslint-disable-next-line @typescript-eslint/no-var-requires
const { configureRuntimeEnv } = require('next-runtime-env/build/configure');
configureRuntimeEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  experimental: {
    instrumentationHook: true,
  },
  output: 'standalone',
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  webpack(config, context) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // copied from https://github.com/mswjs/msw/issues/1801#issuecomment-1793911389
    if (context?.isServer) {
      // next server build => ignore msw/browser
      if (Array.isArray(config.resolve.alias)) {
        // in Next the type is always object, so this branch isn't necessary. But to keep TS happy, avoid @ts-ignore and prevent possible future breaking changes it's good to have it
        config.resolve.alias.push({ name: 'msw/browser', alias: false });
      } else {
        config.resolve.alias['msw/browser'] = false;
      }
    } else {
      // browser => ignore msw/node
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/node', alias: false });
      } else {
        config.resolve.alias['msw/node'] = false;
      }
    }

    return config;
  },
  redirects: async () => {
    return [
      {
        source:
          '/best-practices/devops-maturity/tactical-v1-assessments/:productId',
        destination:
          '/best-practices/devops-maturity/2023-assessment/:productId',
        permanent: true,
      },
      {
        source: '/best-practices/devops-maturity/tactical-v1-assessments',
        destination: '/best-practices/devops-maturity/2023-assessment',
        permanent: true,
      },
      // why not?
      // {
      //   source: '/best-practices/faq-moderation',
      //   destination: '/admin/moderation',
      //   permanent: true,
      // },
    ];
  },
};

if (process.env.DEPLOY_ENV === 'DEV') {
  nextConfig.output = 'export';
  nextConfig.distDir = 'build';
}

module.exports = nextConfig;
