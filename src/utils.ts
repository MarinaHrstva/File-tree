export const getFileName = (name: string) => {
  return (
    name
      .split("/")
      .filter((f) => !!f)
      .pop() || name
  );
};
