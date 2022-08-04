import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Button, Typography } from "antd";
import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";

import axios from "../../../util/axios";

const { Option } = Select;

const newInsurerInitialState = { name: "" };

const InsurerSelect = ({ form, setForm }) => {
  const [newInsurer, setNewInsurer] = useState(newInsurerInitialState);
  const [statuses, setStatuses] = useState({});

  const [showNewInsurerOptions, setShowNewInsurerOptions] = useState(false);

  const {
    data: insurers,
    isLoading,
    refetch,
  } = useQuery(["insurers"], () =>
    axios.get("/insurer").then((res) => res.data.insurers)
  );

  const mutation = useMutation(
    (insurer) => {
      return axios.post("/insurer", insurer);
    },
    {
      onSuccess: () => {
        refetch();
        setShowNewInsurerOptions(false);
        setNewInsurer({ ...newInsurerInitialState });
      },
      onError: () => {
        setShowNewInsurerOptions(false);
        setNewInsurer({ ...newInsurerInitialState });
      },
    }
  );

  const nameRef = useRef(null);

  const handleNewInsurerChange = (event) => {
    setNewInsurer({
      ...newInsurer,
      [event.target.name]: event.target.value,
    });
  };

  const addItem = async (e) => {
    e.preventDefault();
    const statuses = {};

    if (!newInsurer.name) {
      statuses.name = "error";
    }

    if (Object.keys(statuses).length > 0) {
      return setStatuses(statuses);
    }

    setStatuses({});

    mutation.mutate({ insurer: newInsurer });
  };

  return (
    <Select
      value={form.insurer}
      onChange={(e) => setForm({ ...form, insurer: e })}
      placeholder="Select Policy Type"
      loading={isLoading}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          {showNewInsurerOptions ? (
            <div
              style={{
                padding: "0 8px 4px",
              }}
            >
              <div className="custom-dropdown">
                <div className="form-item">
                  <Typography.Text>Insurer Name</Typography.Text>
                  <Input
                    placeholder="Insurer Name"
                    ref={nameRef}
                    value={newInsurer.name}
                    name="name"
                    onChange={handleNewInsurerChange}
                    status={statuses.name}
                  />
                </div>

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addItem}
                  loading={mutation.isLoading}
                >
                  Add
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-center">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowNewInsurerOptions(true)}
              >
                Add New insurer?
              </Button>
            </div>
          )}
        </>
      )}
    >
      {insurers?.map((insurer) => (
        <Option key={insurer.id}>{insurer.name}</Option>
      ))}
    </Select>
  );
};

export default InsurerSelect;
