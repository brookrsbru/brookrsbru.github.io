/**
 * Converts a 0-indexed column number to an Excel-style column name (A, B, ..., Z, AA, ..., ZZZ).
 */
export function getColumnName(index: number): string {
  let name = "";
  let i = index;
  while (i >= 0) {
    name = String.fromCharCode((i % 26) + 65) + name;
    i = Math.floor(i / 26) - 1;
  }
  return name;
}
