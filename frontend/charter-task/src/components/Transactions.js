import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import "./styles/transactions.css";

function Transactions({ customer }) {
  const {
    products,
    setCurrentCustomerTransactions,
    pointsData,
    resetAllTransactions,
    allCustomers,
  } = useContext(Context);
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const selectProducts = (productId) => {
    setSelectedProductsId((prevSelectedproductIds) => [
      ...prevSelectedproductIds,
      productId,
    ]);
  };

  const allProducts = products.map((item) => (
    <div key={item?.id}>
      <button
        onClick={() => {
          selectProducts(item.id);
          addProductToList(item.name, item.price);
        }}
      >
        {item.name}
      </button>{" "}
      {item.price}${" "}
    </div>
  ));

  const clearAllPoints = () => {
    allCustomers.forEach((customer) => {
      resetAllTransactions(customer.id);
    });
  };

  const addProductToList = (productName, productPrice) => {
    setSelectedProducts((prevSelectedproductName) => [
      ...prevSelectedproductName,
      { productName, productPrice },
    ]);
  };

  const customerProducts = selectedProducts.map((item, i) => (
    <div key={i} className="product-list">
      <span>{item.productName}</span>
      <span>{item.productPrice}$</span>
    </div>
  ));

  const pointsHeader = pointsData.map((element, i) => (
    <th key={i}>{element.customerName}</th>
  ));

  const pointsLastMonthRows = pointsData.map((element, i) => (
    <td key={i}>{element.lastMonthPoints}</td>
  ));

  const pointsSecondMonthRows = pointsData.map((element, i) => (
    <td key={i}>{element.secondMonthPoints}</td>
  ));

  const pointsFirstMonthRows = pointsData.map((element, i) => (
    <td key={i}>{element.firstMonthPoints}</td>
  ));

  const pointsThreeMonthRows = pointsData.map((element, i) => (
    <td key={i}>{element.threeMonthPoints}</td>
  ));

  return (
    <div>
      {customer?.name}
      {allProducts}
      {customerProducts}
      {selectedProductsId.length > 0 && (
        <button
          onClick={() => {
            setCurrentCustomerTransactions(customer?.id, selectedProductsId);
            setSelectedProductsId([]);
            setSelectedProducts([]);
          }}
        >
          Send order
        </button>
      )}
      {pointsData.length > 0 && (
        <div>
          <button onClick={() => clearAllPoints()}>Clear all points</button>
          <table>
            <thead>
              <tr>
                <th></th>
                {pointsHeader}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Last month points</th>
                {pointsLastMonthRows}
              </tr>
              <tr>
                <th scope="row">Second month points</th>
                {pointsSecondMonthRows}
              </tr>
              <tr>
                <th scope="row">First month points</th>
                {pointsFirstMonthRows}
              </tr>
              <tr>
                <th scope="row">Last three month points</th>
                {pointsThreeMonthRows}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;
