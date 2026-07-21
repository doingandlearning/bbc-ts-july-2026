console.log("I'm here!");

let location: string = "Salford";

function sayHello(location: string) {
  console.log(`Hello from ${location}`);
}

sayHello(location);

const paragraph = document.createElement("p");
paragraph.innerText = "Webpack is cool!";

const container = document.getElementById("app");
container?.append(paragraph);
