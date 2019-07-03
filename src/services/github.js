import axios from 'axios';
import assert from 'assert';

import config from '../config';

export const commitMapper = source => {
  const target = {
    ...source,
    author: {
      ...source.author,
      date: new Date(source.author.date),
    },
    committer: {
      ...source.committer,
      date: new Date(source.committer.date),
    },
  };
  return target;
};

export const getCommit = async (owner, repo, commitSha) => {
  assert(owner, 'Missing required parameter: owner');
  assert(repo, 'Missing required parameter: repo');
  assert(commitSha, 'Missing required parameter: commitSha');
  const url = `${config.githubBaseUrl}/repos/${owner}/${repo}/git/commits/${commitSha}`;
  console.log(url);
  const result = await axios.get(url, {
    headers: {
      Authorization: `token ${'42ce43967266966416c0b790e414d26ace2b5bea'}`,
    },
  });

  // map to more usefull object
  return commitMapper(result.data);
};

// curl -H "Authorization: token 42ce43967266966416c0b790e414d26ace2b5bea" https://api.github.com/repos/cosemansp/setup-sls-graphql/git/commits/10e760608dca9f767bf6d3d40c22324fb02ebd05
// curl -H "Authorization: token 42ce43967266966416c0b790e414d26ace2b5bea" https://api.github.com/repos/propchain/propchain-api/git/commits/aa76e5b2ed1bf1600e1fb1829b453786b667883c
