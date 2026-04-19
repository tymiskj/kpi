function* randomNumberGenerator() {
  while (true) {
    yield Math.floor(Math.random() * 100) + 1;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function consumeWithTimeout(iterator, timeoutSeconds) {
  const startTime = Date.now();
  const timeoutMilliseconds = timeoutSeconds * 1000;
  
  let count = 0;
  let totalSum = 0;