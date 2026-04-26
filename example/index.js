import { randomNumberGenerator, consumeWithTimeout } from 'kpi-async-iterator-lib';

console.log("=== Запуск моєї лаби через бібліотеку ===");
const myRandomIterator = randomNumberGenerator();
consumeWithTimeout(myRandomIterator, 2);