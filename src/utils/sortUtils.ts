// sortUtils.ts

export const copyAndSort = <T extends Record<string, any>>(
    items: T[],
    columnKey: string,
    isSortedDescending?: boolean
  ): T[] => {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) =>
      isSortedDescending ? a[key] < b[key] ? 1 : -1 : a[key] > b[key] ? 1 : -1
    );
  };
  