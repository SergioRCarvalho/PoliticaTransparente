const withTM = require('next-transpile-modules')(['next-session']); // pass the modules you would like to see transpiled

module.exports = withTM({
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {};

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
});
