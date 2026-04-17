import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default [
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "no-console": ["warn", { allow: ["error", "warn"] }],
      "prefer-const": "error",
      "no-var": "error",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
    },
  },
  {
    files: ["*.config.js", "*.config.cjs", "jest.setup.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
