import { IDB } from "./db";
import { Product } from "./helper";
import reader from "./reader";

export default class Controller {
  private db: IDB;
  constructor(dbi: IDB) {
    this.db = dbi;
  }
  async showList(prompt: string) {
    console.log(JSON.stringify(this.db.getData(), null, 4));
  }
  async addProduct() {
    let productType = await reader.question(
      "Введите тип продукта. Доступные типы: " +
        this.db.getCategories().join(",") +
        ": "
    );
    if (!this.db.getCategories().includes(productType))
      return console.log("Такого типа продукта не существует");
    this.db.addProduct(await this.getFields(productType));
    console.log("Продукт добавлен");
  }

  private async getFields(productType: string): Promise<Product> {
    const fieldDefinition = this.db.getFieldsByType(productType);
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
