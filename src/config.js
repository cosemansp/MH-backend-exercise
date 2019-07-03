import pkg from '../package.json';

const NODE_ENV = process.env.NODE_ENV || 'development';

// application config object
// can be extended with .env files
const theConfig = {
  env: NODE_ENV, // development | production | test
  port: 4000,
  githubBaseUrl: 'https://api.github.com',
  githubToken: process.env.GITHUB_TOKEN || '',
};

export function dumpConfig(config) {
  console.log(`-------- '${pkg.name}' started: v${pkg.version} --------`);
  console.log(`  NODE_ENV:        ${config.env}`);
  console.log(`  GITHUB_TOKEN:    ${config.githubToken || '-'}`);
  console.log(`  Port:            ${config.port}`);
  console.log(`  GithubBaseUrl:   ${config.githubBaseUrl}`);
  console.log(`--------------------------------------------------------`);
}

export default theConfig;
