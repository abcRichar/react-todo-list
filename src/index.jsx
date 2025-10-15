import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import { MessageProvider } from "./utils/MessageContext.js"; // 👈 引入我们刚刚写的 Provider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider>
        <MessageProvider>
            <App />
        </MessageProvider>
    </ConfigProvider>
  </React.StrictMode>
);
