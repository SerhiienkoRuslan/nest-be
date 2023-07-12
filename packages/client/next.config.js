//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');

const nextConfig = {
  nx: {
    svgr: true,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = withNx(nextConfig);
