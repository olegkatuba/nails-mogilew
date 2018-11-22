import Router from "koa-router"
import TelegramRecipientsController from '../../../db/controllers/telegramRecipients'

let router = new Router();

router.get('/recipients', async (ctx) => {
  ctx.body = await TelegramRecipientsController.getTelegramRecipients()
})

router.delete('/recipients/:id', async ctx => {
  await TelegramRecipientsController.deleteTelegramRecipient(ctx.params.id)
  ctx.body = await TelegramRecipientsController.getTelegramRecipients()
})

export default router
