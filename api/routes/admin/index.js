import Router from "koa-router"
import send from 'koa-send'
import CommentsRouter from './comments'
import ImagesRouter from './images'
import ConfigRouter from './config'
import TelegramBotRouter from './telegramBot'

let router = new Router();

router.use('/comments', CommentsRouter.routes(), CommentsRouter.allowedMethods());
router.use('/images', ImagesRouter.routes(), ImagesRouter.allowedMethods());
router.use('/config', ConfigRouter.routes(), ConfigRouter.allowedMethods());
router.use('/telegramBot', TelegramBotRouter.routes(), TelegramBotRouter.allowedMethods());

router.get('/', async (ctx) => {
    await send(ctx, 'admin/build/index.html');
})

export default router
