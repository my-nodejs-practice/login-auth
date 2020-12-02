const jwt = require('jsonwebtoken');

const salt = '!@#$qwer_$#@!!@#$';

// 生成token
const token = jwt.sign(
  {
    id: 1,
    name: 'lzg',
  }, // payload 存储信息
  salt, // secretOrPrivateKey 签名秘钥
  {
    expiresIn: '10000', // 支持写法 10000(10秒)、2d(2天)、10h(10小时)等
  } // options
);

// JSON Web Token 入门教程：http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
// Header.Payload.Signature（头部.负载.签名）
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibHpnIiwiaWF0IjoxNjA2ODE4Mzc2fQ.qC58MEgYPgssmn-pyXwvYf2VpIdzYKJg-5sOa0lyzfE
console.log(token);

// 校验token
try {
  const decoded = jwt.verify(
    token,
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibHpnIiwiaWF0IjoxNjA2ODE5MDYzLCJleHAiOjE2MDY4MTkwNzN9.C4p3_T4Njefce2gmAkDGDeWVvhDkMXWaQI8veeg5uh0',
    salt
  );
  console.log(decoded);
} catch (error) {
  /*
    error = {
      name: 'TokenExpiredError',
      message: 'jwt expired',
      expiredAt: 1408621000
    }
  */
  if ('TokenExpiredError' == error.name) {
    console.log('token已过期');
  } else {
    console.log('token不合法');
    throw error;
  }
}
