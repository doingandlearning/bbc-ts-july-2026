// Function Overloading
// Multiple signatures for the same function name - callers see the specific
// overload that matches their arguments; the implementation signature (last)
// just has to be compatible with all of them.

function getValue(value: string): string;
/** This will return a number */
function getValue(value: number): number;
function getValue(value: boolean): boolean;
function getValue(value: string | number | boolean): number | string | boolean {
  return "HAHA!!";
}

const strVal = getValue("string");
const numVal = getValue(2);
const boolVal = getValue(true);

document.createElement("");

function createUser(name: string): { id: string; name: string };
function createUser(
  name: string,
  email: string,
): { id: string; name: string; email: string };
function createUser(
  name: string,
  email: string,
  age: number,
): { id: string; name: string; email: string; age: number };
function createUser(
  name: string,
  email?: string,
  age?: number,
): { id: string; name: string; email?: string; age?: number } {
  if (age !== undefined) {
    return { name, email, age, id: `${Math.floor(Math.random() * 100)}` };
  }
  if (email !== undefined) {
    return { name, email, id: `${Math.floor(Math.random() * 100)}` };
  }
  return { name, id: `${Math.floor(Math.random() * 100)}` };
}

const user1 = createUser("Alice");
const user2 = createUser("Bob", "bob@bbc.co.uk");
const user3 = createUser("Ciara", "ciara@bbc.co.uk", 42);

interface User {
  id: number;
  name: string;
}
interface Post {
  id: number;
  title: string;
}
interface Comment {
  id: number;
  text: string;
}

async function fetchData(endpoint: "users"): Promise<User[]>;
async function fetchData(endpoint: "posts"): Promise<Post[]>;
async function fetchData(endpoint: "comments"): Promise<Comment[]>;
async function fetchData<T>(endpoint: string): Promise<T>;
async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`/api/${endpoint}`);
  return response.json();
}

const users = await fetchData("users"); // Promise<User[]>
const posts = await fetchData("posts"); // Promise<Post[]>
const articles = await fetchData("articles"); // Promise<Post[]>
