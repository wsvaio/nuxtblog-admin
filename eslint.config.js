import wsvaio, { vue } from "@wsvaio/eslint-config";

export default wsvaio(
  {
    unocss: true,
    ignores: [
      "node_modules",
      "public",
      "dist",

      "* copy*",
      "auto-import.d.ts",
      "auto-components.d.ts",

      // "**/*.js",
    ],
  },
  vue,
  {
    rules: {
      "ts/consistent-type-definitions": "off",
    },
  }
);
