import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // 프로덕션 빌드 시 ESLint 검사 건너뛰기
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 프로덕션 빌드 시 TypeScript 타입 검사 건너뛰기
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
