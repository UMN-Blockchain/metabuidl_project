const { spawn } = require("child_process");
const CryptoJS = require("crypto-js");

export const createShares = async (key, num_shares, minimum, passphrase) => {
  // Run python script
  const python = spawn("python", [
    "invoke_secret_sharing.py",
    "scramble",
    key,
    num_shares,
    minimum,
  ]);

  let data = "";

  for await (const chunk of python.stdout) {
    data += chunk;
  }

  const exit_code = await new Promise((resolve, reject) => {
    python.on("exit", resolve);
  });

  if (exit_code == 1) throw "Invalid argument";

  return data
    .toString()
    .trim()
    .split(/\s+/)
    .map((share) => CryptoJS.AES.encrypt(share, passphrase).toString());
};

export const recoverKey = async (shares, passphrase) => {
  // Run python script
  const python = spawn(
    "python",
    Array.prototype.concat(
      ["invoke_secret_sharing.py", "unscramble"],
      shares.map((share) =>
        CryptoJS.AES.decrypt(share, passphrase).toString(CryptoJS.enc.Utf8)
      )
    )
  );

  let data = "";

  for await (const chunk of python.stdout) {
    data += chunk;
  }

  const exit_code = await new Promise((resolve, reject) => {
    python.on("exit", resolve);
  });

  if (exit_code == 2) throw "Insufficient number of shares";

  return data.toString();
};

// (async () => {
//   console.log(await createShares("testing", 4, 3, "salt"));
//   const shares = [
//     "U2FsdGVkX19SvkuZgVVbZIZz3IrnsFQFJtCv9dN8UubY72EjpIeVzmLILhFDRJmXNwErvUEH/x5mR2PoxL3UfjxYCu23knXCjbVurVn6K0FNFELs6yB9MiQhRey1tlKY",
//     "U2FsdGVkX1+NgBEbmx1yzRtxJHxZrTCENB/UoDlIcAUlD0R4hrygLu2QOXxfBDRM/txTirMhUGCcstvh6L67mMT2Kkijf9hoQr5NYyrMPAynSvducDXI1oQgH0g7hw3Q",
//     "U2FsdGVkX18r52PE3mpXSBvOMzrx4SnAGHf5gOGA8lO0ILjg1fmZE04/qPBkQ/BiL6aKfTeYR/Z5Sgw+7s6XpRrbA69G7AjiQ6lJYMtTJrvg5RYO+5fz37/52mJ9R5SU",
//     "U2FsdGVkX19SnyDPjGJxWhYujGcy5Tr/rOI3tzXsZa4jc7/0nN1tByA/kj806/UQViajwlZcTmdJzdBsQAopv15kvxlgQmrzqZFqUrsATvvCjKrvGyccq1RqyQ6E/8dJ",
//   ];
//   console.log(await recoverKey(shares, "salt"));
// })();
