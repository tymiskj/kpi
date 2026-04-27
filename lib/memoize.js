export function memoize(fn, options = {}) {
  const { maxSize = Infinity, policy = 'lru', ttl = 0, customPolicy = null } = options;
  const cache = new Map();
  const meta = new Map();

  const evict = () => {
    if (cache.size <= maxSize) return;

    let keyToRemove;
    if (customPolicy) {
      keyToRemove = customPolicy(cache, meta);
    } else if (policy === 'lru') {
      keyToRemove = [...meta.entries()].sort((a, b) => a[1].lastAccessed - b[1].lastAccessed)[0][0];
    } else if (policy === 'lfu') {
      keyToRemove = [...meta.entries()].sort((a, b) => a[1].accessCount - b[1].accessCount)[0][0];
    }

    if (keyToRemove) {
      cache.delete(keyToRemove);
      meta.delete(keyToRemove);
    }
  };

  return function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      if (ttl > 0 && now - meta.get(key).createdAt > ttl) {
        cache.delete(key);
        meta.delete(key);
      } else {
        const currentMeta = meta.get(key);
        currentMeta.lastAccessed = now;
        currentMeta.accessCount += 1;
        return cache.get(key);
      }
    }

    const result = fn(...args);
    cache.set(key, result);
    meta.set(key, { createdAt: now, lastAccessed: now, accessCount: 1 });
    
    evict();
    
    return result;
  };
}