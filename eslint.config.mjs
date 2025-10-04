import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow the use of `any` type (from your previous request)
      "@typescript-eslint/no-explicit-any": "off",

      // Ignore unused variables and imports
      "@typescript-eslint/no-unused-vars": "off",

      // Allow unescaped apostrophes and other entities in JSX
      "react/no-unescaped-entities": "off",

      // Allow using standard <a> tags for internal navigation
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;