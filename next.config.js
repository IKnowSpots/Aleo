/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config, { isServer }) => {
      // Add a custom loader for .aleo files
      config.module.rules.push({
        test: /\.aleo$/i,
        use: 'raw-loader',
      });

      // Important: return the modified config
      return config;
    }
  };
