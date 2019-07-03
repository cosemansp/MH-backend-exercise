import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import { DateTime } from './scalar';
import * as github from '../services/github';

export const typeDefs = gql`
  scalar DateTime

  enum VerifiedReason {
    """
    The key that made the signature is expired.
    """
    expired_key
    """
    The "signing" flag is not among the usage flags in the GPG key that made the signature.
    """
    not_signing_key
    """
    There was an error communicating with the signature verification service.
    """
    gpgverify_error
    """
    The signature verification service is currently unavailable.
    """
    gpgverify_unavailable
    """
    The object does not include a signature.
    """
    unsigned
    """
    A non-PGP signature was found in the commit.
    """
    unknown_signature_type
    no_user
    unverified_email
    bad_email
    unknown_key
    malformed_signature
    invalid
    valid
  }

  type User {
    name: String
    email: String
    date: DateTime
  }

  type Node {
    sha: String
    url: String
  }

  # Signature Verification Object
  type CommitVerification {
    verified: Boolean
    reason: VerifiedReason
    signature: String
    payload: String
  }

  # Git Commit
  type Commit {
    sha: String
    url: String
    nodeId: String
    htmlUrl: String
    author: User
    committer: User
    tree: Node
    message: String
    parents: [Node]
    verification: CommitVerification
  }

  # The root Query
  type Query {
    commit(ower: String, repo: String, commitSha: String!): Commit
  }
`;

const resolvers = {
  DateTime,
  Query: {
    commit: (root, args) => {
      const { owner, repo, commitSha } = args;
      return github.getCommit(
        owner || 'cosemansp',
        repo || 'setup-sls-graphql',
        commitSha || '10e760608dca9f767bf6d3d40c22324fb02ebd05',
      );
    },
  },
  Commit: {
    nodeId: commit => commit.node_id,
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
