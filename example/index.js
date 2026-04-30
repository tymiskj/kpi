import { randomNumberGenerator, consumeWithTimeout, memoize, BiDirectionalPriorityQueue, asyncMapCallback, asyncMapPromise } from 'kpi-async-iterator-lib';

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

console.log("\n=== Демонстрація Task 4: Priority Queue ===");

const queue = new BiDirectionalPriorityQueue();

queue.enqueue("Завдання А", 1);
queue.enqueue("Завдання Б", 10);
queue.enqueue("Завдання В", 5);
queue.enqueue("Завдання Г", 0);

console.log("Peek 'highest':", queue.peek('highest'));
console.log("Dequeue 'highest':", queue.dequeue('highest'));

console.log("Dequeue 'lowest':", queue.dequeue('lowest'));
console.log("Dequeue 'oldest':", queue.dequeue('oldest'));
console.log("Dequeue 'newest':", queue.dequeue('newest'));

console.log("Peek порожньої черги:", queue.peek('highest'));

console.log("\n=== Демонстрація Task 5: Async Map Variants ===");

const data = [1, 2, 3];

const multiplyByTwoCallback = (item, cb) => {
  setTimeout(() => cb(null, item * 2), 50);
};

await new Promise((resolve) => {
  asyncMapCallback(data, multiplyByTwoCallback, (err, result) => {
    if (err) console.error("Callback Error:", err.message);
    else console.log("1. Callback Map Result:", result);
    resolve();
  });
});

const multiplyByTwoPromise = async (item) => {
  return new Promise(resolve => setTimeout(() => resolve(item * 2), 50));
};

try {
  const result = await asyncMapPromise(data, multiplyByTwoPromise);
  console.log("2. Promise Map Result:", result);
} catch (err) {
  console.error("Promise Error:", err.message);
}

const controller = new AbortController();
const slowTask = async (item) => {
  return new Promise(resolve => setTimeout(() => resolve(item * 10), 500));
};

setTimeout(() => controller.abort(), 100);

try {
  await asyncMapPromise(data, slowTask, controller.signal);
  console.log("Цей текст не має вивестись");
} catch (err) {
  console.log("3. AbortController Result: Успішно скасовано ->", err.message);
}