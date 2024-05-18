/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nfguzmwwibzbsuamioqv.supabase.co",
      },
    ],
  },
  env: {
    BASE_URL: "/protected",
  },
};
