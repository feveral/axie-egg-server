import * as Router from 'koa-router';

export default (router: Router) => {
    router.get('/test', async (ctx: any, next: any) => ctx.body = {result: 'OK'})
}