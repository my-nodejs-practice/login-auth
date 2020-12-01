const Koa = require('koa');
const app = new Koa();

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = start - Date.now();
  console.log(`x-response-time - ${ms}`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = start - Date.now();
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response
app.use(async ctx => {
  ctx.body = 'Hello, world!';
});

app.listen(3000);
