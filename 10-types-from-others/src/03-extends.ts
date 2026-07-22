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

class CustomError extends Error {}

async function fetchData<DataShape extends { total: number }>(
  url: string,
): Promise<DataShape> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data: DataShape = await response.json();
  return data;
}

const data = await fetchData<ApiResponse<GithubUser>>("");

const getSecondElement = <ElementType>(a: ElementType[]) => a[1];
