// interface Option<Data> {
//   error: Error | null;
//   result: Data | null;
// }

// You can also describe exceptions using special-purpose data types. This
// approach has some downsides compared to returning unions of values and errors
// (notably, intero‐ perability with code that doesn’t use these data types), but
// it does give you the ability to chain operations over possibly errored
// computations.

// The Option type comes to us from languages like Haskell, OCaml, Scala, and Rust.
// The idea is that instead of returning a value, you return a container that
// may or may not have a value in it.

// Note that the Try, Option, and Either data types don’t come built into JavaScript
// environments the same way that Array, Error, Map, or Promise are. If you want
// to use these types, you’ll have to find implementations on NPM, or write them yourself.

// https://github.com/bcherny/tsoption

interface Option<T> {
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}
class None implements Option<never> {
  flatMap(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

function Option<T>(value: null | undefined): None;
function Option<T>(value: T): Some<T>;
function Option<T>(value: T): Option<T> {
  if (value == null) {
    return new None();
  }
  return new Some(value);
}

function askB(): Option<string> {
  let result = prompt("When is your birthday?");
  if (result === null) {
    return new None();
  }
  return new Some(result);
}
function isValidDate(date: Date): date is Date {
  return date instanceof Date && date.toString() !== "Invalid Date";
}

function parseB(birthday: string): Option<Date> {
  let date = new Date(birthday);
  if (!isValidDate(date)) {
    return new None();
  }
  return new Some(date);
}

askB()
  .flatMap(parseB)
  .flatMap((date) => new Some(date.toISOString()))
  .flatMap((date) => new Some("Date is " + date));
