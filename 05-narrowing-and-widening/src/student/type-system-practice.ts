// TypeScript Type System Practice - Complete Exercise
// This file contains all exercises in one place for comprehensive practice

// ===== EXERCISE 1: BASIC TYPE INFERENCE =====

// TODO: Define a variable `a` with an explicit type annotation of `boolean` and assign it a value of `true`
// TODO: Define a variable `b` without an explicit type annotation and assign it a value of `42`
// TODO: Think why TypeScript can infer the type of `b` but an explicit type is provided for `a`
// TODO: Log both variables to the console

// ===== EXERCISE 2: COMPLEX OBJECTS AND INTERFACES =====

// TODO: Define an object `book` with explicit type annotations for each property, including nested properties
// TODO: Create an interface `Book` and refactor the object definition using this interface
// TODO: Assign values to `book` and log the properties to the console

// ===== EXERCISE 3: FUNCTION RETURN TYPES =====

// TODO: Define a function `multiply` that takes an array of numbers and returns an array with each element multiplied by 2
// TODO: Explain why TypeScript can infer the return type correctly
// TODO: Add an explicit return type to the `multiply` function

// ===== EXERCISE 4: DISCRIMINATED UNIONS =====

// TODO: Define interfaces `SuccessResponse<T>` and `ErrorResponse` with a common property `status`
// TODO: Create a type alias `ApiResponse<T>` that can be either `SuccessResponse<T>` or `ErrorResponse`
// TODO: Write a function `handleResponse<T>` that processes the `ApiResponse<T>` using a switch statement
// TODO: Add a default case with exhaustive checking using `never` type

// ===== EXERCISE 5: EXCESS PROPERTY CHECKS =====

// TODO: Define an interface `Car` with properties `make`, `model`, and `year`
// TODO: Create an object `car` that conforms to the `Car` interface
// TODO: Assign additional properties to the `car` object and observe TypeScript's response

// ===== EXERCISE 6: COMPREHENSIVE TYPE GUARDS =====

// TODO: Use `typeof` operator to check for different primitive types
// TODO: Use `instanceof` operator to distinguish between class instances
// TODO: Use `in` operator to check for object properties
// TODO: Create custom type predicates using the `is` keyword
// TODO: Combine multiple type guards for complex validation

// ===== EXERCISE 7: OPTIONAL CHAINING & NULL SAFETY =====

// TODO: Use document.getElementById() and handle the null case
// TODO: Compare optional chaining (`?.`) with non-null assertion (`!`)
// TODO: Demonstrate control flow analysis with if/else statements
// TODO: Use optional chaining for nested object access
// TODO: Create functions that safely handle potentially null values

// ===== EXERCISE 8: SATISFIES OPERATOR =====

// TODO: Compare `satisfies` with type annotations
// TODO: Use `satisfies` with configuration objects
// TODO: Apply `satisfies` to API response validation
// TODO: Use `satisfies` with form schemas
// TODO: Demonstrate the benefits over type assertions

// ===== EXERCISE 9: INTEGRATION EXERCISE =====

// TODO: Create a News Article Management System
// TODO: Use discriminated unions for article status
// TODO: Implement comprehensive type guards
// TODO: Apply optional chaining for safe property access
// TODO: Use the `satisfies` operator for configuration
// TODO: Integrate all concepts in a cohesive system

export {};
