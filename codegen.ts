import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/typeDefs.graphql",
  generates: {
    "./src/__generated__/typeDefs.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          Book: "../Book#Book",
          Author: "../Author#Author",
        },
        mapperTypeSuffix: "Type",
      },
    },
  },
};
export default config;
