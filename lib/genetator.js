export function* randomNumberGenerator() {
  while (true) {
    yield Math.floor(Math.random() * 100) + 1;
  }
}