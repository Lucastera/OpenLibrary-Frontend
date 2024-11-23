// 该服务为 vercel serve跨域处理
import { createProxyMiddleware } from 'http-proxy-middleware';

export default (req, res) => {
  let target = "";
  if (req.url.startsWith("/api_1_0")) {
    // 这里使用/api可能会与vercel serverless 的 api 路径冲突，根据接口进行调整
    target = "http://120.25.76.18"; // 这里就是在vite中配置的一样
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onError(err, req, res) {
      console.error(err);
      res.status(500).send('Proxy error');
    },
  })(req, res);
};