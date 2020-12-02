const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const koaBody = require('koa-body');

const app = new Koa();

app.use(bodyParser());
// app.use(koaBody({ multipart: true }));

app.use(ctx => {
  // ctx.query 获取params参数
  // ctx.request.body 获取body参数
  ctx.body = {
    code: 0,
    data: ctx.query,
  };
});

app.listen(4000, () => {
  console.log(`服务器启动：http://127.0.0.1:4000`);
});
