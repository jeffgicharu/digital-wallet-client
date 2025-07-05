import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // The URL of our running GraphQL API
  schema: 'http://localhost:8080/graphql',

  // Files to scan for GraphQL operations (queries, mutations)
  documents: 'src/graphql/**/*.graphql',

  // Where to output the generated files
  generates: {
    './src/graphql/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
