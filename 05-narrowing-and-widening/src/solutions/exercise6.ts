// Exercise 6: User-Defined Type Guards for BBC User Roles

// Step 1: Base interface
interface BBCUser {
  id: number;
  name: string;
  email: string;
  role: "editor" | "journalist" | "admin";
}

// Step 2-4: Extended interfaces
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

// Step 5-6: Type guard functions
function isEditor(user: BBCUser): user is Editor {
  return user.role === "editor";
}

function isJournalist(user: BBCUser): user is Journalist {
  return user.role === "journalist";
}

function isAdmin(user: BBCUser): user is Admin {
  return user.role === "admin";
}

// Step 7-9: Function using type guards
function getUserInfo(user: BBCUser): string {
  if (isEditor(user)) {
    // TypeScript knows user is `Editor` here
    return `Editor ${user.name} manages sections: ${user.sections.join(", ")}`;
  } else if (isJournalist(user)) {
    // TypeScript knows user is `Journalist` here
    return `Journalist ${user.name} has written ${user.articles} articles`;
  } else if (isAdmin(user)) {
    // TypeScript knows user is `Admin` here
    return `Admin ${user.name} has permissions: ${user.permissions.join(", ")}`;
  }
  return `User ${user.name}`;
}

// Step 10: Create sample users
const editor: BBCUser = {
  id: 1,
  name: "Alice",
  email: "alice@bbc.co.uk",
  role: "editor",
  sections: ["News", "Sport"]
} as Editor;

const journalist: BBCUser = {
  id: 2,
  name: "Bob",
  email: "bob@bbc.co.uk",
  role: "journalist",
  articles: 50
} as Journalist;

const admin: BBCUser = {
  id: 3,
  name: "Charlie",
  email: "charlie@bbc.co.uk",
  role: "admin",
  permissions: ["delete", "publish"]
} as Admin;

// Step 11: Test the function
console.log(getUserInfo(editor));     // ✅ Works - narrows to Editor
console.log(getUserInfo(journalist)); // ✅ Works - narrows to Journalist
console.log(getUserInfo(admin));      // ✅ Works - narrows to Admin

// Step 12: Explanation
// Custom type guards are useful because:
// - They make your intent explicit (you're checking a specific condition)
// - They're reusable across your codebase
// - They're self-documenting (the function name explains what you're checking)
// - They enable automatic type narrowing after the check

export {};
