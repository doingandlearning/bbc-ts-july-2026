## Exercise: Error Handling in TypeScript

Design a way to handle errors for the following API, using one of the patterns from this chapter. In this API, every operation might fail—feel free to update the API’s method signatures to allow for failures (or don’t, if you prefer). Think about how you might perform a sequence of actions while handling errors that come up (e.g., getting the logged-in user’s ID, then getting their list of friends, then getting each friend’s name):

```ts
class API {
  getLoggedInUserID(): UserID;
  getFriendIDs(userID: UserID): UserID[];
  getUserName(userID: UserID): string;
}
```

## Optional Step-by-Step Instructions

### Step 1: Modify Method Signatures

Update the API class method signatures to accommodate error handling for each of the following patterns:

- Returning Null
- Throwing Exceptions
- Returning Results (using a custom Result type)
- Using Option Types (using a custom Option type)

### Step 2: Implement Error Handling for Each Pattern

For each method in the API class, implement the error handling as per the chosen pattern. When would you use each method? Why?

### Step 3: Perform a Sequence of Actions

Implement a function that performs a sequence of actions (e.g., getting the logged-in user's ID, then getting their list of friends, then getting each friend's name) using each error handling pattern. Ensure that the function gracefully handles any errors that occur during the sequence.

### If time allows: Create and use custom errors

If time allows, you can create and use custom errors in your error handling implementation. This can provide more specific and meaningful error messages to help with debugging and troubleshooting. Here's an example of how you can create a custom error class in TypeScript:

```ts
class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}
```

You can then throw instances of this custom error class in your error handling code when necessary. For example:

```ts
class API {
  // ...

  getLoggedInUserID(): UserID {
    // Simulating an error condition
    throw new CustomError("Failed to get logged-in user ID");
  }

  // ...
}
```

By using custom errors, you can provide more context-specific information about the error that occurred, making it easier to identify and resolve issues in your code.

Remember to handle these custom errors appropriately in your error handling implementation, just like you would handle any other type of error.
