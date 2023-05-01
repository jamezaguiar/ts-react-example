export function sortByKey<T>(
  arr: T[],
  key: keyof T,
  direction: 'ASC' | 'DESC' = 'ASC'
) {
  return arr.slice().sort((a, b) => {
    const aKey = a[key];
    const bKey = b[key];

    if (typeof aKey === 'string' && typeof bKey === 'string') {
      return direction === 'ASC'
        ? aKey.localeCompare(bKey)
        : bKey.localeCompare(aKey);
    }

    if (typeof aKey === 'number' && typeof bKey === 'number') {
      return direction === 'ASC' ? aKey - bKey : bKey - aKey;
    }

    return 0;
  });
}
