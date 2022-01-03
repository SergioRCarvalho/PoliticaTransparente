const withTM = require('next-transpile-modules')(['next-session']); // pass the modules you would like to see transpiled

module.exports = withTM({
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      http: false,
      https: false,
      crypto: false,
      zlib: false,
      http2: false,
    };

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
});
