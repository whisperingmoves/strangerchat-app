export const copy = (target: any, source: any) => {
  for (const key in source) {
    if (key in target && typeof source[key] === typeof target[key]) {
      target[key] = source[key];
    }
  }
};
