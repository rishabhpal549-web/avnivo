/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "rukminim2.flixcart.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "ibrzfiwskfhlkfdjbyfv.supabase.co" },
    ],
  },
};

export default nextConfig;
