export function searchFilter<T extends object>(
  items: T[],
  query: string,
  keys: (keyof T & string)[]
): T[] {
  if (!query) return items;

  return items.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(query.toLowerCase())
      );
    })
  );
}
