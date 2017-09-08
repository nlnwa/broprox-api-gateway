require('dotenv').config();
const grpc = require('grpc');
const grpcController =
      grpc.load(__dirname + '/../proto/controller.proto').broprox;

console.warn('gRPC: Using: ' + process.env.GRPC_CONTROLLER);

const client = new grpcController.Controller(
  process.env.GRPC_CONTROLLER,
  grpc.credentials.createInsecure()
);

module.exports = client;
