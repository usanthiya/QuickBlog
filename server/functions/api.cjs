const serverless = require('serverless-http');
const app = require('../server.cjs');
module.exports.handler = async (event, context) => {
  return serverless(app)(event, context);
};
