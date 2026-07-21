// Exercise 4: Discriminated Unions for BBC Content Status

// Step 1-3: Define interfaces for different states
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

// Step 4: Create union type
type ContentStatus = DraftContent | PublishedContent | ArchivedContent;

// Step 5-9: Function with switch statement and automatic narrowing
function getContentInfo(content: ContentStatus): string {
  switch (content.status) {
    case "draft":
      // TypeScript knows content is `DraftContent` here
      return `Draft last modified: ${content.lastModified.toISOString()}`;
    
    case "published":
      // TypeScript knows content is `PublishedContent` here
      return `Published on ${content.publishedAt.toISOString()} with ${content.views} views`;
    
    case "archived":
      // TypeScript knows content is `ArchivedContent` here
      return `Archived on ${content.archivedAt.toISOString()}. Reason: ${content.reason}`;
    
    default:
      // Step 10: Exhaustive checking
      const _exhaustive: never = content;
      return _exhaustive;
  }
}

// Step 11: Create sample content
const draft: ContentStatus = {
  status: "draft",
  lastModified: new Date()
};

const published: ContentStatus = {
  status: "published",
  publishedAt: new Date(),
  views: 1000
};

const archived: ContentStatus = {
  status: "archived",
  archivedAt: new Date(),
  reason: "Outdated information"
};

// Step 12: Test the function
console.log(getContentInfo(draft));     // ✅ Works - narrows to DraftContent
console.log(getContentInfo(published));  // ✅ Works - narrows to PublishedContent
console.log(getContentInfo(archived));   // ✅ Works - narrows to ArchivedContent

export {};
