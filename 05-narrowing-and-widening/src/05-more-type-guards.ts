type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
};

type Admin = User & {
  role: "admin";
  permissions: string[];
  lastLogin: Date;
};

type RegularUser = User & {
  role: "user" | "guest";
  lastActive: Date;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
};

type ValidUsers = Admin | RegularUser;

function isAdmin(user: User): user is Admin {
  return user.role === "admin" && "permissions" in user;
}

function processUser(user: ValidUsers) {
  if ("lastActive" in user) {
    user;
  }
  if (isAdmin(user)) {
    user;
  }
}
