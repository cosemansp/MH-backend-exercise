import { ApolloServer } from 'apollo-server-express';

import schema from './schema';

export default new ApolloServer({
  schema,
  context: context => {
    const { req } = context;
    const enrichedContext = {
      ...context,
      language: req.headers['accept-language'] || 'en',
    };
    return enrichedContext;
  },
  formatError: error => {
    console.error('graphqlErropr', error);
    return error;
  },
});
