const makeSymmDiffFunc = (function() {
    const contains = function(pred, a, list) {
        let idx = -1;
        const len = list.length;
        while (++idx < len) {if (pred(a, list[idx])) {return true; }
      }
        return false;
    };
    const complement = function(pred, a, b) {
        return a.filter(function(elem) {return !contains(pred, elem, b);
        });
    };
    return function(pred) {
        return function(a, b) {
            return complement(pred, a, b).concat(complement(pred, b, a));
        };
    };
  }());
  export const myDiffs = makeSymmDiffFunc(function(x, y) {
    return x.symbol === y.symbol;
  });
// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
