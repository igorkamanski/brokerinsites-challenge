import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import axios from "../../util/axios";
import { deepSearch, getColumns, policyDataParser } from "../../constants";

import "./Home.css";
import NewPolicyModal from "./NewPolicyModal/NewPolicyModal";

const { Search } = Input;

const Home = () => {
  const { data, isLoading, refetch } = useQuery(["policy"], () =>
    axios.get(`/policy`).then((res) => res.data)
  );

  const [sortedInfo, setSortedInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [policyModalVisible, setPolicyModalVisible] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoading && data?.policies) {
      setTableData(deepSearch(data.policies.map(policyDataParser), search));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  const handleChange = (_, __, sorter) => {
    setSortedInfo(sorter);
  };

  const handleSearch = (value) => {
    if (data.policies) {
      setTableData(deepSearch(data.policies.map(policyDataParser), value));
    }
  };

  return (
    <>
      <div className="container">
        <div className="home-header">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setPolicyModalVisible(true)}
          >
            New Policy
          </Button>
        </div>
        <Typography.Title>Policies</Typography.Title>
        <Search
          className="search-container"
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ width: 200 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table
          rowKey={"id"}
          loading={isLoading}
          columns={getColumns(sortedInfo)}
          dataSource={tableData}
          onChange={handleChange}
          pagination={{
            hideOnSinglePage: true,
            total: tableData?.length,
            pageSize: 10,
          }}
        />
      </div>
      <NewPolicyModal
        visible={policyModalVisible}
        setVisible={setPolicyModalVisible}
        refetch={refetch}
      />
    </>
  );
};

export default Home;
