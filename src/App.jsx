import "./App.css";
import { Button, Divider } from "antd";
import { useState, useEffect } from "react";
import MyTable from "./components/MyTable";
import MyModal from "./components/MyModal";
import useSWR, { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("add");
  const [rawData, setRawData] = useState({});
  const [tableData, setTableData] = useState([]);

  const { data, error, isLoading, mutate } = useSWR("/api/todos", fetcher, {
    revalidateOnFocus: false,
  });

  // data 可能是 { data: [...] } 结构，也可能是直接数组，看后端返回
  const { data: datas = [] } = data || {};
  useEffect(() => {
    if (datas) {
      setTableData((prev) => {
        // 检查数据是否真的发生变化，避免不必要的更新
        const newData = Array.isArray(datas) ? datas : [];
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return [...newData];
        }
        return prev;
      });
    }
  }, [datas]);

  function openDialog(type, row) {
    console.log(type, row);
    if (type === "edit") {
      setRawData(row);
    }
    setFormStatus(type);
    setIsModalOpen(true);
  }
  // if (error) return "An error has occurred.";
  // if (isLoading) return "Loading...";

  return (
    <>
      <div className="contianer">
        <MyModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formStatus={formStatus}
          data={rawData}
          refreshData={mutate}
        />
        <div className="header">
          <h2> TASK OA管理系统</h2>
          <Button type="primary" onClick={() => openDialog("add")}>
            新增任务
          </Button>
        </div>
        <Divider />
        <div>
          <MyTable openDialog={openDialog} tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default App;
