// const swagger = swaggerAutogen();
// import config from 'config';
const  swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    app_version: '1.0.0',
    title: 'Wallet API`s', // by default: "REST API"
    description: 'Documentation', // by default: ""
  },
  host: 'localhost:8000', // by default: "localhost:3000"
  basePath: '/', // by default: "/"
  schemes: ['http', 'https'],
  consumes: ['application/json', 'application/x-www-form-urlencoded'],
  produces: ['application/json'],
  tags: [
    // by default: empty Array
    {
      name: 'Open', // Tag name
      description: 'Open Endpoints', // Tag description
    },
    {
      name: 'Stats',
      description: 'Stats of all Open Apis',
    }
  ],

  securityDefinitions: {
    AccessToken: {
      type: 'apiKey',
      in: 'header',
      name: 'x-access-token',
      description:
        'Please provide the valid access token, if you dont have please login and get the token as response!',
    },
    // Bearer: {
    //     type: 'apiKey',
    //     name: 'Authorization',
    //     in: 'header',
    //     description: 'Enter your bearer token in the format Bearer &lt;token>',
    // },
  }, // by default: empty object
  definitions: {
    ip: {
      ip: '::1',
    },
    apis: {
      apis: [
        '/app/network/:network/:currency',
        '/app/history/:network/:coin/:currency/:range',
      ],
    },
    source: {
      source: ['Edge,Chrome'],
    },
    relative: {
      network: 'coingecko',
      coins: 'btc',
      currency: 'usd',
    },
  },
};

const outputFile = './swagger-api-view.json';
const endpointsFiles = ['./../../index.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

  swaggerAutogen(outputFile, endpointsFiles, doc);