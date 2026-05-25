import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserPagesRepo = repoName?.endsWith(".github.io");
const base = process.env.GITHUB_ACTIONS && repoName && !isUserPagesRepo ? `/${repoName}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: "jsdom"
  }
});
