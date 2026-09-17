import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs/develop-guide',
        destination: '/docs/node-operations',
        permanent: true,
      },
      {
        source: '/docs/develop-guide/testnet',
        destination: '/docs/node-operations',
        permanent: true,
      },
      {
        source: '/docs/develop-guide/network-configuration',
        destination: '/docs/technical-reference/network-configuration',
        permanent: true,
      },
      {
        source: '/docs/develop-guide/system-configuration',
        destination: '/docs/technical-reference/system-configuration',
        permanent: true,
      },
      {
        source: '/docs/develop-guide/wallet-setup',
        destination: '/docs/user-guide/wallet-setup',
        permanent: true,
      },
      {
        source: '/docs/develop-guide/hardware/:path*',
        destination: '/docs/node-operations/hardware/:path*',
        permanent: true,
      },
      {
        source: '/docs/develop-guide/testnet/chain/:path*',
        destination: '/docs/node-operations/chain/:path*',
        permanent: true,
      },
      {
        source: '/docs/develop-guide/testnet/dhcs/:path*',
        destination: '/docs/node-operations/dhc/:path*',
        permanent: true,
      },
      {
        source: '/docs/user-guide/maintaining/:path*',
        destination: '/docs/node-operations/maintenance/:path*',
        permanent: true,
      },
      {
        source: '/docs/user-guide/troubleshooting',
        destination: '/docs/node-operations/troubleshooting',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
