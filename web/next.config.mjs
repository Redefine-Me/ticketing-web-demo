/** @type {import('next').NextConfig} */
const rawBasePath = process.env.WEB_BASE_PATH || '';
const basePath = rawBasePath && rawBasePath !== '/' ? rawBasePath : '';

const nextConfig = {
  basePath,
};

export default nextConfig;
