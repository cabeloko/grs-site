import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF/WebP gerados sob demanda a partir das capturas do portfólio
    formats: ["image/avif", "image/webp"],
    // Apenas imagens locais de public/portfolio são otimizadas
    localPatterns: [{ pathname: "/portfolio/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
