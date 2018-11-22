import Koa from "koa";
import koaBody from "koa-body";
import serve from "koa-static";
import cors from "@koa/cors";
import Router from "./routes/router";

const app = new Koa();

app.use(koaBody());
app.use(serve("client"));
app.use(serve("admin/build"));
app.use(cors());

app.use(Router.routes()).use(Router.allowedMethods());

app.on("error", (err, ctx) => {
  log.error("server error", err, ctx);
});

module.exports = app;
