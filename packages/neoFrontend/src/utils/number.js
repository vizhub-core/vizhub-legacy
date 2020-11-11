import { range } from './array';

//we check isFinite first since it will weed out most of the non-numbers
//like mixed numbers and strings, which parseFloat happily accepts
const isFiniteNumber = (n) => isFinite(n) && !isNaN(parseFloat(n));

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
        const rangeBoundries = entry.split('-');

        //check if what we split are both numbers, else skip
        if (
          !isFiniteNumber(rangeBoundries[0]) ||
          !isFiniteNumber(rangeBoundries[1])
        )
          return sequence;

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
