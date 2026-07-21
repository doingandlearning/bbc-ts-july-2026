// Exercise 5: Property Checks with `in` Operator

// Step 1-3: Define interfaces
interface BBCArticle {
  headline: string;
  wordCount: number;
  author: string;
}

interface BBCVideo {
  title: string;
  duration: number;
  transcript?: string;
}

interface BBCAudio {
  title: string;
  duration: number;
  podcastSeries?: string;
}

type ContentType = BBCArticle | BBCVideo | BBCAudio;

// Step 4-6: Function using `in` operator to narrow
function processContent(content: ContentType): string {
  if ("wordCount" in content) {
    // TypeScript knows content is `BBCArticle` here
    return `Processing article: ${content.headline} by ${content.author}`;
  } else if ("transcript" in content) {
    // TypeScript knows content is `BBCVideo` here (transcript is unique to video)
    return `Processing video: ${content.title}, Duration: ${content.duration}s`;
  } else {
    // TypeScript knows content is `BBCAudio` here
    return `Processing audio: ${content.title}, Duration: ${content.duration}s`;
  }
}

// Step 8: Create sample content
const article: ContentType = {
  headline: "Breaking News",
  wordCount: 500,
  author: "John Doe"
};

const video: ContentType = {
  title: "News Report",
  duration: 120,
  transcript: "Full transcript"
};

const audio: ContentType = {
  title: "Podcast Episode",
  duration: 1800,
  podcastSeries: "Today"
};

// Step 9: Test the function
console.log(processContent(article)); // ✅ Works - narrows to BBCArticle
console.log(processContent(video));   // ✅ Works - narrows to BBCVideo
console.log(processContent(audio));   // ✅ Works - narrows to BBCAudio

// Step 10-11: Comparison with discriminated unions
// Discriminated unions are usually clearer because:
// - They use a shared property (like `type` or `status`)
// - They're more explicit about the different variants
// - They enable exhaustive checking
// The `in` operator is useful when you can't modify the types to add a discriminant

export {};
