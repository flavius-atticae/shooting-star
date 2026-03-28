export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Allow scope to reference GitHub issue numbers: feat(#12): description
    "scope-case": [2, "always", ["lower-case", "upper-case", "camel-case", "pascal-case"]],
    // Enforce conventional types
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "docs", "style", "refactor", "perf", "test", "ci", "revert"],
    ],
    // Body and footer are optional
    "body-max-line-length": [1, "always", 100],
  },
};
