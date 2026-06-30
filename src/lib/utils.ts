// helper function to filter null/undefined values
export const notNull = <T>(x: T): x is NonNullable<T> => x != null;
