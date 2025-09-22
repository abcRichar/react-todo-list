import { Table, Space, Tag } from "antd";
import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function MyTable({ openDialog }) {
  const [dataSource, setDataSource] = useState([]);
  const { data, error, isLoading } = useSWR("/api/todos", fetcher, {
    revalidateOnFocus: false,
  });

  // data 可能是 { data: [...] } 结构，也可能是直接数组，看后端返回
  const { data: datas = [] } = data || {};

  useEffect(() => {
    if (datas) {
      setDataSource([...datas]);
    }
  }, [datas]);

  const statusCount = useMemo(() => {
    console.log("计算状态统计");
    return dataSource.reduce(
      (acc, item) => {
        if (item.status === 1) {
          acc.enabled++;
        } else {
          acc.disabled++;
        }
        return acc;
      },
      { enabled: 0, disabled: 0 }
    );
  }, [dataSource]);

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let color = record.status === 1 ? "green" : "red";
        return (
          <Tag color={color} key={record.status}>
            {record.status === 1 ? "启用" : "禁用"}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "opeation",
      key: "opeation",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openDialog("edit", record)}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span>启用状态: {statusCount.enabled}</span>
        <span style={{ marginLeft: 16 }}>禁用状态: {statusCount.disabled}</span>
      </div>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default MyTable;
