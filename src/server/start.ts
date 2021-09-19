import { ApolloServer } from 'apollo-server';
import { typeDefs } from '../graphql/typedefs';
import { resolvers } from '../graphql/resolvers';
require('dotenv').config();

declare var process: { env: { [key: string]: string } };

const start = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    debug: true,
    cors: {
      origin: ['http://localhost:8100'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });

  // The `listen` method launches a web server.
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
