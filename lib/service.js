const grpc = require('grpc');
const protocol = grpc.load(__dirname + '/lib/../proto/controller.proto')
const controllerAddress = process.env.GRPC_CONTROLLER;

console.log('gRPC: Using: ' + controllerAddress);

module.exports = new protocol.broprox.Controller(
  controllerAddress,
  grpc.credentials.createInsecure()
);
