import reader from "./reader";

async function main() {
  console.log("Hello");
  const answer = (await reader.question("?")).toLowerCase();

  switch (true) {
    case answer.startsWith("show list"):
      //
      break;
    case answer === "add product":
      //
      break;
    case answer === "exit":
      console.log("\nGoodbye!");
      process.exit(0);
      break;
  }
  main();
}

main();
