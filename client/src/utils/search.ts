export const searchFilter = <T extends Record<string, unknown>>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] => {
  if (!query.trim()) return items;

  const lowerQuery = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) =>
      String(item[field]).toLowerCase().includes(lowerQuery)
    )
  );
};
