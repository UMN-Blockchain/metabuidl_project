const sm = require("./secure_math.js");
const _PRIME = 2 ** 32 - 1;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const createShares = (key, numShares, minimum) => {
  if (minimum === undefined) minimum = numShares;
  // generate a random polynomial with key as y-intercept
  var coefficients = [key]
    .concat([...Array(minimum - 1).keys()])
    .map(function () {
      return getRandomInt(_PRIME);
    });
  // prime mod to evaluate over finite field
  return [...Array(numShares).keys()].map(function (i) {
    return sm.pair(i + 1, sm.polynomial(i + 1, coefficients, _PRIME));
  });
};

const recoverKey = (shares) => {
  var points = shares.map(sm.unpair);
  return sm.interpolate(points, _PRIME);
};

shares = createShares(150004, 4, 3);

console.log(shares);
console.log(recoverKey(shares));
