const products = [
  {
    id: 1,
    name: "cd",
    price: 15,
    desc: `Standard carrier`,
  },
  {
    id: 2,
    name: "pendrive",
    price: 30,
    desc: `Portable memory`,
  },
  {
    id: 3,
    name: "hdd",
    price: 80,
    desc: `Standard hard drive`,
  },
  {
    id: 4,
    name: "floppy disc",
    price: 5,
    desc: `For retro fans`,
  },
  {
    id: 5,
    name: "ssd",
    price: 150,
    desc: `Fast hard drive`,
  },
];

const customers = [
  { id: 1, name: "Mike", transactions: [] },
  { id: 2, name: "Greg", transactions: [] },
  { id: 3, name: "Anna", transactions: [] },
];
module.exports = { products, customers };
