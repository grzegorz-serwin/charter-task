const express = require("express");
const cors = require("cors");
const app = express();
const { products, customers } = require("./data/data");
const moment = require("moment");

app.use(cors());
app.use(express.json());

const noPointsPrice = 50;
const doublePointsPrice = 100;

const clearPoints = (customerId) => {
  customers.find(
    (customer) => customer.id === Number(customerId)
  ).transactions = [];
};

const pointsCounter = (choosenProducts) => {
  let price = 0;
  let points = 0;
  choosenProducts.forEach((product) => {
    price += product.price;
  });

  if (price > noPointsPrice && price <= doublePointsPrice) {
    points = price - noPointsPrice;
  } else if (price > doublePointsPrice) {
    points =
      (price - doublePointsPrice) * 2 + (doublePointsPrice - noPointsPrice);
  } else {
    points = 0;
  }
  return points;
};

const getRecords = (customers) => {
  const points = customers.map((customer) => {
    let threeMonthPoints = 0;
    let lastMonthPoints = 0;
    let secondMonthPoints = 0;
    let firstMonthPoints = 0;

    const currentMonth = moment(
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
      "YYYY-MM"
    ).daysInMonth();
    const secondMonth = moment(
      `${new Date().getFullYear()}-${new Date().getMonth()}`,
      "YYYY-MM"
    ).daysInMonth();
    const thirdMonth = moment(
      `${new Date().getFullYear()}-${new Date().getMonth() - 1}`,
      "YYYY-MM"
    ).daysInMonth();

    customer.transactions.forEach((transaction) => {
      const period = Math.abs(
        (new Date().getTime() - transaction.createDate) / (1000 * 3600 * 24)
      );
      if (period <= currentMonth) {
        lastMonthPoints += transaction.points;
      } else if (
        period > currentMonth &&
        period <= currentMonth + secondMonth
      ) {
        secondMonthPoints += transaction.points;
      } else if (
        period > currentMonth + secondMonth &&
        period <= currentMonth + secondMonth + thirdMonth
      ) {
        firstMonthPoints += transaction.points;
      }
      if (period <= currentMonth + secondMonth + thirdMonth) {
        threeMonthPoints += transaction.points;
      }
    });

    return {
      customerId: customer.id,
      customerName: customer.name,
      firstMonthPoints,
      secondMonthPoints,
      lastMonthPoints,
      threeMonthPoints,
    };
  });
  return points;
};

app.get("/", (req, res) => {
  res.status(200).send(customers);
});

app.get("/api/products", (req, res) => {
  res.status(200).send(products);
});

app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  clearPoints(id);
  res.status(200).send(customers);
});

app.post("/api/transaction", (req, res) => {
  const { customerId } = req.body;
  const { productIds } = req.body;
  const customerProducts = [];
  let transactionId = 1;

  const customer = customers.find(
    (customer) => customer.id === Number(customerId)
  );

  if (!customer) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }

  productIds.forEach((productId) => {
    products.forEach((product) => {
      if (productId === product.id) {
        customerProducts.push({
          id: product.id,
          price: product.price,
        });
      }
    });
  });

  const points = pointsCounter(customerProducts);

  customer.transactions.push({
    transactionId: transactionId,
    products: customerProducts,
    createDate: new Date().getTime(),
    points: points,
  });
  transactionId = transactionId + 1;

  res.status(200).json({ success: true, data: customer });
});

app.get("/api/points", (req, res) => {
  const records = getRecords(customers);
  res.status(200).json({ success: true, data: records });
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, () => {
  // console.log("server is listening on port 5000...");
});

module.exports = { pointsCounter };
