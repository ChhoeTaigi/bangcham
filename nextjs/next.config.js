const path = require("path");
const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	sassOptions: {
    includePaths: [path.join(__dirname, 'src/_wbst/public/')],
  },
};

module.exports = withNextIntl(nextConfig);
