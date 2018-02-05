const grpc = require('grpc');
const protocol = grpc.load('./lib/proto/report.proto');
const service = require('./service');

module.exports = service(protocol.veidemann.api.Report);
