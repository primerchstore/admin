export const validateQueryResult = (data: any): boolean => {
  return (
    data &&
    data.success &&
    data.result &&
    data.result.query &&
    Array.isArray(data.result.query)
  );
};
