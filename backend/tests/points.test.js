const { pointsCounter } = require("../server");

test("points from products are equal 0", () => {
  expect(
    pointsCounter([
      {
        id: 1,
        price: 50,
      },
    ])
  ).toBe(0);
});

test("points from products are equal 30", () => {
  expect(
    pointsCounter([
      {
        id: 1,
        price: 50,
      },
      {
        id: 2,
        price: 30,
      },
    ])
  ).toBe(30);
});

test("points from products are equal 70", () => {
  expect(
    pointsCounter([
      {
        id: 1,
        price: 50,
      },
      {
        id: 2,
        price: 60,
      },
    ])
  ).toBe(70);
});
