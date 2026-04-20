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

  console.log(`Починаємо обробку ітератора на ${timeoutSeconds} секунд...\n`);

  while (Date.now() - startTime < timeoutMilliseconds) {
    const { value, done } = iterator.next();
    
    if (done) break;

    count++;
    totalSum += value;
    const average = (totalSum / count).toFixed(2);

    console.log(`Ітерація ${count}: Згенеровано [${value}] | Загальна сума: ${totalSum} | Середнє: ${average}`);

    await delay(100);
  }

  console.log(`\nЧас вийшов! Оброблено значень за ${timeoutSeconds} сек: ${count}`);
}

const myRandomIterator = randomNumberGenerator();
consumeWithTimeout(myRandomIterator, 2);