import { InputNumber, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "../../../util/axios";
import CustomerSelect from "./CustomerSelect";
import InsurerSelect from "./InsurerSelect";

import "./NewPolicyModal.css";
import PolicyTypeSelect from "./PolicyTypeSelect";

const initialState = {
  premium: "",
  insurer: "",
  customer: "",
  policyType: "",
};

const NewPolicyModal = ({ visible, setVisible, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  const mutation = useMutation((policy) => axios.post("/policy", policy), {
    onSuccess: () => {
      refetch();
      setConfirmLoading(false);
      setVisible(false);
    },
    onError: () => {
      setConfirmLoading(false);
      setVisible(false);
    },
  });

  useEffect(() => {
    setForm({ ...initialState });
  }, [visible]);

  const handleOk = () => {
    if (
      Object.keys(form)
        .map((key) => Boolean(form[key]))
        .includes(false)
    ) {
      return;
    }

    setConfirmLoading(true);
    mutation.mutate({ policy: form });
  };

  const handleCancel = () => {
    if (confirmLoading) {
      return;
    }
    setVisible(false);
  };

  const handleChange = (value) => {
    setForm({ ...form, premium: value });
  };

  return (
    <>
      <Modal
        title="Create new policy"
        visible={visible}
        onOk={handleOk}
        okText="Create"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelButtonProps={{ disabled: confirmLoading }}
      >
        <div className="form-item">
          <Typography.Text>Customer</Typography.Text>
          <CustomerSelect form={form} setForm={setForm} />
        </div>
        <div className="form-item">
          <Typography.Text>Policy Type</Typography.Text>
          <PolicyTypeSelect form={form} setForm={setForm} />
        </div>
        <div className="form-item">
          <Typography.Text>Premium</Typography.Text>
          <InputNumber
            className="input-number"
            value={form.premium}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <Typography.Text>Insurer</Typography.Text>
          <InsurerSelect form={form} setForm={setForm} />
        </div>
      </Modal>
    </>
  );
};

export default NewPolicyModal;
