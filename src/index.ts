import('tsconfig-paths').then(({ register }) => {
  register({
    baseUrl: __dirname,
    paths: { '@/*': ['*'] },
    addMatchAll: false,
  });
})
.then(() => import('@/prueba'))
.then(({b}) => console.log(b));
