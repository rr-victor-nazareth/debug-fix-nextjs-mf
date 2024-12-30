const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    testproducer: `testproducer@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.externals.push({
      bufferutil: 'webpack-node-externals',
      'utf-8-validate': 'webpack-node-externals',
    });

    config.plugins.push(
      new NextFederationPlugin({
        name: 'testconsumer',
        filename: 'static/chunks/remoteEntry.js',
        dts: {
          consumeTypes: true,
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          debug: true,
        },
      }),
    );

    return config;
  },
}

module.exports = nextConfig
