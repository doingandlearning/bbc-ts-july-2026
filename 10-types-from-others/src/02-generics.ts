function firstElement<ElementType>(a: ElementType[]) {
  return a[0];
}

const a_s = ["a", "b", "c"];
const a_n = [1, 2, 3];
const a_m = ["a", 2, true];

const element = firstElement<string>(a_s);

type GithubUser = {
  name: string;
  location: string;
  bio: string;
  blog: string;
  followers: number;
};

type ApiResponse<DataShape> = {
  total: number;
  results: DataShape[];
};

async function fetchData<DataShape>(url: string): Promise<DataShape> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.json();
  return data;
}

const data = await fetchData<ApiResponse<GithubUser>>(
  "https://api.github.com/users/doingandlearning",
);
console.log(data.results[0]);
