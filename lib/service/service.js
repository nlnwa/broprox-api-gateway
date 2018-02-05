const log = require('../logger');
const grpc = require('grpc');
const config = require('../config');
const address = config.controller.address;

function panic(msg) {
  log.error(msg);
  process.exit(1);
}

if (!address) {
  panic('Environment variable GRPC_CONTROLLER undefined');
}
const port = parseInt(address.split(':')[1]);
if (isNaN(port)) {
  panic(`GRPC_CONTROLLER port is not a number`);
}
if (port <= 0 && port > 65535) {
  panic(`Port ${port} out of range (1-65535)`);
}

module.exports = (Service) =>
  new Service(
    address,
    grpc.credentials.createInsecure()
  );
