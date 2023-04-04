export const convertToStringList = (value?: string): string[] | undefined => {
  if (!value) {
    return undefined;
  }
  const stringArray = value?.replaceAll(' ', '')?.split(',');
  return stringArray?.filter((row) => row !== '' && row !== null && row !== undefined) || [];
};

export const convertToNumberList = (value?: string): number[] | undefined => {
  if (!value) {
    return undefined;
  }
  const stringArray = value?.replaceAll(' ', '')?.split(',');
  return stringArray?.filter((row) => row !== '' && row !== null && row !== undefined)?.map((row) => +row) || [];
};
