const log = require('./logger');
const grpc = require('grpc');
const protocol = grpc.load(__dirname + '/proto/controller.proto');
const config = require('./config');
const address = config.controller.address;

try {
  if (!address) {
    throw new Error('Environment variable GRPC_CONTROLLER undefined');
  }
  const port = parseInt(address.split(':')[1]);
  if (isNaN(port)) {
    throw new Error(`GRPC_CONTROLLER port is not a number`);
  }
  if (port <= 0 && port > 65535) {
    throw new Error(`Port ${port} out of range (1-65535)`);
  }
} catch (error) {
  log.error(error.message);
  process.exit(1);
}

module.exports = new protocol.broprox.Controller(
  address,
  grpc.credentials.createInsecure()
);
