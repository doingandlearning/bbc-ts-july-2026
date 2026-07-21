// Exercise 9: Integration - BBC Content Management System

// ============================================================================
// PART 1: Set up types and handle widening
// ============================================================================

// Content status discriminated unions
interface DraftContent {
  status: "draft";
  lastModified: Date;
}

interface PublishedContent {
  status: "published";
  publishedAt: Date;
  views: number;
}

interface ArchivedContent {
  status: "archived";
  archivedAt: Date;
  reason: string;
}

type ContentStatus = DraftContent | PublishedContent | ArchivedContent;

// Content type interfaces
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

// Handle widening - use const/as const where literal types needed
const metadata = {
  id: 12345,
  priority: 1,
  region: "London" as const // Preserve literal type
};

// ============================================================================
// PART 2: Implement narrowing with type guards
// ============================================================================

// Type guards for content types
function isArticle(content: ContentType): content is BBCArticle {
  return "wordCount" in content;
}

function isVideo(content: ContentType): content is BBCVideo {
  return "transcript" in content;
}

function isAudio(content: ContentType): content is BBCAudio {
  return "podcastSeries" in content;
}

// User interfaces and type guards
interface BBCUser {
  id: number;
  name: string;
  email: string;
  role: "editor" | "journalist" | "admin";
}

interface Editor extends BBCUser {
  role: "editor";
  sections: string[];
}

interface Journalist extends BBCUser {
  role: "journalist";
  articles: number;
}

interface Admin extends BBCUser {
  role: "admin";
  permissions: string[];
}

function isEditor(user: BBCUser): user is Editor {
  return user.role === "editor";
}

function isJournalist(user: BBCUser): user is Journalist {
  return user.role === "journalist";
}

function isAdmin(user: BBCUser): user is Admin {
  return user.role === "admin";
}

// ============================================================================
// PART 3: Process content with discriminated unions
// ============================================================================

type ContentWithStatus = {
  content: ContentType;
  status: ContentStatus;
};

function processContent(item: ContentWithStatus): string {
  // Narrow content type
  if (isArticle(item.content)) {
    return `Article: ${item.content.headline}`;
  } else if (isVideo(item.content)) {
    return `Video: ${item.content.title}`;
  } else {
    return `Audio: ${item.content.title}`;
  }
}

function getContentDisplayInfo(item: ContentWithStatus): string {
  let contentInfo = "";
  
  // Narrow content type
  if (isArticle(item.content)) {
    contentInfo = `Article "${item.content.headline}" by ${item.content.author}`;
  } else if (isVideo(item.content)) {
    contentInfo = `Video "${item.content.title}" (${item.content.duration}s)`;
  } else {
    contentInfo = `Audio "${item.content.title}" (${item.content.duration}s)`;
  }
  
  // Narrow status with switch
  switch (item.status.status) {
    case "draft":
      return `${contentInfo} - Draft (last modified: ${item.status.lastModified.toISOString()})`;
    case "published":
      return `${contentInfo} - Published (${item.status.views} views)`;
    case "archived":
      return `${contentInfo} - Archived (${item.status.reason})`;
    default:
      const _exhaustive: never = item.status;
      return _exhaustive;
  }
}

// ============================================================================
// PART 4: Handle null safety
// ============================================================================

function safeGetArticleData(headlineId: string, bylineId: string) {
  const headline = document.getElementById(headlineId);
  const byline = document.getElementById(bylineId);
  
  // Use narrowing for multiple operations
  if (headline && byline) {
    return {
      headline: headline.textContent,
      byline: byline.textContent
    };
  }
  
  return null;
}

// ============================================================================
// PART 5: Validate configuration with satisfies
// ============================================================================

interface BBCApiConfig {
  endpoints: {
    news: string;
    sport: string;
    iPlayer: string;
  };
  timeout: number;
  retries: number;
}

const apiConfig = {
  endpoints: {
    news: "https://www.bbc.co.uk/news",
    sport: "https://www.bbc.co.uk/sport",
    iPlayer: "https://www.bbc.co.uk/iplayer"
  },
  timeout: 5000,
  retries: 3
} satisfies BBCApiConfig;

// ============================================================================
// PART 6: Put it all together
// ============================================================================

function manageContent(
  item: ContentWithStatus,
  user: BBCUser,
  config: BBCApiConfig
): string {
  // Use type guards to check user role
  if (!isEditor(user) && !isAdmin(user)) {
    return "Unauthorized: Only editors and admins can manage content";
  }
  
  // Narrow content type
  let contentDescription = "";
  if (isArticle(item.content)) {
    contentDescription = `article "${item.content.headline}"`;
  } else if (isVideo(item.content)) {
    contentDescription = `video "${item.content.title}"`;
  } else {
    contentDescription = `audio "${item.content.title}"`;
  }
  
  // Narrow status with switch
  switch (item.status.status) {
    case "draft":
      return `${user.name} is managing draft ${contentDescription}`;
    case "published":
      return `${user.name} is reviewing published ${contentDescription} with ${item.status.views} views`;
    case "archived":
      return `${user.name} is accessing archived ${contentDescription}: ${item.status.reason}`;
    default:
      const _exhaustive: never = item.status;
      return _exhaustive;
  }
}

// Sample data
const article: ContentType = {
  headline: "Breaking News",
  wordCount: 500,
  author: "John Doe"
};

const draftStatus: ContentStatus = {
  status: "draft",
  lastModified: new Date()
};

const editor: BBCUser = {
  id: 1,
  name: "Alice",
  email: "alice@bbc.co.uk",
  role: "editor",
  sections: ["News"]
} as Editor;

const contentItem: ContentWithStatus = {
  content: article,
  status: draftStatus
};

// Test
console.log(manageContent(contentItem, editor, apiConfig));

export {};
