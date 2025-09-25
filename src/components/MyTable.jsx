import { Table, Space, Tag, Popconfirm } from "antd";
import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function MyTable({ openDialog, refreshData }) {
  const [dataSource, setDataSource] = useState([]);
  const { data, error, isLoading, mutate } = useSWR("/api/todos", fetcher, {
    revalidateOnFocus: false,
  });

  // data 可能是 { data: [...] } 结构，也可能是直接数组，看后端返回
  const { data: datas = [] } = data || {};

  useEffect(() => {
    if (datas) {
      setDataSource((prev) => {
        // 检查数据是否真的发生变化，避免不必要的更新
        const newData = Array.isArray(datas) ? datas : [];
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return [...newData];
        }
        return prev;
      });
    }
  }, [datas]);

  const statusCount = useMemo(() => {
    if (!dataSource.length) return { enabled: 0, disabled: 0 };
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 删除成功后刷新列表
      if (refreshData) {
        refreshData();
      } else {
        mutate();
      }
    } catch (error) {
      console.error("删除失败:", error);
    }
  };

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
          <Popconfirm title="删除任务" description="确定要删除这个任务吗?" onConfirm={() => handleDelete(record.id)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
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
        <a style={{ marginLeft: 16 }} onClick={() => (refreshData ? refreshData() : mutate())}>
          刷新列表
        </a>
      </div>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default MyTable;
