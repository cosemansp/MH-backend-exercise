import config, { dumpConfig } from './config';
import app from './express';

dumpConfig(config);

const server = app
  .listen({ port: config.port }, () => {
    // prettier-ignore
    console.log(`Express server listening on: http://localhost:${server.address().port}/graphql`);
  })
  .on('error', err => {
    console.error(err.message);
    process.exit(-1);
  });
