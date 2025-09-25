import { Modal, Form } from "antd";
import MyForm from "./MyForm";

function MyModal({ isModalOpen, setIsModalOpen, formStatus, data, refreshData }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Received values:", values);
        console.log(data, "传入的data");

        console.log("当前", formStatus);

        try {
          const url = formStatus === "add" ? "/api/todos" : `/api/todos/${data?.id || ""}`;
          const response = await fetch(url, {
            method: formStatus === "add" ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log("Success:", result);
          // 添加或编辑成功后刷新列表
          if (refreshData) {
            refreshData();
          }

          // 请求成功后关闭模态框
          setIsModalOpen(false);
          // 这里可以添加成功后的回调或其他操作
        } catch (error) {
          console.error("Error:", error);
        }
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal title={formStatus === "add" ? "添加" : "编辑"} closable={{ "aria-label": "Custom Close Button" }} cancelText="取消" okText="确定" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <MyForm form={form} formStatus={formStatus} data={data} />
    </Modal>
  );
}

export default MyModal;
