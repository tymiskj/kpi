export async function* createLargeDataStream(recordCount) {
  for (let i = 0; i < recordCount; i++) {
    yield {
      id: i,
      value: Math.random() * 100,
      timestamp: Date.now()
    };
  }
}

export async function processDataStream(stream, filterThreshold) {
  let processed = 0;
  let matchCount = 0;

  for await (const chunk of stream) {
    processed++;
    if (chunk.value > filterThreshold) {
      matchCount++;
    }
  }

  return { processed, matchCount };
}