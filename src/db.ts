import { FieldDefinition, Product } from "./helper";
import fs from "node:fs";



type Database = {
  categories: string[];
  productFields: {
    [key: string]: FieldDefinition[];
  };
  products: Product[];
};

let db: Database = {
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
try{
  const jsonString = fs.readFileSync('./dist/db.json',{encoding: "utf8"});
  db = JSON.parse(jsonString);
} catch(e){

}


function getCategories() {
  return db.categories;
}

function getData() {
  return db.products;
}

function getDataByType(type: string) {
  return db.products.filter((el) => el.type === type);
}

function getFieldsByType(productType: string) {
  return db.productFields[productType];
}

function addProduct(data: Product) {
  db.products.push(data);
  try{
    fs.writeFileSync('./dist/db.json', JSON.stringify(db), {encoding:"utf8"})
  } catch (error){
    console.log('DB was not persisted due to error ' + error);
  }
}
export default { getData, getDataByType, getCategories, getFieldsByType, addProduct };
