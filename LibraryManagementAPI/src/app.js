require('dotenv').config();
const express = require('express');
const bookRoutes = require('./domains/book/routes');
const memberRoutes = require('./domains/member/routes');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const logger = require('./logger');
const morgan = require('morgan');
const app = express();


app.use(express.json());

app.use(morgan('dev'));
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    logger.info(`Headers: ${JSON.stringify(req.headers)}`);
    logger.info(`Body: ${JSON.stringify(req.body)}`);
    next();
});

// Define Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management API',
            version: '1.0.0',
        },
    },
    apis: ['./src/domains/member/routes.js','./src/domains/book/routes.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);

module.exports = app;
