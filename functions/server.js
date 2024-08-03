const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/.netlify/functions/server', router);

module.exports.handler = (event, context) => {
  return new Promise((resolve, reject) => {
    server.handle(event, context, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};
