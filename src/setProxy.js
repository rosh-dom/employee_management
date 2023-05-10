const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://5914-125-17-251-66.ngrok-free.app/total_leaves',
      changeOrigin: true,
    })
  );
};
