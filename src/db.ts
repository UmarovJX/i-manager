import { FieldDefinition, Product } from "./helper";

type Database = {
  categories: string[];
  productFields: {
    [key: string]: FieldDefinition[];
  };
  products: Product[];
};

const db: Database = {
  categories: ["TV", "Smartphone"],
  productFields: {
    TV: [
      ["name", "Введите название продукта:", "string"],
      ["size", "Введите диагональ TV:", "number"],
      ["year", "Введите год производства:", "number"],
    ],
    Smartphone: [
      ["name", "Введите название продукта:", "string"],
      ["manufacturer", "Введите производителя:", "string"],
      ["RAM", "Введите объем оперативной памяти:", "number"],
    ],
  },
  products: [
    { type: "TV", name: "LG-9000", size: 43, year: 2009 },
    { type: "Smartphone", name: "Fold Z", manufacturer: "Samsung", RAM: 16 },
  ],
};

function getCategories() {
  return db.categories;
}

function getData() {
  return db.products;
}

function getDataByType(type: string) {
  return db.products.filter((el) => el.type === type);
}

export default { getData, getDataByType, getCategories };
