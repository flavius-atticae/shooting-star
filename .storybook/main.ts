// Storybook configuration for shooting-star
import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/routes/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      strictMode: true,
    },
  },
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  docs: {
    defaultName: "Documentation",
  },
  // Use custom Vite config to set up path aliases
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      resolve: {
        alias: {
          "~": path.resolve(__dirname, "../app"),
          // Use mock for React Router to avoid loading the full router in Storybook
          "react-router": path.resolve(__dirname, "./mocks/react-router.ts"),
        },
      },
      // Define environment variables to avoid "Dynamic access of import.meta.env" errors
      // when running tests in Storybook UI (browser mode)
      define: {
        "import.meta.env.DEV": JSON.stringify(
          process.env.NODE_ENV !== "production"
        ),
        "import.meta.env.PROD": JSON.stringify(
          process.env.NODE_ENV === "production"
        ),
        "import.meta.env.MODE": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      },
    });
  },
};
export default config;
