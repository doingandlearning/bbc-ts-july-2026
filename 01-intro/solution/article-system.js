"use strict";
// BBC News Article System - Complete Solution
// This demonstrates basic TypeScript types and interfaces
Object.defineProperty(exports, "__esModule", { value: true });
// ===== PART 1: BASIC TYPES =====
// Type annotations for basic variables
var articleId = 12345;
var headline = "Breaking: Major News Story";
var isPublished = true;
var viewCount = 1250;
// Author object with proper typing
var author = {
    name: "Jane Smith",
    email: "jane.smith@bbc.co.uk",
    department: "News",
};
// ===== PART 3: USING YOUR INTERFACES =====
// Sample article using the Article interface
var sampleArticle = {
    id: 1,
    headline: "UK Weather: Storm Brings Heavy Rain",
    content: "A severe weather warning has been issued across the UK as Storm Emma brings heavy rain and strong winds to most regions.",
    author: "Jane Smith",
    isPublished: true,
    viewCount: 1250,
}; // satisfies
// Sample author using the Author interface
var sampleAuthor = {
    name: "Jane Smith",
    email: "jane.smith@bbc.co.uk",
    department: "News",
};
// ===== PART 4: SIMPLE FUNCTIONS =====
// Function that returns a summary of an article
function getArticleSummary(article) {
    return "Article: ".concat(article.headline, " by ").concat(article.author);
}
// Function that returns author information
function getAuthorInfo(author) {
    return "".concat(author.name, " from ").concat(author.department);
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
var article2 = {
    id: 2,
    headline: "Technology: New AI Breakthrough",
    content: "Scientists have made a significant breakthrough in artificial intelligence research.",
    author: "John Doe",
    isPublished: false,
    viewCount: 0,
};
var article3 = {
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
var author2 = {
    name: "John Doe",
    email: "john.doe@bbc.co.uk",
    department: "Technology",
};
var author3 = {
    name: "Sarah Wilson",
    email: "sarah.wilson@bbc.co.uk",
    department: "Sport",
};
console.log("\nAll Authors:");
console.log(getAuthorInfo(sampleAuthor));
console.log(getAuthorInfo(author2));
console.log(getAuthorInfo(author3));
