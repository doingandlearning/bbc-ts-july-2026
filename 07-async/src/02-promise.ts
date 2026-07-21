import fs from "node:fs/promises";

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

type Regions = Record<string, string[]>;

// Promise -> receipt that some work is being done.
//      pending
//      settled  -> resolved, rejected

let user: User;
let regions: Regions;
let allNews: NewsArticle[];

fs.readFile("user.json", "utf-8")
  .then((data) => {
    user = JSON.parse(data);
    return fs.readFile("regions.json", "utf-8");
  })
  .then((data) => {
    regions = JSON.parse(data);
    return fs.readFile("news.json", "utf-8");
  })
  .then((data) => {
    allNews = JSON.parse(data);
    const userRegionIDs = regions[user.region] ?? [];
    const userNews = allNews.filter((article) =>
      userRegionIDs.includes(article.id),
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("--------");
    });
  })
  .catch((reason) => {
    console.log(reason);
  });

// 1 -> 2 -> 3

// 1 ->
// 2 ->
// 3 ->

Promise.all([
  fs.readFile("user.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
])
  .then(([userString, regionsString, newsString]) => {
    user = JSON.parse(userString);
    regions = JSON.parse(regionsString);
    allNews = JSON.parse(newsString);
    const userRegionIDs = regions[user.region] ?? [];
    const userNews = allNews.filter((article) =>
      userRegionIDs.includes(article.id),
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("--------");
    });
  })
  .catch((err) => {
    console.log(err);
  });

Promise.allSettled([
  fs.readFile("usr.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
]).then(([userObj, regionsObj, newsObj]) => {
  user =
    userObj.status === "fulfilled"
      ? JSON.parse(userObj.value)
      : { region: "SE" };

  regions =
    regionsObj.status === "fulfilled"
      ? JSON.parse(regionsObj.value)
      : { SE: [] };

  allNews = newsObj.status === "fulfilled" ? JSON.parse(newsObj.value) : [];
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
