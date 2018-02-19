module.exports = {
  port: parseInt(process.env.PORT, 10) || 3010,
  host: process.env.HOST || '0.0.0.0',
  prefix: process.env.PATH_PREFIX || '/api',
  cors: {
    origin: process.env.CORS_ALLOW_ORIGIN || '*',
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
    address: process.env.GRPC_CONTROLLER || '',
  },
};
