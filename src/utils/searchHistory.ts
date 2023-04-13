// This Util uses for add a text to search history
// Max histories is 5 items
export default class SearchHistoryUtils {
  static addSearchHistory<T extends any>(histories: T[], newItem: any): T[] {
    if (!histories) {
      histories = [];
    }
    if (!newItem || (typeof newItem === 'string' && newItem.length === 0)) {
      return histories;
    }
    if (histories.length >= 5) {
      histories = histories.slice(0, 3);
    }
    const existingIndex = histories.findIndex(p => p === newItem);
    if (existingIndex >= 0) {
      histories.splice(existingIndex, 1);
    }
    histories.unshift(newItem);
    return histories;
  }
}
