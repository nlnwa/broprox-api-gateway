const grpc = require('grpc');
const protocol = grpc.load('./lib/proto/controller.proto');
const service = require('./service');

module.exports = service(protocol.veidemann.api.Controller);
