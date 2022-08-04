import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Button, Typography } from "antd";
import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";

import axios from "../../../util/axios";

const { Option } = Select;

const newPolicyTypeInitialState = { name: "" };

const PolicyTypeSelect = ({ form, setForm }) => {
  const [newPolicyType, setNewPolicyType] = useState(newPolicyTypeInitialState);
  const [statuses, setStatuses] = useState({});

  const [showNewPolicyTypeOptions, setShowNewPolicyTypeOptions] =
    useState(false);

  const {
    data: policyTypes,
    isLoading,
    refetch,
  } = useQuery(["policyTypes"], () =>
    axios.get("/policy-type").then((res) => res.data.policyTypes)
  );

  const mutation = useMutation(
    (policyType) => {
      return axios.post("/policy-type", policyType);
    },
    {
      onSuccess: () => {
        refetch();
        setShowNewPolicyTypeOptions(false);
        setNewPolicyType({ ...newPolicyTypeInitialState });
      },
      onError: () => {
        setShowNewPolicyTypeOptions(false);
        setNewPolicyType({ ...newPolicyTypeInitialState });
      },
    }
  );

  const nameRef = useRef(null);
  const addressRef = useRef(null);

  const handleNewPolicyTypeChange = (event) => {
    setNewPolicyType({
      ...newPolicyType,
      [event.target.name]: event.target.value,
    });
  };

  const addItem = async (e) => {
    e.preventDefault();
    const statuses = {};

    if (!newPolicyType.name) {
      statuses.name = "error";
    }

    if (Object.keys(statuses).length > 0) {
      return setStatuses(statuses);
    }

    setStatuses({});

    mutation.mutate({ policyType: newPolicyType });
  };

  return (
    <Select
      value={form.policyType}
      onChange={(e) => setForm({ ...form, policyType: e })}
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
          {showNewPolicyTypeOptions ? (
            <div
              style={{
                padding: "0 8px 4px",
              }}
            >
              <div className="custom-dropdown">
                <div className="form-item">
                  <Typography.Text>Policy Type</Typography.Text>
                  <Input
                    placeholder="Policy Type"
                    ref={nameRef}
                    value={newPolicyType.name}
                    name="name"
                    onChange={handleNewPolicyTypeChange}
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
                onClick={() => setShowNewPolicyTypeOptions(true)}
              >
                Add New policy type?
              </Button>
            </div>
          )}
        </>
      )}
    >
      {policyTypes?.map((policyType) => (
        <Option key={policyType.id}>{policyType.name}</Option>
      ))}
    </Select>
  );
};

export default PolicyTypeSelect;
