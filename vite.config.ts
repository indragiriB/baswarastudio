import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Di GitHub Actions, VITE_BASE diisi otomatis ("/" untuk custom domain,
// "/nama-repo/" untuk username.github.io/nama-repo). Lokal default "/".
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  return {
    base: env.VITE_BASE || "/",
    plugins: [react()],
  };
});
