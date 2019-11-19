const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
};
