export const getUniquePaths = (paths) => [...Array.from(new Set(paths))];

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export const getPathSegments = (segments) => segments.split('/').filter(segment => segment);
