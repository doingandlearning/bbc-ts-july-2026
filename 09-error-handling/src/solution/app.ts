import { Option, Some, None } from "./option";
type UserID = number;

class API {
  // No Error Handling
  getLoggedInUserID(): UserID {
    // Implementation without error handling
    return 1; // example return value
  }

  getFriendIDs(userID: UserID): UserID[] {
    // Implementation without error handling
    return [2, 3, 4]; // example return value
  }

  getUserName(userID: UserID): string {
    // Implementation without error handling
    return "User" + userID; // example return value
  }

  // Returning Null
  getLoggedInUserIDOrNull(): UserID | null {
    // Implementation with returning null on failure
    return Math.random() > 0.5 ? 1 : null;
  }

  getFriendIDsOrNull(userID: UserID): UserID[] | null {
    // Implementation with returning null on failure
    return Math.random() > 0.5 ? [2, 3, 4] : null;
  }

  getUserNameOrNull(userID: UserID): string | null {
    // Implementation with returning null on failure
    return Math.random() > 0.5 ? "User" + userID : null;
  }

  // Throwing Exceptions
  getLoggedInUserIDOrThrow(): UserID {
    // Implementation throwing exception on failure
    if (Math.random() > 0.5) {
      return 1;
    } else {
      throw new Error("Failed to get logged in user ID");
    }
  }

  getFriendIDsOrThrow(userID: UserID): UserID[] {
    // Implementation throwing exception on failure
    if (Math.random() > 0.5) {
      return [2, 3, 4];
    } else {
      throw new Error("Failed to get friend IDs");
    }
  }

  getUserNameOrThrow(userID: UserID): string {
    // Implementation throwing exception on failure
    if (Math.random() > 0.5) {
      return "User" + userID;
    } else {
      throw new Error("Failed to get user name");
    }
  }

  // Using Option Types
  getLoggedInUserIDOption(): Option<UserID> {
    // Implementation returning Option type
    if (Math.random() > 0.5) {
      return new Some(1);
    } else {
      return new None();
    }
  }

  getFriendIDsOption(userID: UserID): Option<UserID[]> {
    // Implementation returning Option type
    if (Math.random() > 0.5) {
      return new Some([2, 3, 4]);
    } else {
      return new None();
    }
  }

  getUserNameOption(userID: UserID): Option<string> {
    // Implementation returning Option type
    if (Math.random() > 0.5) {
      return new Some("User" + userID);
    } else {
      return new None();
    }
  }
}

// Result type
type Result<T, E> = { success: true; value: T } | { success: false; error: E };

// Example sequence of actions

// No Error Handling
function sequenceOfActionsNoErrorHandling(api: API) {
  const userID = api.getLoggedInUserID();
  const friendIDs = api.getFriendIDs(userID);
  return friendIDs.map((id) => api.getUserName(id));
}

// Returning Null
function sequenceOfActionsUsingNull(api: API) {
  const userID = api.getLoggedInUserIDOrNull();
  if (userID === null) return null;

  const friendIDs = api.getFriendIDsOrNull(userID);
  if (friendIDs === null) return null;

  return friendIDs
    .map((id) => api.getUserNameOrNull(id))
    .filter((name) => name !== null);
}

// Throwing Exceptions
function sequenceOfActionsUsingThrow(api: API) {
  try {
    const userID = api.getLoggedInUserIDOrThrow();
    const friendIDs = api.getFriendIDsOrThrow(userID);
    return friendIDs.map((id) => api.getUserNameOrThrow(id));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Using Option Types
function sequenceOfActionsUsingOption(api: API) {
  const userIDOption = api.getLoggedInUserIDOption();
  if (userIDOption instanceof None) return [];

  const friendIDsOption = api.getFriendIDsOption(userIDOption.getOrElse(0));
  if (friendIDsOption instanceof None) return [];

  return friendIDsOption
    .getOrElse([])
    .map((id) => {
      const userNameOption = api.getUserNameOption(id);
      return userNameOption instanceof Some ? userNameOption.getOrElse() : null;
    })
    .filter((name) => name !== null);
}

// Invoke the functions and log the results
const api = new API();

console.log("No Error Handling:", sequenceOfActionsNoErrorHandling(api));
console.log("Returning Null:", sequenceOfActionsUsingNull(api));
console.log("Throwing Exceptions:", sequenceOfActionsUsingThrow(api));
console.log("Using Option Types:", sequenceOfActionsUsingOption(api));
