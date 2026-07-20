// BBC News Article System - Complete Solution
// This demonstrates basic TypeScript types and interfaces

// ===== PART 1: BASIC TYPES =====

// Type annotations for basic variables
const articleId: number = 12345;
const headline: string = "Breaking: Major News Story";
const isPublished: boolean = true;
const viewCount: number = 1250;

// Author object with proper typing
const author = {
  name: "Jane Smith",
  email: "jane.smith@bbc.co.uk",
  department: "News",
};

// ===== PART 2: CREATING INTERFACES =====

// Interface for a news article
interface Article {
  id: number;
  headline: string;
  content: string;
  author: string;
  isPublished: boolean;
  viewCount: number;
}

type ArticleType = {
  id: number;
  headline: string;
  content: string;
  author: string;
  isPublished: boolean;
  viewCount: number;
};

// Interface for an author
interface Author {
  name: string;
  email: string;
  department: string;
}

// ===== PART 3: USING YOUR INTERFACES =====

// Sample article using the Article interface
const sampleArticle: Article = {
  id: 1,
  headline: "UK Weather: Storm Brings Heavy Rain",
  content:
    "A severe weather warning has been issued across the UK as Storm Emma brings heavy rain and strong winds to most regions.",
  author: "Jane Smith",
  isPublished: true,
  viewCount: 1250,
}; // satisfies

// Sample author using the Author interface
const sampleAuthor: Author = {
  name: "Jane Smith",
  email: "jane.smith@bbc.co.uk",
  department: "News",
};

// ===== PART 4: SIMPLE FUNCTIONS =====

// Function that returns a summary of an article
function getArticleSummary(article: Article): string {
  return `Article: ${article.headline} by ${article.author}`;
}

// Function that returns author information
function getAuthorInfo(author: Author): string {
  return `${author.name} from ${author.department}`;
}

// ===== TESTING THE CODE =====

console.log("Article ID:", articleId);
console.log("Headline:", headline);
console.log("Author:", author);
console.log("Article Summary:", getArticleSummary(sampleArticle));
console.log("Author Info:", getAuthorInfo(sampleAuthor));

// ===== DEMONSTRATING TYPE SAFETY =====

// This would cause a TypeScript error (uncomment to see):
// const invalidArticle: Article = {
//   id: "not a number", // Error: Type 'string' is not assignable to type 'number'
//   headline: "Test",
//   content: "Test content",
//   author: "Test Author",
//   isPublished: true,
//   viewCount: 100
// };

// This would also cause a TypeScript error (uncomment to see):
// console.log(sampleArticle.invalidProperty); // Error: Property 'invalidProperty' does not exist

// ===== ADDITIONAL EXAMPLES =====

// Creating more articles
const article2: Article = {
  id: 2,
  headline: "Technology: New AI Breakthrough",
  content:
    "Scientists have made a significant breakthrough in artificial intelligence research.",
  author: "John Doe",
  isPublished: false,
  viewCount: 0,
};

const article3: Article = {
  id: 3,
  headline: "Sports: Football Match Results",
  content: "Manchester United won 2-1 against Liverpool in yesterday's match.",
  author: "Sarah Wilson",
  isPublished: true,
  viewCount: 3400,
};

// Working with the articles
console.log("\nAll Articles:");
console.log(getArticleSummary(sampleArticle));
console.log(getArticleSummary(article2));
console.log(getArticleSummary(article3));

// Creating more authors
const author2: Author = {
  name: "John Doe",
  email: "john.doe@bbc.co.uk",
  department: "Technology",
};

const author3: Author = {
  name: "Sarah Wilson",
  email: "sarah.wilson@bbc.co.uk",
  department: "Sport",
};

console.log("\nAll Authors:");
console.log(getAuthorInfo(sampleAuthor));
console.log(getAuthorInfo(author2));
console.log(getAuthorInfo(author3));

export {};
