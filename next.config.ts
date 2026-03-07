import type { NextConfig } from "next";

// In GitHub Codespaces the forwarded-port proxy sets x-forwarded-host to the
// public Codespaces URL while the browser origin stays "localhost:3000" (VS Code
// tunnel). Next.js rejects Server Actions when these two don't match, so we
// allow both the specific Codespace hostname and localhost explicitly.
const codespaceHost = process.env.CODESPACE_NAME
  ? `${process.env.CODESPACE_NAME}-3000.app.github.dev`
  : undefined

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        ...(codespaceHost ? [codespaceHost] : []),
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
