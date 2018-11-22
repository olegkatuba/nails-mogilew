import Router from "koa-router";
import ImageController from "../../../db/controllers/images";

let router = new Router();

router.get("/", async ctx => {
  ctx.body = await ImageController.getImages();
});

router.post("/", async ctx => {
  ctx.body = await ImageController.addImage(ctx.request.body);
});

router.delete("/:id", async ctx => {
  await ImageController.deleteImage(ctx.params.id);
  ctx.status = 200;
});

export default router;
