type UserID = number;

// Choose an error handling method and implement it.
class API {
  getLoggedInUserID(): UserID {
    // create t
  }
  getFriendIDs(userID: UserID): UserID[];
  getUserName(userID: UserID): string;
}

const api = new API();

// Update the client code to handle your error handling approach.
api.getFriendIDs();
api.getLoggedInUserID();
api.getUserName();

// Create your own error class that you can use if desired.
// Handle it appropriately.
