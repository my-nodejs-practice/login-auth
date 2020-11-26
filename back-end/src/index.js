const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'home';
});

router.get('/login', async (ctx, next) => {
  ctx.body = 'login';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
