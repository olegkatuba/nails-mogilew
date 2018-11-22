import Router from "koa-router";
import TelegramBot from "../../telegram-bot/index";
import ConfigController from "../../db/controllers/config";
import CommentController from "../../db/controllers/comment";

let router = new Router();

router.post("/", async (ctx, next) => {
  try {
    const comment = await CommentController.addComment(ctx.request.body);
    const { telegramBot: active } = await ConfigController.getConfig();
    if (active) {
      await TelegramBot.sendNewCommentMessage(comment);
      ctx.status = 200;
    } else {
      ctx.status = 204;
    }
  } catch (err) {
    console.error(err);
    ctx.status = 500;
  }
});

router.get("/", async ctx => {
  ctx.body = await CommentController.getApprovedCommetns();
});

/*router.put("/", (ctx, next) => {
    new Email({ to: [{ name: 'Oleg', email: 'olegkatuba@gmail.com' }]}, 'subject', 'htmlTemplate')
        .send()
    ctx.body = "booked"
});*/

export default router;
