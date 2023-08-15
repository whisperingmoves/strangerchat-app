export const copy = (target: any, source: any) => {
  for (const key in source) {
    if (key in target && typeof source[key] === typeof target[key]) {
      target[key] = source[key];
    }
  }
};

export const copyWithoutEmpty = (target: any, source: any) => {
  for (const key in source) {
    if (key in target && source[key]) {
      target[key] = source[key];
    }
  }
};
