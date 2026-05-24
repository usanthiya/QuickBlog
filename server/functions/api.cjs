const serverless = require('serverless-http');
module.exports.handler = async (event, context) => {
  const { default: app } = await import('../server.js');
  return serverless(app)(event, context);
};
