export const getColumns = (sortedInfo) => [
  {
    title: "Customer Name",
    dataIndex: "customer_name",
    key: "customer_name",
    sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
    sortOrder:
      sortedInfo.columnKey === "customer_name" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Customer Address",
    dataIndex: "customer_address",
    key: "customer_address",
    sorter: (a, b) => a.customer_address.localeCompare(b.customer_address),
    sortOrder:
      sortedInfo.columnKey === "customer_address" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Policy Type",
    dataIndex: "policy_type",
    key: "policy_type",
    sorter: (a, b) => a.policy_type.localeCompare(b.policy_type),
    sortOrder: sortedInfo.columnKey === "policy_type" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Premium",
    dataIndex: "premium",
    key: "premium",
    sorter: (a, b) => a.premium - b.premium,
    sortOrder: sortedInfo.columnKey === "premium" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Insurer Name",
    dataIndex: "insurer_name",
    key: "insurer_name",
    sorter: (a, b) => a.insurer_name.localeCompare(b.insurer_name),
    sortOrder:
      sortedInfo.columnKey === "insurer_name" ? sortedInfo.order : null,
    ellipsis: true,
  },
];

export const policyDataParser = (policy) => ({
  id: policy.id,
  customer_name: policy.customer.name,
  customer_address: policy.customer.address,
  policy_type: policy.policyType.name,
  premium: policy.premium,
  insurer_name: policy.insurer.name,
});

export const deepSearch = (array, value) =>
  array.filter((item) => {
    return Object.keys(item).some((key) => {
      if (String(item[key]).toLowerCase().includes(value.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  });
