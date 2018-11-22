import Router from "koa-router";
import CommentController from "../../../db/controllers/comment";

let router = new Router();

router.get("/", async ctx => {
  ctx.body = await CommentController.getCommetns();
});

router.post("/", async ctx => {
  ctx.body = await CommentController.addComment(
    Object.assign(ctx.request.body, { approved: true })
  );
});

router.put("/:id/approve", async ctx => {
  ctx.request.body.approved
    ? await CommentController.approve(ctx.params.id)
    : await CommentController.reject(ctx.params.id);
  ctx.body = await CommentController.getCommetns();
});

router.delete("/:id", async ctx => {
  await CommentController.deleteComment(ctx.params.id);
  ctx.body = await CommentController.getCommetns();
});

export default router;
