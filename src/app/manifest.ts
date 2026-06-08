import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Voice HQ",
    short_name: "AI Voice HQ",
    description: "AI Phone Ordering & Answering for Restaurants",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a09", // matches deep charcoal bg
    theme_color: "#ff5a1f",      // brand orange
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
