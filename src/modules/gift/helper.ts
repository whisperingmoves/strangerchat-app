import {Item} from './components/Item';

export const transformItemArray = (itemArray: Item[]): Item[][] => {
  const transformedArray: Item[][] = [];

  for (let i = 0; i < itemArray.length; i += 2) {
    const pair: Item[] = itemArray.slice(i, i + 2);
    transformedArray.push(pair);
  }

  return transformedArray;
};
