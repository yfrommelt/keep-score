import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import oxlintPlugin from "vite-plugin-oxlint";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    oxlintPlugin(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "favicon-96x96.png",
        "web-manifest-icon-192x192.png",
        "web-manifest-icon-512x512.png",
      ],
      manifest: {
        name: "Keep Score",
        short_name: "Keep Score",
        description: "An app to keep score of your games",
        theme_color: "#1976d2",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "web-manifest-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "web-manifest-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
