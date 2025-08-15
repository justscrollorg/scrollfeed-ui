const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy /api/memes/* to /memes-api/*
  app.use(
    '/api/memes',
    createProxyMiddleware({
      target: 'http://localhost:3000', // This will be overridden by your ingress in production
      changeOrigin: true,
      pathRewrite: {
        '^/api/memes': '/memes-api', // Rewrite /api/memes to /memes-api
      },
    })
  );

  // Keep existing proxy rules for other services
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // Keep /api as is for video service
      },
    })
  );

  app.use(
    '/news-api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );

  app.use(
    '/articles-api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );

  app.use(
    '/jokes-api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );

  app.use(
    '/analytics-api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
};
