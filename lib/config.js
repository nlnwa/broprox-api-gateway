module.exports = {
  port: process.env.PORT || '3010',
  host: process.env.HOST || '0.0.0.0',
  prefix: '/api',
  cors: {
    origin: '*',
  },
  error: {
    postFormat: (e, obj) => {
      if (process.env.NODE_ENV === 'production') delete obj.stack;
      return obj;
    },
  },
  bearer: {
    queryKey: 'access_token',
    bodyKey: 'access_token',
    headerKey: 'Bearer',
    stateKey: 'token',
  },
  controller: {
    bearerTokenKey: 'Bearer',
    address: process.env.GRPC_CONTROLLER || '',
  },
};
