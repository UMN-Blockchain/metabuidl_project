const polynomial = (x, coefficients, mod) => {
  var xToTheI = 1,
    result = 0;
  for (var i = 0; i < coefficients.length; i++) {
    result += coefficients[i] * xToTheI;
    xToTheI *= x;
    result %= mod;
  }
  return result;
};

const pair = (int1, int2) => {
  var added = int1 + int2;
  return int2 + Math.floor((added * (added + 1)) / 2);
};

const unpair = (num) => {
  var w = Math.floor(Math.sqrt(8 * num + 1) / 2);
  var t = Math.floor((w * w + w) / 2);
  var y = num - t;
  var x = w - y;
  return [x, y];
};

const x_gcd = (a, b) => {
  var x = 0,
    lastX = 1;
  while (b != 0) {
    let quot = Math.floor(a / b);
    let tempa = a;
    a = b;
    b = tempa % b;
    let temp = x;
    x = lastX - quot * x;
    lastX = temp;
  }
  return lastX;
};

// HUMAN WARNING - this code seems a little wonky
// Please check to make sure it looks good to you before using!
const interpolate = (points, mod, x = 0) => {
  var mod_div = function (num, den) {
    return num * x_gcd(den, mod);
  };
  // mod_div finds num / den modulo prime p
  // return satisfies: den * _divmod(num, den, p) % p == num
  var x_arr = points.map(function (p) {
    return p[0];
  });
  var y_arr = points.map(function (p) {
    return p[1];
  });
  var nums = [];
  var dens = [];
  for (var idx = 0; idx < x_arr.length; idx++) {
    var cur = x_arr[idx];
    var others = x_arr.filter(function (num, i) {
      return i != idx;
    });
    nums.push(
      others
        .map(function (other) {
          return x - other;
        })
        .reduce((x, y) => x * y)
    );
    dens.push(
      others
        .map(function (other) {
          return cur - other;
        })
        .reduce((x, y) => x * y)
    );
  }
  var den = dens.reduce((x, y) => x * y);
  var num = y_arr
    .map(function (den, i) {
      return mod_div((nums[i] * den * y_arr[i]) % mod, dens[i]);
    })
    .reduce((x, y) => x + y);
  return (mod_div(num, den) + mod) % mod;
};

const encodeStr = (keyStr) => {
  return keyStr.split("").reduce(function (a, b) {
    return (a << 8) | b.charCodeAt(0);
  }, 0);
};

const decodeInt = (key) => {
  var bytes = [];
  var mask = 0xff;
  for (var i = 0; i < 4; i++) {
    bytes.push(key & mask);
    key = key >> 8;
  }
  return String.fromCharCode.apply(null, bytes.reverse());
};

module.exports = {
  polynomial,
  pair,
  unpair,
  x_gcd,
  interpolate,
  encodeStr,
  decodeInt,
};
