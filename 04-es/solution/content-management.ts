// BBC News Content Management System - Complete Solution
// This demonstrates modern JavaScript features in a practical, integrated context

// ===== INTERFACES =====

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  category: string;
  isPublished: boolean;
  createdAt: Date;
  wordCount: number;
}

interface Author {
  id: number;
  name: string;
  email: string;
  department: string;
  articlesCount: number;
}

interface AuthorStats {
  totalAuthors: number;
  articlesPerDepartment: Record<string, number>;
  mostProductiveAuthor: string;
}

interface ContentReport {
  totalArticles: number;
  published: number;
  drafts: number;
  categoryBreakdown: Record<string, number>;
  topAuthor: string;
  averageWordsPerArticle: number;
}

interface UserPreferences {
  categories?: string[];
  authors?: string[];
  sortBy?: string;
  showDrafts?: boolean;
  startDate?: string;
}

interface ArticleFilters {
  category?: string;
  author?: string;
  showDrafts?: boolean;
  startDate?: string;
}

interface WorkflowResult {
  articles: Article[];
  summary: {
    totalArticles: number;
    categories: string[];
    authors: string[];
    averageReadingTime: number;
  };
  trendingTopics: Array<{ word: string; count: number }>;
}

// ===== PART 1: CONTENT CREATION WITH MODERN FEATURES =====

type PartialAuthor = Omit<Partial<Author>, "id">;

// Function that generates article objects using modern JavaScript features
function createArticle(
  title: string,
  author: string,
  content: string,
  category: string = "general",
  isPublished: boolean = false
): Article {
  const wordCount = content.split(" ").length;
  const createdAt = new Date();

  return {
    id: Math.floor(Math.random() * 10000),
    title,
    author,
    content,
    category,
    isPublished,
    createdAt,
    wordCount,
  };
}

// Author management using destructuring and spread operators
let authors: Author[] = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@bbc.co.uk",
    department: "News",
    articlesCount: 0,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@bbc.co.uk",
    department: "Sport",
    articlesCount: 0,
  },
  {
    id: 3,
    name: "Sarah Wilson",
    email: "sarah.wilson@bbc.co.uk",
    department: "Technology",
    articlesCount: 0,
  },
];

// Add new author function
function addAuthor(name: string, email: string, department: string): Author {
  const newAuthor: Author = {
    id: Math.max(...authors.map((a) => a.id)) + 1,
    name,
    email,
    department,
    articlesCount: 0,
  };

  authors = [...authors, newAuthor];
  return newAuthor;
}

// Update author information function
function updateAuthor(
  authorId: number,
  updates: Partial<Author>
): Author | null {
  const authorIndex = authors.findIndex((author) => author.id === authorId);
  if (authorIndex === -1) return null;

  authors[authorIndex] = { ...authors[authorIndex], ...updates };
  return authors[authorIndex];
}

// Get author statistics function
function getAuthorStats(): AuthorStats {
  const totalAuthors = authors.length;
  const articlesPerDepartment = authors.reduce((acc, author) => {
    acc[author.department] =
      (acc[author.department] || 0) + author.articlesCount;
    return acc;
  }, {} as Record<string, number>);

  const mostProductiveAuthor = authors.reduce((max, author) =>
    author.articlesCount > max.articlesCount ? author : max
  );

  return {
    totalAuthors,
    articlesPerDepartment,
    mostProductiveAuthor: mostProductiveAuthor.name,
  };
}

// ===== PART 2: DATA PROCESSING PIPELINE =====

// Sample articles data
const articles: Article[] = [
  {
    id: 1,
    title: "UK Weather: Storm Brings Heavy Rain",
    author: "Jane Smith",
    content:
      "A severe weather warning has been issued across the UK as Storm Emma brings heavy rain and strong winds to most regions. The Met Office has warned of potential flooding in low-lying areas.",
    category: "weather",
    isPublished: true,
    createdAt: new Date("2025-01-15"),
    wordCount: 25,
  },
  {
    id: 2,
    title: "Technology: New AI Breakthrough",
    author: "Sarah Wilson",
    content:
      "Scientists have made a significant breakthrough in artificial intelligence research that could revolutionize healthcare diagnostics.",
    category: "technology",
    isPublished: false,
    createdAt: new Date("2025-01-14"),
    wordCount: 18,
  },
  {
    id: 3,
    title: "Football: Manchester United Wins",
    author: "John Doe",
    content:
      "Manchester United secured a 2-1 victory against Liverpool in yesterday's Premier League match at Old Trafford.",
    category: "sport",
    isPublished: true,
    createdAt: new Date("2025-01-13"),
    wordCount: 20,
  },
  {
    id: 4,
    title: "Politics: New Government Policy",
    author: "Jane Smith",
    content:
      "The government has announced a new policy aimed at improving public services and reducing waiting times.",
    category: "politics",
    isPublished: true,
    createdAt: new Date("2025-01-12"),
    wordCount: 22,
  },
];

