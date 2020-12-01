const Koa = require('koa');
const Router = require('@koa/router'); // 路由支持
const cors = require('@koa/cors'); // 跨域支持
const bodyParser = require('koa-bodyparser'); // request参数解析
const session = require('koa-session'); // session 操作
const app = new Koa();
const router = new Router();

const { find, findById } = require('./db');

app.use(
  cors({
    credentials: true, // 支持跨域接收cookie
    // origin: '*', // 跨域接收cookie信息时，不能将`Access-Control-Allow-Origin`设置为`*`
  })
);
app.use(bodyParser());

app.keys = ['ka!@#$']; // 签名
app.use(
  session(
    {
      key: '__SESSION_ID__', // 指定cookie key名称
      maxAge: 60 * 60 * 1000, // cookie有效时间，单位ms
    },
    app
  )
);

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const u = find({ username, password });
  if (u) {
    ctx.session.uid = ctx.session.uid || null;
    if (!ctx.session.isNew && ctx.session.uid) {
      ctx.body = {
        code: 0,
        message: '已经登录过了',
      };
    } else {
      ctx.body = {
        code: 0,
        data: {
          username,
        },
      };
      ctx.session.uid = u.id;
    }
  } else {
    ctx.body = {
      code: 4000,
      message: '账号或密码错误',
    };
  }
});

router.get('/user_info', async (ctx, next) => {
  const uid = ctx.session.uid;
  if (!uid) {
    ctx.body = {
      code: 5000,
      message: '登录失效，请重新登录',
    };
  } else {
    const user = findById(uid);
    ctx.body = {
      code: 0,
      data: {
        username: user.username,
        age: user.age,
        job: user.job,
      },
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
