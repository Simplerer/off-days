const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connections');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  formatError(error) {
    console.log(error);
    return error;
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

const startServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  await db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  });
};

startServer(typeDefs, resolvers)