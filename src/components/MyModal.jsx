import { Modal, Form } from "antd";
import MyForm from "./MyForm";
function MyModal({ isModalOpen, setIsModalOpen, formStatus, data }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values:", values);
        // 这里可以添加额外的处理逻辑，如 API 请求
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={formStatus === "add" ? "添加" : "编辑"}
      closable={{ "aria-label": "Custom Close Button" }}
      cancelText="取消"
      okText="确定"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <MyForm form={form} formStatus={formStatus} data={data} />
    </Modal>
  );
}

export default MyModal;
