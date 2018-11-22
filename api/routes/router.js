import Router from "koa-router";
import CommentsRouter from "./comments";
import ImagesRouter from "./images";
import AdminRouter from "./admin";
import BookingRouter from "./booking";

let router = new Router();

router.use("/booking", BookingRouter.routes(), BookingRouter.allowedMethods());
router.use("/images", ImagesRouter.routes(), ImagesRouter.allowedMethods());
router.use(
  "/comments",
  CommentsRouter.routes(),
  CommentsRouter.allowedMethods()
);
router.use("/admin", AdminRouter.routes(), AdminRouter.allowedMethods());

export default router;
