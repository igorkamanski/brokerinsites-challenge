import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Button, Typography } from "antd";
import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";

import axios from "../../../util/axios";

const { Option } = Select;

const newCustomerInitialState = { name: "", address: "" };

const CustomerSelect = ({ form, setForm }) => {
  const [newCustomer, setNewCustomer] = useState(newCustomerInitialState);
  const [statuses, setStatuses] = useState({});

  const [showNewCustomerOptions, setShowNewCustomerOptions] = useState(false);

  const {
    data: customers,
    isLoading,
    refetch,
  } = useQuery(["customers"], () =>
    axios.get("/customer").then((res) => res.data.customers)
  );

  const mutation = useMutation(
    (customer) => {
      return axios.post("/customer", customer);
    },
    {
      onSuccess: () => {
        refetch();
        setShowNewCustomerOptions(false);
        setNewCustomer({ ...newCustomerInitialState });
      },
      onError: () => {
        setShowNewCustomerOptions(false);
        setNewCustomer({ ...newCustomerInitialState });
      },
    }
  );

  const nameRef = useRef(null);
  const addressRef = useRef(null);

  const handleNewCustomerChange = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  const addItem = async (e) => {
    e.preventDefault();
    const statuses = {};

    if (!newCustomer.name) {
      statuses.name = "error";
    }

    if (!newCustomer.address) {
      statuses.address = "error";
    }

    if (Object.keys(statuses).length > 0) {
      return setStatuses(statuses);
    }

    setStatuses({});

    mutation.mutate({ customer: newCustomer });
  };

  return (
    <Select
      value={form.customer}
      onChange={(e) => setForm({ ...form, customer: e })}
      placeholder="Select Customer"
      loading={isLoading}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          {showNewCustomerOptions ? (
            <div
              style={{
                padding: "0 8px 4px",
              }}
            >
              <div className="custom-dropdown">
                <div className="form-item">
                  <Typography.Text>Customer Name</Typography.Text>
                  <Input
                    placeholder="Customer Name"
                    ref={nameRef}
                    value={newCustomer.name}
                    name="name"
                    onChange={handleNewCustomerChange}
                    status={statuses.name}
                  />
                </div>
                <div className="form-item">
                  <Typography.Text>Customer Address</Typography.Text>
                  <Input
                    placeholder="Customer Address"
                    ref={addressRef}
                    value={newCustomer.address}
                    name="address"
                    onChange={handleNewCustomerChange}
                    status={statuses.address}
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
                onClick={() => setShowNewCustomerOptions(true)}
              >
                Add New customer?
              </Button>
            </div>
          )}
        </>
      )}
    >
      {customers?.map((customer) => (
        <Option key={customer.id}>{customer.name}</Option>
      ))}
    </Select>
  );
};

export default CustomerSelect;
