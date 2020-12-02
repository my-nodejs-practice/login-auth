const Koa = require('koa');
const Router = require('@koa/router'); // 路由支持
const cors = require('@koa/cors'); // 跨域支持
const bodyParser = require('koa-bodyparser'); // request参数解析

const axios = require('axios');
const hmacSha256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');

const jwt = require('jsonwebtoken');
const { find } = require('./db');

const salt = '!@#$qwer_$#@!!@#$';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

const generateToken = function (payload) {
  // 生成token
  const token = jwt.sign(
    payload, // payload 存储信息
    salt, // secretOrPrivateKey 签名秘钥
    {
      expiresIn: '1h', // 支持写法 10000(10秒)、2d(2天)、10h(10小时)等
    } // options
  );
  return token;
};

const auth = async (ctx, next) => {
  const auth = ctx.get('Authorization');
  const token = auth ? auth.split(' ')[1] : null;
  if (token) {
    try {
      const decoded = jwt.verify(
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibHpnIiwiaWF0IjoxNjA2ODE5MDYzLCJleHAiOjE2MDY4MTkwNzN9.C4p3_T4Njefce2gmAkDGDeWVvhDkMXWaQI8veeg5uh0',
        token,
        salt
      );
      console.log(decoded);
      ctx.auth = decoded;
    } catch (error) {
      console.log('[error]', error);
      ctx.auth = null;
    }
  } else {
    ctx.auth = null;
  }
  next();
};

router.post('/login', async ctx => {
  const { username, password } = ctx.request.body;
  const u = find({ username, password }); // 模拟查库
  if (u) {
    const token = generateToken({
      user: {
        id: u.id,
        username: u.username,
        age: u.age,
        job: u.job,
      },
    });
    ctx.body = {
      code: 0,
      token,
      data: {
        username,
      },
    };
  } else {
    ctx.body = {
      code: 4000,
      message: '账号或密码错误',
    };
  }
});

router.get('/user_info', auth, async ctx => {
  // 未正常解析到token信息
  if (!ctx.auth) {
    ctx.body = {
      code: 5000,
      message: '登录失效，请重新登录',
    };
  } else {
    ctx.body = {
      code: 0,
      // 从token中获取用户信息
      data: ctx.auth.user,
    };
  }
});

router.get('/oauth/redirect', async ctx => {
  // https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoaclfbe25fhhtdsutf&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Foauth%2Fredirect
  // http://127.0.0.1:3001/oauth/redirect

  // 用户打开客户端以后，客户端要求用户给予授权。
  // 用户同意给予客户端授权（钉钉重定向到redirect_uri（一般是客户端对应的服务端（后面简称：客户服务端）），并将code传过来）
  // 客户服务端拿着code向钉钉申请令牌（access_token）
  // 钉钉对客户服务端进行认证以后，确认无误，同意发放令牌。
  // 客户服务端拿着令牌向钉钉资源服务器获取用户信息
  // 钉钉确认令牌无误，同意向客户端开放资源。
  // 客户服务端拿到用户信息做剩余的工作：拿到用户信息之后，可以保存用户信息，也可以直接生成token回传给客户端。

  // 通过返回的code获取access_token
  // code: '2c5a18d2d3733ac08238e1560d3592d4';
  // state: 'STATE';
  // const appId = 'dingoaclfbe25fhhtdsutf';

  const appSecret = '6vunxRabKjLDPrTjkX9H8NqgSPU3GUVxtr1aGPjEKroj94UB4y2zB0x_BJ3Sl4yh';
  const now = Date.now();
  // 签名算法
  const hashDigest = hmacSha256(now.toString(), appSecret);
  const hashDigestInBase64 = Base64.stringify(hashDigest);
  // 获取到urlEncode之后的签名。
  const signature = encodeURIComponent(hashDigestInBase64);
  // 获取用户信息
  const res = await axios.post(
    `https://oapi.dingtalk.com/sns/getuserinfo_bycode?accessKey=dingoaclfbe25fhhtdsutf&timestamp=${now}&signature=${signature}`,
    {
      // body
      tmp_auth_code: ctx.query.code,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  // 853004	signature参数不正确，与钉钉服务端计算出来的签名不一致，注意该参数传递时必须urlEncode
  console.log('res.data: ', res.data);

  // 生成token
  if (res.data.errcode != 0) {
    ctx.body = res.data;
    return;
  }

  /*
    {
    "errcode": 0,
    "errmsg": "ok",
    "user_info": {
            "nick": "李志高",
            "unionid": "7oQfdIJT6EQiE",
            "dingId": "$:LWCP_v1:$JRxVVUPdzT11TluNDyz12w==",
            "openid": "Qp9NKy1iiYKYiE",
            "main_org_auth_high_level": true
        }
    }
  */
  const token = generateToken({ user: res.data.user_info });
  ctx.redirect(`http://127.0.0.1:8080/#/dingtalk?token=${token}`);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, function () {
  console.log('Server is running on port 3001');
});
