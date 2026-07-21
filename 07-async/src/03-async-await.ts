import fs from "node:fs/promises";

interface User {
  name: string;
  age: number;
  region: string;
}

type Regions = Record<string, string[]>;

type NewsArticle = {
  id: string;
  headline: string;
  content: string;
};

// 1 -> 2 -> 3

// 1
// 2
// 3
async function getData() {
  try {
    const userPromise = fs.readFile("user.json", "utf-8");
    const regionPromise = fs.readFile("regions.json", "utf-8");
    const allNewsPromise = fs.readFile("news.json", "utf-8");

    const user: User = JSON.parse(await userPromise);
    const regions: Regions = JSON.parse(await regionPromise);
    const allNews: NewsArticle[] = JSON.parse(await allNewsPromise);

    const userRegionIDs = regions[user.region] ?? [];
    const userNews = allNews.filter((article) =>
      userRegionIDs.includes(article.id),
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("--------");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

getData();
