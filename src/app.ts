import * as fs from "fs";
import * as dotEnv from 'dotenv';
import * as Koa from 'koa';
import * as koaCors from '@koa/cors';
import * as Router from 'koa-router';
import * as koaLogger from 'koa-logger';
import * as koaBody from 'koa-body';

import marketSyncer from './libs/marketSyncer'

dotEnv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' })

import config from './config';
import routes from './routes';

const app = new Koa()
const router = new Router()

routes(router)

app.use(koaCors())
app.use(koaLogger())
app.use(koaBody({parsedMethods:['POST', 'PUT', 'GET', 'DELETE']})) 
app.use(router.routes())
app.use(router.allowedMethods())

app.use((ctx) => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('src/public/index.html')
})

app.listen(config.serverPort, () => {
    console.log(`[Info] Mode: ${process.env.NODE_ENV}`)
    console.log(`[Info] Server is listening on port ${config.serverPort}.`)
    app.emit("app_started")
})

// marketSyncer.startSync()

module.exports = app