import { join } from "node:path"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack"

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({ target: "react", autoCodeSplitting: true }),
      ],
    },
  },
  server: {
    publicDir: {
      name: join(__dirname, "public"),
    },
  },
})
