import { range, xorSwap } from './array';

//we check isFinite first since it will weed out most of the non-numbers
//like mixed numbers and strings, which parseFloat happily accepts
const isFiniteNumber = (n) => Boolean(isFinite(n) && !isNaN(parseFloat(n)));

export const isValidRangeBoundariesString = (rangeBoundariesString) => {
  const rangeBoundries = rangeBoundariesString.split('-');

  //check if what we split are both numbers, else return nothing
  return isFiniteNumber(rangeBoundries[0]) && isFiniteNumber(rangeBoundries[1]);
};

export const parseRangeBoundariesString = (rangeBoundariesString) => {
  if (isValidRangeBoundariesString(rangeBoundariesString)) {
    // xorSwap is smart reverse, if range is 10,20 (asc order) it returns 10,20(stays same), if range is 20,10 (desc order) it returns 10,20 (do reverse)
    return xorSwap(rangeBoundariesString.split('-'));
  }

  return null;
};

// inspired by https://codereview.stackexchange.com/questions/26125/getting-all-number-from-a-string-like-this-1-2-5-9
// and http://jsfiddle.net/mkhC3/1/
export const parseNumberSequenceString = (sequenceString) =>
  sequenceString
    .split(',')
    .reduce((sequence, entry) => {
      if (isFiniteNumber(entry)) {
        //we check if the entry itself is a number. If it is, then we push it directly.
        //an additinal advantage is that negative numbers are valid
        return [...sequence, +entry];
      } else {
        //if not a number, probably it had the - and not being a negative number
        //only here do we split after we determined that the entry isn't a number
        const rangeBoundries = parseRangeBoundariesString(entry);

        if (!rangeBoundries) return sequence;

        const [from, to] = rangeBoundries;

        return [...sequence, ...range(from, to)];
      }
    }, [])
    .sort((a, b) => a - b);

export const convertToNumberSequence = (numbers) => {
  // TODO: add more sophisticated implementation for ranges if needed,
  // currently there is only one simple use case is used: convert single number to string
  return numbers.join();
};
