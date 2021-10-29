import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import Transactions from "./Transactions";

function Customers() {
  const { allCustomers } = useContext(Context);
  const [customer, setCustomer] = useState(null);

  const selectCustomer = (selectedCustomer) => {
    setCustomer(selectedCustomer);
  };

  const customers = allCustomers.map((item) => (
    <button key={item?.id} onClick={() => selectCustomer(item)}>
      {item?.name}
    </button>
  ));

  return (
    <div>
      {customers}
      {customer && <Transactions customer={customer} />}
    </div>
  );
}

export default Customers;
