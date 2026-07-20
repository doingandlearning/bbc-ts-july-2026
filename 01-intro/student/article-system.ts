// BBC News Article System - Starter Code
// Complete the TODO items below to build basic type-safe structures

// ===== PART 1: BASIC TYPES =====

// TODO: Add type annotations to these variables
const articleId = 12345;
const headline = "Breaking: Major News Story";
const isPublished = true;
const viewCount = 1250;

// TODO: Create an author object with proper typing
const author = {
  name: "Jane Smith",
  email: "jane.smith@bbc.co.uk",
  department: "News",
};

// ===== PART 2: CREATING INTERFACES =====

// TODO: Create an interface for a news article
// Include: id (number), headline (string), content (string),
// author (string), isPublished (boolean), viewCount (number)
interface Article {
  // Your interface definition here
}

// TODO: Create an interface for an author
// Include: name (string), email (string), department (string)
interface Author {
  // Your interface definition here
}

// ===== PART 3: USING YOUR INTERFACES =====

// TODO: Create a sample article using your Article interface
const sampleArticle: Article = {
  // Fill in the properties with sample data
};

// TODO: Create a sample author using your Author interface
const sampleAuthor: Author = {
  // Fill in the properties with sample data
};

// ===== PART 4: SIMPLE FUNCTIONS =====

// TODO: Implement this function
function getArticleSummary(article: Article): string {
  // Return a string like: "Article: [headline] by [author]"
  return ""; // Replace with your implementation
}

// TODO: Implement this function
function getAuthorInfo(author: Author): string {
  // Return a string like: "[name] from [department]"
  return ""; // Replace with your implementation
}

// ===== TESTING YOUR CODE =====
// Uncomment these lines once you've implemented the functions

// console.log("Article ID:", articleId);
// console.log("Headline:", headline);
// console.log("Author:", author);
// console.log("Article Summary:", getArticleSummary(sampleArticle));
// console.log("Author Info:", getAuthorInfo(sampleAuthor));

export {};
