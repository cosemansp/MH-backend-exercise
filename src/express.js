import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import asyncify from 'express-asyncify';

import apiRoutes from './api';
import graphqlServer from './graphql/server';
import errorHandler from './api/middleware/errorHandler';

//
// Create server app
//
const app = asyncify(express());

//
// Middleware
//
app.use(bodyParser.json());
app.use(cors());

//
// Routes
//
app.use('/api', apiRoutes);

// Attach the graphql server to express
graphqlServer.applyMiddleware({ app });

// Final fallback
app.all('/*', async (req, res) =>
  res.status(404).json({
    code: 'NotFound',
    message: 'Resource not found or method not supported',
  }),
);

// Error handlers
app.use(errorHandler);

export default app;
