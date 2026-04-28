export class BiDirectionalPriorityQueue {
  constructor() {
    this.items = [];
    this.insertOrder = 0;
  }

  enqueue(item, priority) {
    this.items.push({
      item: item,
      priority: priority,
      order: this.insertOrder++
    });
  }

  _findIndex(criteria) {
    if (this.items.length === 0) return -1;

    let bestIndex = 0;
    for (let i = 1; i < this.items.length; i++) {
      const current = this.items[i];
      const best = this.items[bestIndex];

      if (criteria === 'highest' && current.priority > best.priority) {
        bestIndex = i;
      } else if (criteria === 'lowest' && current.priority < best.priority) {
        bestIndex = i;
      } else if (criteria === 'newest' && current.order > best.order) {
        bestIndex = i;
      } else if (criteria === 'oldest' && current.order < best.order) {
        bestIndex = i;
      }
    }
    return bestIndex;
  }

  peek(criteria) {
    const index = this._findIndex(criteria);
    return index !== -1 ? this.items[index].item : null;
  }

  dequeue(criteria) {
    const index = this._findIndex(criteria);
    if (index !== -1) {
      const removed = this.items.splice(index, 1);
      return removed[0].item;
    }
    return null;
  }
}