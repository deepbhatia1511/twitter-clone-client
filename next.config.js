/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
   images: {
      domains: ["shorturl.at", "lh3.googleusercontent.com", "deep-twitter-dev.s3.ap-south-1.amazonaws.com", "t.ly"],
   },
};

module.exports = nextConfig;
