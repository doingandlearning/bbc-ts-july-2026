// Extension Solutions: Advanced Type Composition
// These are solutions to the optional extension exercises

// Note: These types match the ones defined in app.ts
// In a real scenario, you'd import them from a shared types file
interface ApiEntity {
  id: number;
}

interface Post extends ApiEntity {
  title: string;
  body: string;
  userId: number;
}

interface Comment extends ApiEntity {
  postId: number;
  name: string;
  email: string;
  body: string;
}

// ============================================================================
// Extension 1: Utility Types
// ============================================================================

// Task 1: Post Preview with Pick
type PostPreview = Pick<Post, "title" | "body">;

const preview: PostPreview = {
  title: "Sample Post",
  body: "This is a preview"
};
// preview.id; // ❌ Error - id is not in PostPreview
// preview.title; // ✅ Works

// Task 2: Update Post with Partial
type UpdatePost = Partial<Post>;

function updatePost(id: number, updates: UpdatePost): void {
  // Implementation would update post with partial data
  console.log(`Updating post ${id} with:`, updates);
}

updatePost(1, { title: "New Title" }); // ✅ Works - only title needed
updatePost(1, {}); // ✅ Works - empty update allowed
updatePost(1, { title: "New", body: "Updated", userId: 2 }); // ✅ Works

// Task 3: Public Post with Omit
type PublicPost = Omit<Post, "userId">;

function getPublicPost(post: Post): PublicPost {
  const { userId, ...publicPost } = post;
  return publicPost;
}

const publicPost: PublicPost = {
  id: 1,
  title: "Public Post",
  body: "Content"
};
// publicPost.userId; // ❌ Error - userId removed

// Task 4: Combine Utility Types
type PostSummary = Readonly<Pick<Post, "id" | "title" | "body">>;

const summary: PostSummary = {
  id: 1,
  title: "Summary",
  body: "Content"
};
// summary.id = 2; // ❌ Error - readonly

// ============================================================================
// Extension 2: Conditional Types
// ============================================================================

// Task 1: Handle Single vs Array Responses
type ApiResponse<T> = T extends any[]
  ? { data: T; count: number }
  : { data: T };

// Single item response
const postResponse: ApiResponse<Post> = {
  data: {
    id: 1,
    title: "Post",
    body: "Content",
    userId: 1
  }
};
// postResponse.count; // ❌ Error - not available for single items

// Array response
const commentsResponse: ApiResponse<Comment[]> = {
  data: [],
  count: 0
};
// commentsResponse.count; // ✅ Works - available for arrays

// Task 2: Partial with Required Fields
type PartialWithRequired<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

type UpdatePostTitleRequired = PartialWithRequired<Post, "title">;

const update1: UpdatePostTitleRequired = {
  title: "Required Title"
  // ✅ Works - title is required
};

const update2: UpdatePostTitleRequired = {
  // ❌ Error - title is required!
  body: "Optional body"
};

const update3: UpdatePostTitleRequired = {
  title: "Required",
  body: "Optional",
  userId: 2
  // ✅ Works - title required, others optional
};

// ============================================================================
// Extension 3: Mapped Types & keyof
// ============================================================================

// Task 1: Explore keyof Operator
type PostKeys = keyof Post; // "id" | "title" | "body" | "userId"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const post: Post = {
  id: 1,
  title: "Test",
  body: "Content",
  userId: 1
};

const title = getProperty(post, "title"); // Type: string
const id = getProperty(post, "id"); // Type: number
// getProperty(post, "invalid"); // ❌ Error - "invalid" not in keyof Post

// Task 2: Create Mapped Types
// OptionalPost - equivalent to Partial<Post>
type OptionalPost = {
  [K in keyof Post]?: Post[K];
};

// ReadonlyPost - equivalent to Readonly<Post>
type ReadonlyPost = {
  readonly [K in keyof Post]: Post[K];
};

const readonlyPost: ReadonlyPost = {
  id: 1,
  title: "Test",
  body: "Content",
  userId: 1
};
// readonlyPost.title = "New"; // ❌ Error - readonly

// Task 3: Transform Properties
type PostFlags = {
  [K in keyof Post]: boolean;
};

const flags: PostFlags = {
  id: true,
  title: false,
  body: true,
  userId: false
};

type PostMetadata = {
  [K in keyof Post]: { value: Post[K]; lastModified: Date };
};

const metadata: PostMetadata = {
  id: { value: 1, lastModified: new Date() },
  title: { value: "Test", lastModified: new Date() },
  body: { value: "Content", lastModified: new Date() },
  userId: { value: 1, lastModified: new Date() }
};

// Task 4: Combine Mapped Types with Conditionals
type PostWithStringIds = {
  [K in keyof Post]: K extends "id" | "userId" ? string : Post[K];
};

const postWithStringIds: PostWithStringIds = {
  id: "1", // ✅ string
  title: "Test", // ✅ string (unchanged)
  body: "Content", // ✅ string (unchanged)
  userId: "1" // ✅ string
};

// ============================================================================
// Integration Challenge: Complete API Client System
// ============================================================================

// Generic request function with constraints (from core exercise)
interface ApiEntity {
  id: number;
}

async function makeApiRequest<T extends ApiEntity | ApiEntity[]>(
  url: string
): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

// Utility types for different views
type PostPreview = Pick<Post, "id" | "title" | "body">;
type UpdatePost = Partial<Post>;
type PublicPost = Omit<Post, "userId">;

// Conditional types for responses
type ApiResponse<T> = T extends any[]
  ? { data: T; count: number }
  : { data: T };

// Mapped types for transformations
type PostMetadata = {
  [K in keyof Post]: { value: Post[K]; lastModified: Date };
};

// Functions using all types together
async function getPostPreview(id: number): Promise<PostPreview> {
  const post = await makeApiRequest<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const { userId, ...preview } = post;
  return preview;
}

async function updatePost(
  id: number,
  updates: UpdatePost
): Promise<PublicPost> {
  // In real code, this would make a PATCH request
  const post = await makeApiRequest<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const updated = { ...post, ...updates };
  const { userId, ...publicPost } = updated;
  return publicPost;
}

async function getPostsWithCount(): Promise<ApiResponse<Post[]>> {
  const posts = await makeApiRequest<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return {
    data: posts,
    count: posts.length
  };
}

// Example usage
async function demonstrateIntegration() {
  // Get preview (no userId)
  const preview = await getPostPreview(1);
  console.log("Preview:", preview);

  // Update post (partial data)
  const updated = await updatePost(1, { title: "Updated Title" });
  console.log("Updated:", updated);

  // Get posts with count (conditional type)
  const response = await getPostsWithCount();
  console.log(`Found ${response.count} posts`);
}

export {
  PostPreview,
  UpdatePost,
  PublicPost,
  ApiResponse,
  PostMetadata,
  PostFlags,
  PostWithStringIds,
  PartialWithRequired
};
