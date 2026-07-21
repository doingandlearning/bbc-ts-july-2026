function contains(text: string, search: string | RegExp) {
  if (typeof search === "string") {
    return text.includes(search);
  }
  return Boolean(search.exec(text));
}

{
  function contains(text: string, search: string | RegExp) {
    // if (typeof search !== "string") {   👏 Sarah!
    // if (typeof search === "object" && search.exec) {
    if (search instanceof RegExp) {
      return Boolean(search.exec(text));
    }
    return text.includes(search);
  }
}
