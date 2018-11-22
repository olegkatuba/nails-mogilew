import Router from "koa-router";
import TelegramBot from "../../telegram-bot/index";
import ConfigController from "../../db/controllers/config";
import Email from "../../email";

let router = new Router();

router.post("/", async (ctx, next) => {
  try {
    console.log(ctx.request.body);
    const { telegramBot: active } = await ConfigController.getConfig();
    if (active) {
      await TelegramBot.sendReservationMessage(ctx.request.body);
      ctx.status = 200;
    } else {
      ctx.status = 204;
    }
  } catch (err) {
    console.error(err);
    ctx.status = 500;
  }
});

/*router.put("/", (ctx, next) => {
    new Email({ to: [{ name: 'Oleg', email: 'olegkatuba@gmail.com' }]}, 'subject', 'htmlTemplate')
        .send()
    ctx.body = "booked"
});*/

export default router;
