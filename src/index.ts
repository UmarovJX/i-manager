import reader from "./reader";
import Controller from "./dbController";
import { dbInterface } from "./db";
console.log("Hello");

const controller = new Controller(dbInterface);

async function main() {
  const answer = (
    await reader.question(
      `Команды "add product" - добавить продукт,
      "show list" - показать список введенных продуктов
      "exit" - выйти из программы:  `
    )
  ).toLowerCase();

  switch (true) {
    case answer.startsWith("show list"):
      await controller.showList(answer);
      break;
    case answer.startsWith("add product"):
      await controller.addProduct();
      break;
    case answer === "exit":
      console.log("\nGoodbye!");
      process.exit(0);
      break;
    default:
      console.log("Такой команды не существует либо вы опечатались.");
  }
  main();
}

main();
