import numeral from "numeral";

function escapeChars(str: string): string {
  return str?.replace(/&quot;/g, '"')?.replace(/&#039;/g, "'");
}

function average(array: number[]): number[] {
  if (!array) return [0];
  if (array.length === 0) return [0];
  return [Math.round(array.reduce((a, b) => a + b, 0) / array.length)];
}

function formatMoney(amount: number): string {
  return numeral(amount).format("$0,0 a").toUpperCase();
}

function formatVoteCount(amount: number): string {
  return numeral(amount).format("0,0 a").toUpperCase();
}

export enum SortingOrder {
  ASC = "ASC",
  DSC = "DSC",
}

/**
 * [random - generates a random number between min and max]
 *
 * **Both the min and max are inclusive**
 *
 * @param   {number}  min  [the lower bound]
 * @param   {number}  max  [the upper bound]
 *
 * @return  {[type]}       [the random number]
 */
function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * [sort - sorts an array in ascending or descending order]
 *
 * **Returns a copy of the array**
 *
 * @param   {T[]}           arr        [the array to sort]
 * @param   {SortingOrder}  order      [the order to sort in]
 * @param   {T}             compareCB  [the callback to use for comparing]
 *
 * @return  {T[]}                      [the sorted array]
 */
function sort<T>(
  arr: T[],
  order: SortingOrder,
  compareCB: (a: T, b: T) => number
): T[] {
  const copy = [...arr];
  if (order === SortingOrder.ASC) {
    copy.sort(compareCB);
  } else if (order === SortingOrder.DSC) {
    copy.sort((a, b) => compareCB(b, a));
  }
  return copy;
}
/**
 * [filter - filters an array using a callback]
 *
 * **Returns a copy of the array**
 *
 * @param   {T[]}     arr       [the array to filter]
 * @param   {T}       filterCB  [the callback to use for filtering]
 *
 * @return  {T[]}               [the filtered array]
 */
function filter<T>(
  arr: T[],
  filterCB: (value: T, index: number, arr: T[]) => boolean
): T[] {
  return arr.filter(filterCB);
}

/**
 * [find - finds an element in an array using a callback]
 *
 *
 * @param   {T[]}     arr     [the array to search]
 * @param   {T}       findCB  [the callback to use for finding]
 *
 * @return  {T}               [the found element or undefined]
 */
function find<T>(
  arr: T[],
  findCB: (elem: T, index: number, obj: T[]) => boolean
): T | undefined {
  return arr.find(findCB);
}

export {
  random,
  sort,
  filter,
  find,
  escapeChars,
  average,
  formatMoney,
  formatVoteCount,
};
