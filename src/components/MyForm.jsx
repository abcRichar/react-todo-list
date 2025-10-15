import {Switch, Form, Input, InputNumber, message} from "antd";
import {useEffect, useState} from "react";

const MyForm = ({form, formStatus, data}) => {
    const [initForm, setInitForm] = useState({
        name: "",
        age: 0,
        address: "",
        status: 1,
    });

    const onFinish = (values) => {
        console.log("Success:", values);
        form.resetFields();
        // 将 values 传递给父组件
        if (typeof form.onFinish === "function") {
            form.onFinish(values);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        form.resetFields();
    };

    useEffect(() => {
        console.log("data", data, "回显");

        const newInitForm =
            formStatus === "add"
                ? {
                    name: "",
                    age: 1,
                    address: "",
                    status: 1,
                }
                : data;
        setInitForm(newInitForm);
        // 使用setFieldsValue来更新表单值，而不是依赖initialValues
        form.setFieldsValue(newInitForm);
        console.log("initForm", newInitForm);
    }, [formStatus, data, form]);

    return (
        <Form
            name="basic"
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            style={{maxWidth: 600}}
            initialValues={{...initForm}}
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item label="名称" name="name" rules={[{required: true, message: "请输入名称"}]}>
                <Input placeholder="请输入名称"/>
            </Form.Item>

            <Form.Item label="年龄" name="age" rules={[{required: true, message: "请输入年龄"}]}>
                <InputNumber min={1} max={100} placeholder="请输入年龄" style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item label="地址" name="address" rules={[{required: true, message: "请输入地址"}]}>
                <Input placeholder="请输入地址"/>
            </Form.Item>
            <Form.Item label="状态" name="status">
                <Switch checkedChildren="启用" unCheckedChildren="禁用"/>
            </Form.Item>
        </Form>
    );
};

export default MyForm;
