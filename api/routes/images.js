import Router from "koa-router";
import ImagesController from "../../db/controllers/images";

let router = new Router();

router.get("/", async ctx => {
  ctx.body = await ImagesController.getImages();
});

export default router;
