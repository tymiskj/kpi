export function asyncMapCallback(array, mapper, callback, signal) {
  if (signal?.aborted) return callback(new Error('Aborted'));
  if (array.length === 0) return callback(null, []);

  const results = new Array(array.length);
  let completed = 0;
  let hasErrored = false;

  for (let i = 0; i < array.length; i++) {
    if (hasErrored) break;

    mapper(array[i], (err, result) => {
      if (hasErrored) return;
      
      if (signal?.aborted) {
        hasErrored = true;
        return callback(new Error('Aborted'));
      }
      
      if (err) {
        hasErrored = true;
        return callback(err);
      }

      results[i] = result;
      completed++;

      if (completed === array.length) {
        callback(null, results);
      }
    });
  }
}

export async function asyncMapPromise(array, mapper, signal) {
  return Promise.all(array.map(async (item) => {
    if (signal?.aborted) throw new Error('Aborted');
    
    const result = await mapper(item);
    
    if (signal?.aborted) throw new Error('Aborted');
    
    return result;
  }));
}