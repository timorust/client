import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/custom-button";
import { Layout } from "../../components/layout";
import { Table } from "antd";
import { useGetAllConsumersQuery } from "../../app/services/consumers";
import type { ColumnsType } from "antd/es/table";
import { Consumer } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";

const columns: ColumnsType<Consumer> = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Medical Information",
    dataIndex: "diagnoz",
    key: "diagnoz",
  },
];
export const Consumers = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllConsumersQuery();
  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={() => null}
        icon={<PlusCircleOutlined />}
      >
        Add
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.consumer}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
