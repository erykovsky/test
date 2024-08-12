/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  formats: ["image/avif", "image/webp"],
 },
 experimental: {
  esmExternals: true,
  mdxRs: true,
  scrollRestoration: true,
  ppr: true,
  after: true,
  reactCompiler: true,
 },
};

export default nextConfig;
