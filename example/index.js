import { randomNumberGenerator, consumeWithTimeout, memoize } from 'kpi-async-iterator-lib';

console.log("=== Демонстрація Task 1: Async Iterator ===\n");
const myRandomIterator = randomNumberGenerator();
await consumeWithTimeout(myRandomIterator, 1);

console.log("\n=== Демонстрація Task 3: Memoization ===");

const slowMathFunction = (n) => {
  let result = 0;
  for (let i = 0; i <= n * 10000000; i++) {
    result += i;
  }
  return result;
};

const memoizedMath = memoize(slowMathFunction, { maxSize: 2, policy: 'lru' });

console.time("Перший виклик (Обчислення)");
console.log("Результат (10):", memoizedMath(10));
console.timeEnd("Перший виклик (Обчислення)");

console.time("Другий виклик (З кешу)");
console.log("Результат (10):", memoizedMath(10));
console.timeEnd("Другий виклик (З кешу)");

console.time("Третій виклик (Обчислення)");
console.log("Результат (20):", memoizedMath(20));
console.timeEnd("Третій виклик (Обчислення)");

console.time("Четвертий виклик (Обчислення, витіснить перше значення через LRU)");
console.log("Результат (30):", memoizedMath(30));
console.timeEnd("Четвертий виклик (Обчислення, витіснить перше значення через LRU)");