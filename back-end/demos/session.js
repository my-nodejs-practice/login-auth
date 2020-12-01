const Koa = require('koa');
const session = require('koa-session');

const app = new Koa();

app.keys = ['test'];

app.use(session({ key: '__SESSION__ID__', maxAge: 30000 }, app));

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  console.log(ctx.session.isNew); // true：用户未登录，undefined：用户已经登录了。

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});

app.listen(4000);
console.log('listening on port 4000');
