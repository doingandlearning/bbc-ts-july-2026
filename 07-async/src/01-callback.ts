import fs from "node:fs";

type User = {
  name: string;
  age: number;
  region: string;
};

type NewsArticle = {
  id: string;
  headline: string;
  content: string;
};

// callback hell!!
fs.readFile("user.json", "utf-8", (err: Error | null, data: string) => {
  if (err) {
    console.error(err.message);
  }
  const user: User = JSON.parse(data);
  fs.readFile("regions.json", "utf-8", (err: Error | null, data: string) => {
    if (err) {
      console.error(err.message);
    }
    const regions: Record<string, string[]> = JSON.parse(data);
    fs.readFile("news.json", "utf-8", (err: Error | null, data: string) => {
      if (err) {
        console.error(err.message);
      }
      const allNews: NewsArticle[] = JSON.parse(data);
      const userRegionIDs = regions[user.region] ?? [];
      const userNews = allNews.filter((article) =>
        userRegionIDs.includes(article.id),
      );
      userNews.forEach((news) => {
        console.log(news.headline);
        console.log(news.content);
        console.log("--------");
      });
    });
  });
});
