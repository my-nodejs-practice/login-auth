const Koa = require('koa');
const Router = require('@koa/router'); // 路由支持
const cors = require('@koa/cors'); // 跨域支持
const bodyParser = require('koa-bodyparser'); // request参数解析

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
      expiresIn: '10000', // 支持写法 10000(10秒)、2d(2天)、10h(10小时)等
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

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, function () {
  console.log('Server is running on port 3001');
});
