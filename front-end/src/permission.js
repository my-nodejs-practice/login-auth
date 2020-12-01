import router from './router';

router.beforeEach((to, from, next) => {
  console.log(from, '>>>', to);
  // 
  next();
});
