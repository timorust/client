import { Layout, Space, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import styles from "./index.module.css";
import { CustomButton } from "../custom-button";

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Consumer</Typography.Title>
          </CustomButton>
        </Link>
      </Space>

      <Space>
        <Link to={Paths.register}>
          <CustomButton type="ghost">Registration</CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="ghost">Login</CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