// Process articles using array methods
function getPublishedArticles(articles: Article[]): Article[] {
  return articles.filter((article) => article.isPublished);
}

function sortArticlesByDate(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

function transformArticlesForDisplay(articles: Article[]): Array<{
  title: string;
  author: string;
  category: string;
  readingTime: number;
  published: string;
}> {
  return articles.map((article) => ({
    title: article.title,
    author: article.author,
    category: article.category,
    readingTime: calculateReadingTime(article.wordCount),
    published: article.isPublished ? "Yes" : "No",
  }));
}

function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200); // 200 words per minute
}

// Content analysis functions
function findArticlesByCategory(
  articles: Article[],
  category: string
): Article[] {
  return articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}

function getTrendingTopics(
  articles: Article[]
): Array<{ word: string; count: number }> {
  const wordCounts = articles
    .flatMap((article) => article.title.toLowerCase().split(" "))
    .filter((word) => word.length > 3) // Filter out short words
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 trending words
}

function calculateAuthorProductivity(
  authors: Author[],
  articles: Article[]
): Array<{ author: string; articleCount: number }> {
  return authors.map((author) => ({
    author: author.name,
    articleCount: articles.filter((article) => article.author === author.name)
      .length,
  }));
}

function generateContentReport(articles: Article[]): ContentReport {
  const published = articles.filter((article) => article.isPublished);
  const drafts = articles.filter((article) => !article.isPublished);

  const categoryBreakdown = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const authorCounts = calculateAuthorProductivity(authors, articles);
  const topAuthor = authorCounts.reduce((max, author) =>
    author.articleCount > max.articleCount ? author : max
  );

  return {
    totalArticles: articles.length,
    published: published.length,
    drafts: drafts.length,
    categoryBreakdown,
    topAuthor: topAuthor.author,
    averageWordsPerArticle: Math.round(
      articles.reduce((sum, article) => sum + article.wordCount, 0) /
        articles.length
    ),
  };
}

// ===== PART 3: USER INTERACTION FEATURES =====

// Search functionality using modern JavaScript
function searchArticles(articles: Article[], searchTerm: string): Article[] {
  if (!searchTerm) return articles;

  const term = searchTerm.toLowerCase();
  return articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(term) ||
      article.content?.toLowerCase().includes(term) ||
      article.author?.toLowerCase().includes(term)
  );
}

function filterArticles(
  articles: Article[],
  filters: ArticleFilters
): Article[] {
  return articles.filter((article) => {
    const categoryMatch =
      !filters.category || article.category === filters.category;
    const authorMatch = !filters.author || article.author === filters.author;
    const publishedMatch = filters.showDrafts !== false || article.isPublished;
    const dateMatch =
      !filters.startDate || article.createdAt >= new Date(filters.startDate);

    return categoryMatch && authorMatch && publishedMatch && dateMatch;
  });
}

// User preferences management
let userPreferences: UserPreferences = {
  categories: ["news", "sport"],
  authors: ["Jane Smith"],
  sortBy: "date",
  showDrafts: false,
};

function applyUserPreferences(
  articles: Article[],
  preferences: UserPreferences
): Article[] {
  let filtered = articles;

  // Apply category filter
  if (preferences.categories?.length && preferences.categories.length > 0) {
    filtered = filtered.filter((article) =>
      preferences.categories!.includes(article.category)
    );
  }

  // Apply author filter
  if (preferences.authors?.length && preferences.authors.length > 0) {
    filtered = filtered.filter((article) =>
      preferences.authors!.includes(article.author)
    );
  }

  // Apply draft filter
  if (!preferences.showDrafts) {
    filtered = filtered.filter((article) => article.isPublished);
  }

  // Apply sorting
  if (preferences.sortBy === "date") {
    filtered = sortArticlesByDate(filtered);
  } else if (preferences.sortBy === "title") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }

  return filtered;
}

