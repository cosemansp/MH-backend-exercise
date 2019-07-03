import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string');
    }
    return new Date(value); // value from the client
  },
  serialize(value) {
    if (value) {
      // sample to show Epoch time
      // return value.getTime(); // value sent to the client
      return value.toISOString();
    }
    return null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});
