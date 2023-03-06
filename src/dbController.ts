import db from "./db";
import { Product } from "./helper";
import reader from "./reader";

export default class Controller {
  static async showList() {
    console.log(JSON.stringify(db.getData(), null, 4));
  }

  static async addProduct() {
    let productType = await reader.question(
      "Введите тип продукта. Доступные типы: " +
        db.getCategories().join(",") +
        ": "
    );
    if (!db.getCategories().includes(productType))
      return console.log("Такой типа продукта не существует");
    db.addProduct(await Controller.getFields(productType));
    console.log("Продукт добавлен");
  }

  private static async getFields(productType: string): Promise<Product> {
    const fieldDefinition = db.getFieldsByType(productType);
    const res: Product = { type: productType };
    let i = 0;
    while (true) {
      const [prop, prompt, typeTag] = fieldDefinition[i];
      let answer = await reader.question(prompt + " ");
      if (typeTag === "number") {
        const val = parseInt(answer);
        if (Number.isNaN(val)) {
          console.log("Необходимо ввести число!");
          continue;
        }
        res[prop] = val;
      } else res[prop] = answer;

      i++;
      if (i === fieldDefinition.length) break;
    }
    return res;
  }
}
