// fetchRequest.js
class FetchRequest {
  constructor(baseConfig = {}) {
    this.baseURL = baseConfig.baseURL || "";
    this.headers = baseConfig.headers || {};
    this.timeout = baseConfig.timeout || 10000;

    // 拦截器
    this.interceptors = {
      request: (config) => config,
      response: (response) => response,
    };
  }

  // 内部请求封装
  async request(url, options = {}) {
    let controller = new AbortController();
    let timeoutId;

    // 合并配置
    let config = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    };

    // 执行请求拦截器
    config = this.interceptors.request(config);

    // 超时处理
    timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      let response = await fetch(this.baseURL + url, config);

      // 自动解析 JSON
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // 执行响应拦截器
      return this.interceptors.response({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data,
      });
    } catch (err) {
      return Promise.reject(err);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // 常用方法封装
  get(url, config = {}) {
    return this.request(url, { ...config, method: "GET" });
  }

  post(url, body, config = {}) {
    return this.request(url, { ...config, method: "POST", body });
  }

  put(url, body, config = {}) {
    return this.request(url, { ...config, method: "PUT", body });
  }

  delete(url, config = {}) {
    return this.request(url, { ...config, method: "DELETE" });
  }
}

// 导出单例
const fetchRequest = new FetchRequest({
  baseURL: "/api",
  timeout: 8000,
});

export default fetchRequest;
