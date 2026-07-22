import readline from "node:readline/promises";

async function askForBirthday(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await rl.question("When is your birthday?");
  rl.close();
  return answer || "";
}

function isValidDate(date: Date): date is Date {
  return date instanceof Date && date.toString() !== "Invalid Date";
}

Error();
URIError();
TypeError();
RangeError();
ReferenceError();
SyntaxError();
EvalError();

function parse(birthday: string) {
  const date = new Date(birthday);
  if (isValidDate(date)) {
    return date;
  }
  throw new SyntaxError("Date format invalid (YYYY-MM-DD)");
}

const userInput = await askForBirthday();
try {
  const date = parse(userInput);
  console.log(date);
  console.log(`Your birthday is ${date.toISOString()}`);
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
