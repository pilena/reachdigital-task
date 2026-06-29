import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
