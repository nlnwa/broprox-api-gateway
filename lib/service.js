const grpc = require('grpc');
const protocol = grpc.load(__dirname + '/proto/controller.proto');
const controllerAddress = process.env.GRPC_CONTROLLER;

if (!controllerAddress) {
  console.error('Environment variable GRPC_CONTROLLER undefined');
  process.exit(1);
}

module.exports = new protocol.broprox.Controller(
  controllerAddress,
  grpc.credentials.createInsecure()
);
