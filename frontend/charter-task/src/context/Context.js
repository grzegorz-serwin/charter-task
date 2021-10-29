import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [allCustomers, setAllCustomers] = useState([]);
  const [pointsData, setPointsData] = useState([]);
  const [products, setProducts] = useState([]);
  const url = "http://localhost:5000";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllCustomers(data))
      .catch((error) => {
        console.log(error.message);
      });

    fetch(`${url}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const setCurrentCustomerTransactions = (id, productList) => {
    fetch(`${url}/api/transaction`, {
      method: "POST",
      body: JSON.stringify({ customerId: id, productIds: productList }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        return fetch(`${url}/api/points`);
      })
      .then((res) => res.json())
      .then((data) => setPointsData(data.data))
      .catch((error) => {
        console.log(error.message);
      });
  };

  const resetAllTransactions = (id) => {
    fetch(`${url}/api/transactions/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllCustomers(data);
        setPointsData([]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Context.Provider
      value={{
        allCustomers,
        products,
        setCurrentCustomerTransactions,
        resetAllTransactions,
        pointsData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
