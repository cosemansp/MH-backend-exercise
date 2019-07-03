import axios from 'axios';
import assert from 'assert';

import config from '../config';

// default axios setup
axios.defaults.baseURL = config.githubBaseUrl;
if (config.githubToken) {
  // eslint-disable-next-line dot-notation
  axios.defaults.headers.common['Authorization'] = `token ${config.githubToken}`;
}

// map raw github commit to more usefull object
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
  const url = `/repos/${owner}/${repo}/git/commits/${commitSha}`;
  try {
    const res = await axios.get(url);
    return commitMapper(res.data);
  } catch (err) {
    if (err.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to retrieve commit from GitHub: ${err.message}`);
  }
};

// curl -H "Authorization: token 42ce43967266966416c0b790e414d26......" https://api.github.com/repos/cosemansp/setup-sls-graphql/git/commits/10e760608dca9f767bf6d3d40c22324fb02ebd05
// curl -H "Authorization: token 42ce43967266966416c0b790e414d26......" https://api.github.com/repos/propchain/propchain-api/git/commits/aa76e5b2ed1bf1600e1fb1829b453786b667883c