function updateUserPreferences(
  currentPreferences: UserPreferences,
  updates: Partial<UserPreferences>
): UserPreferences {
  return { ...currentPreferences, ...updates };
}

// ===== PART 4: INTEGRATION CHALLENGE =====

// Complete workflow that combines all features
function processContentWorkflow(
  rawArticles: Article[],
  userPreferences: UserPreferences
): WorkflowResult {
  // Process articles through the pipeline
  const processedArticles = rawArticles
    .map((article) => ({
      ...article,
      readingTime: calculateReadingTime(article.wordCount),
      formattedDate: article.createdAt.toLocaleDateString(),
    }))
    .filter((article) => article.isPublished || userPreferences.showDrafts);

  // Apply user preferences
  const filteredArticles = applyUserPreferences(
    processedArticles,
    userPreferences
  );

  // Generate summary
  const summary = {
    totalArticles: filteredArticles.length,
    categories: [...new Set(filteredArticles.map((a) => a.category))],
    authors: [...new Set(filteredArticles.map((a) => a.author))],
    averageReadingTime: Math.round(
      filteredArticles.reduce(
        (sum, article) => sum + calculateReadingTime(article.wordCount),
        0
      ) / filteredArticles.length
    ),
  };

  return {
    articles: filteredArticles,
    summary,
    trendingTopics: getTrendingTopics(filteredArticles),
  };
}

// Handle edge cases using modern JavaScript
function handleEdgeCases(data: any[]): {
  articles: Article[];
  totalCount: number;
  hasContent: boolean;
  categories: string[];
} {
  // Handle missing data gracefully
  const safeData = data ?? [];

  // Use optional chaining throughout
  const processedData = safeData
    .filter((item) => item?.title && item?.author)
    .map((item) => ({
      id: item.id ?? Math.floor(Math.random() * 10000),
      title: item.title?.trim() ?? "Untitled",
      author: item.author?.trim() ?? "Unknown Author",
      content: item.content ?? "",
      category: item.category ?? "general",
      isPublished: item.isPublished ?? false,
      createdAt: item.createdAt ?? new Date(),
      wordCount: item.content?.split(" ").length ?? 0,
    }));

  // Provide sensible defaults
  return {
    articles: processedData,
    totalCount: processedData.length,
    hasContent: processedData.length > 0,
    categories: [...new Set(processedData.map((a) => a.category))],
  };
}

// ===== DEMONSTRATION =====

console.log("=== BBC News Content Management System ===\n");

// Test article creation
console.log("1. Creating new article:");
const newArticle = createArticle(
  "Breaking: Major News Story",
  "Jane Smith",
  "This is a breaking news story with important information for our readers.",
  "news",
  true
);
console.log(newArticle);

// Test author management
console.log("\n2. Adding new author:");
const newAuthor = addAuthor(
  "Mike Johnson",
  "mike.johnson@bbc.co.uk",
  "Politics"
);
console.log(newAuthor);

console.log("\n3. Author statistics:");
console.log(getAuthorStats());

// Test article processing
console.log("\n4. Published articles:");
console.log(getPublishedArticles(articles));

console.log("\n5. Articles sorted by date:");
console.log(
  sortArticlesByDate(articles).map((a) => ({
    title: a.title,
    date: a.createdAt,
  }))
);

console.log("\n6. Articles for display:");
console.log(transformArticlesForDisplay(articles));

// Test search functionality
console.log("\n7. Search results for 'weather':");
console.log(searchArticles(articles, "weather"));

console.log("\n8. Content report:");
console.log(generateContentReport(articles));

console.log("\n9. Trending topics:");
console.log(getTrendingTopics(articles));

// Test user preferences
console.log("\n10. Articles with user preferences applied:");
const filteredArticles = applyUserPreferences(articles, userPreferences);
console.log(
  filteredArticles.map((a) => ({ title: a.title, category: a.category }))
);

// Test complete workflow
console.log("\n11. Complete content workflow:");
const workflowResult = processContentWorkflow(articles, userPreferences);
console.log(workflowResult.summary);

// Test edge cases
console.log("\n12. Handling edge cases:");
const edgeCaseData = [
  { title: "Valid Article", author: "Jane Smith", content: "Some content" },
  { title: "", author: "John Doe", content: "Another article" }, // Invalid
  { author: "Sarah Wilson", content: "Missing title" }, // Invalid
  null, // Invalid
  undefined, // Invalid
];
console.log(handleEdgeCases(edgeCaseData));

export {};
