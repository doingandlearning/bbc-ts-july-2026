const ac = new AbortController();

// .abort()

async function run(signal: AbortSignal) {
  try {
    const response = await fetch(
      "https://api.github.com/users/doingandlearning",
      { signal },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

run(ac.signal);
setTimeout(() => ac.abort(), 1000);
