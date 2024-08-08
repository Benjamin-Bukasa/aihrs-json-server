const { createServer } = require('http');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

const PORT = process.env.PORT || 9000;

createServer(server).listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
