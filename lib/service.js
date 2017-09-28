const grpc = require('grpc');
const protocol = grpc.load(__dirname + '/proto/controller.proto');

if (!process.env.GRPC_CONTROLLER) {
  console.warn('Environment variable GRPC_CONTROLLER undefined');
  process.exit(1);
}

const controllerAddress = process.env.GRPC_CONTROLLER;

console.log('gRPC: Using: ' + controllerAddress);

module.exports = new protocol.broprox.Controller(
  controllerAddress,
  grpc.credentials.createInsecure()
);
