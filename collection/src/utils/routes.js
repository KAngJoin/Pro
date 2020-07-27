const ctx = require.context('../router/routes', false, /\.routes\.js$/);
let routerList = [];
ctx.keys().forEach(key => { routerList.push(ctx(key).default) });

export default routerList