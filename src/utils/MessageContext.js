import React, { createContext } from "react";
import { message } from "antd";

// 1. 创建 Context
export const MessageContext = createContext();

// 2. 创建 Provider 组件
export const MessageProvider = ({ children }) => {
    const showMessage = (type, content) => {
        message[type](content);
    };
    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
        </MessageContext.Provider>
    );
};


// hooks写法
/**
 * const { showMessage } = useMessage();
 * showMessage('success', 'xxx');
 * */
export const useMessage = () => {
    return React.useContext(MessageContext);
};