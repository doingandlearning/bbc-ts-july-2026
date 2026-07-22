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

type ErrorCodes = "E101" | "E102";

class InvalidDateError extends Error {
  public code: ErrorCodes;

  constructor(message: string, code: ErrorCodes = "E101") {
    super(message);
    this.code = code;
  }
}

function parse(birthday: string) {
  const date = new Date(birthday);
  if (isValidDate(date)) {
    return date;
  }
  throw new InvalidDateError("Date format invalid (YYYY-MM-DD)");
}

const userInput = await askForBirthday();
try {
  const date = parse(userInput);

  console.log(date);
  console.log(`Your birthday is ${date.toISOString()}`);
} catch (error) {
  if (error instanceof Error) {
    if (error instanceof InvalidDateError) {
      console.log(error);
      console.log(error.message);
    } else {
    }
  }
}
