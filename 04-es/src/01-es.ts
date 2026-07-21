// ECMAScript ->
// 2015 -> ES6/ES2015 <- Promises
// 2016 -> ES7/ES2016
// 2017 -> ES8/ES2017 <- async/await

// 1. Default parameters

function areaOfRect(length = 1, width = length) {
  return length * width;
}

console.log(areaOfRect(5));
console.log(areaOfRect(5, 8));

// 2. Template literals

const name = "Gillian";
const team = "Audio Content";
const role = "Graduate Trainee";

console.log(`Hello ${name}, how is being a ${role} on the ${team} team.`);

type Greeting = "Hello" | "Bonjour" | "Gutentag";
let greeting: Greeting = "Hello";

type Target = "World" | "Planet" | "Universe";

type GreetOptions = `${Greeting} ${Target}`;

type Area = "news" | "sport" | "iplayer";
type ValidUrls = `https://${Area}.bbc.co.uk`;
type NewUrls = `https://bbc.co.uk/${Area}`;

// 3. Arrow functions

type Operation = (a: number, b: number) => number;

const perimeterOfRectangle: Operation = (a, b) => {
  // have more than one step!
  return 2 * a + 2 * b;
};

console.log(perimeterOfRectangle(1, 2));

// 4. var/let/const

function simulateDom() {
  const pseudoDom = {
    button1: { click: () => "" },
    button2: { click: () => "" },
    button3: { click: () => "" },
  };
  for (let i = 1; i <= 3; i++) {
    // @ts-expect-error
    const element = pseudoDom[`button${i}`];
    element.click = function () {
      return `Item ${i} is clicked.`; // Item {3,3,3/nothing/1,2,3/2,2,2} is clicked
    };
  }
  console.log(pseudoDom.button1.click());
  console.log(pseudoDom.button2.click());
  console.log(pseudoDom.button3.click());
}

simulateDom();
