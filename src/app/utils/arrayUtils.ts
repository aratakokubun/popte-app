'use strict';

export class ArrayUtils {
  /**
   * Randomly select elements from array.
   * @param array array to select items from
   * @param maxGen : number of item to select ( < length of array)
   * @param from : specify range from (>= 0 and < to)
   * @param to : specify range to (>= from and < length of array)
   * @return an array contains randomly selected element
   */
  public static randomSelect<T>(array: T[], numOfItems?: number, from?: number, to?: number): T[] {
    if (numOfItems == null) { numOfItems = array.length; }
    if (from == null) { from = 0; }
    if (to == null) { to = array.length - 1; }
    to = Math.min(to, array.length);
    from = Math.max(0, from);
    from = Math.min(from, to);
    numOfItems = Math.min(numOfItems, to - from);

    const indices = [];
    for (let i = from; i < to; ++i) {
      indices[i] = i;
    }
    ArrayUtils.shuffle(indices);

    const selected = [];
    for (let i = 0; i < numOfItems; i++) {
      selected[i] = array[indices[i]];
    }
    return selected;
  }

  public static shuffle<T>(array: T[]): T[] {
    for (let i: number = array.length - 1; i >= 0; i--) {
        const randomIndex: number = Math.floor(Math.random() * (i + 1));
        const itemAtIndex: T = array[randomIndex];

        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    }
    return array;
  }

  public static deepCopy<T>(array: T[]): T[] {
    return Object.assign([], array);
  }
}
