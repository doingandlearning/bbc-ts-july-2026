// Exercise 3: Narrowing with BBC Content Types

// Step 1-3: Function with typeof narrowing
function processContent(text: string, search: string | RegExp): boolean {
  if (typeof search === "string") {
    // TypeScript knows search is `string` here
    return text.includes(search);
  } else {
    // TypeScript knows search is `RegExp` here
    return search.test(text);
  }
}

// Step 4: Test the function
processContent("BBC News", "News");        // ✅ Works
processContent("BBC News", /news/i);       // ✅ Works

// Step 5-6: Classes for content types
class BBCVideo {
  constructor(
    public title: string,
    public duration: number,
    public transcript?: string
  ) {}
}

class BBCArticle {
  constructor(
    public headline: string,
    public wordCount: number,
    public author: string
  ) {}
}

// Step 7-8: Function with instanceof narrowing
function getContentInfo(content: BBCVideo | BBCArticle): string {
  if (content instanceof BBCVideo) {
    // TypeScript knows content is `BBCVideo` here
    return `Video: ${content.title}, Duration: ${content.duration}s`;
  } else {
    // TypeScript knows content is `BBCArticle` here
    return `Article: ${content.headline}, Words: ${content.wordCount}`;
  }
}

// Step 9: Test with instances
const video = new BBCVideo("Breaking News", 120, "Full transcript...");
const article = new BBCArticle("Headline", 500, "John Doe");

getContentInfo(video);   // ✅ Works - narrows to BBCVideo
getContentInfo(article);  // ✅ Works - narrows to BBCArticle

// Step 10: Explanation
// Runtime checks (`typeof`, `instanceof`) help TypeScript narrow types by proving
// what type a value is at runtime. This is safer than type assertions because
// the narrowing is based on actual runtime checks, not assumptions.

export {};
