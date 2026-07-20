const num: (number | string)[] = [1, 2, 3];
const num2: Array<number | string> = [4, 5, 6];

const num3 = [...num2];
const num4 = Array.from(num2);

num3.push(6);

console.log(num2);
console.log(num3);
console.log(num4);

const people = [{ name: "Armeen" }, { name: "Shazad" }]; // [0x012312312, 0x12341412]
const people2 = [...people]; // [0x012312312, 0x12341412]

const people3 = JSON.parse(JSON.stringify(people));

const people4 = structuredClone(people);

people.push({ name: "Callum" });
people4[0].name = "Hannah";
console.log(people);
console.log(people2);
console.log(people3);
console.log(people4);

type FullMapped = {
  name: string;
  lengthOfName: number;
  company: string;
  language: string;
};

const mappedPeople = people
  .map<{ name: string; lengthOfName: number }>((person) => {
    return { ...person, lengthOfName: person.name.length };
  })
  .filter((person) => person.name !== "Callum")
  .map<FullMapped>((person) => {
    return { ...person, company: "BBC", language: "TypeScript" };
  });

console.log(mappedPeople);

const elem = document.getElementById("header");

elem?.innerText || "No text found";

elem!.innerText;

if (elem) {
  elem.innerText;
}

if (!elem) {
  throw new Error("Element not found.");
}

elem.innerText;
