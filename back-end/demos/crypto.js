// const hmacSha256 = require('crypto-js/hmac-sha256');
// const Base64 = require('crypto-js/enc-base64');
const CryptoJS = require('crypto-js');

const appSecret = '6vunxRabKjLDPrTjkX9H8NqgSPU3GUVxtr1aGPjEKroj94UB4y2zB0x_BJ3Sl4yh';
const now = Date.now();

// const hashDigest = hmacSha256(now.toString(), appSecret);
// const signature = encodeURIComponent(Base64.stringify(hashDigest));
// console.log(signature);


var hash = CryptoJS.HmacSHA256(now.toString(), appSecret);
var signature = CryptoJS.enc.Base64.stringify(hash);

console.log(signature);
