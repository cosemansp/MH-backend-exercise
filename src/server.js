// import { ApolloServer } from 'apollo-server';
// import { typeDefs, resolvers } from './graphql/schema';

// // In the most basic sense, the ApolloServer can be started
// // by passing type definitions (typeDefs) and the resolvers
// // responsible for fetching the data for those types.
// const server = new ApolloServer({ typeDefs, resolvers });

// // This `listen` method launches a web-server.  Existing apps
// // can utilize middleware options, which we'll discuss later.
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

import config from './config';
import app from './express';

const server = app
  .listen({ port: config.port }, () => {
    // prettier-ignore
    console.log(`Express server listening on: http://localhost:${server.address().port}/graphql`);
  })
  .on('error', err => {
    console.error(err.message);
    process.exit(-1);
  });
