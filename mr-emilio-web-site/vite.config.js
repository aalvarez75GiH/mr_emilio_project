import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target:
          "https://us-central1-mr-emilio---backend.cloudfunctions.net/app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0",
//     port: 5173,
//   },
// });
