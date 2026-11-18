import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One Vercel variable opens Send a Call on the server and drops the Coming soon marks in the browser.
  env: { NEXT_PUBLIC_CALLS_OPEN: process.env.SEND_A_CALL_ENABLED ?? "" },
};

export default nextConfig;
