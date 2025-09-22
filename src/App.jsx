import "./App.css";
import { Button, Divider } from "antd";
import { useState } from "react";
import MyTable from "./components/MyTable";
import MyModal from "./components/MyModal";
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("add");
  const [rawData, setRawData] = useState({});

  function openDialog(type, row) {
    console.log(type, row);
    if (type === "edit") {
      setRawData(row);
    }
    setFormStatus(type);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="contianer">
        <MyModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formStatus={formStatus}
          data={rawData}
        />
        <div className="header">
          <h2> TASK OA管理系统</h2>
          <Button type="primary" onClick={() => openDialog("add")}>
            新增任务
          </Button>
        </div>
        <Divider />
        <div>
          <MyTable openDialog={openDialog} />
        </div>
      </div>
    </>
  );
};

export default App;
