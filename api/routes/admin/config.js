import Router from "koa-router"
import ConfigController from '../../../db/controllers/config'

let router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await ConfigController.getConfig()
});

router.put('/', async ctx => {
  await ConfigController.updateConfig(ctx.request.body)
  ctx.status = 200
})

export default router
