const express = require("express");
const app = express();
const db = require("./db/models");
const commentRouter = require("./db/routers/commentRoutes.js");
const postRouter = require("./db/routers/postRoutes");
const relationRouter = require("./db/routers/relationRoutes");
const tagRouter = require("./db/routers/tagRoutes");
const userRouter = require("./db/routers/userRoutes");
const PORT = 5000

app.use(express.json());

app.use("/comment",commentRouter);
app.use("/post",postRouter);
app.use("/relation",relationRouter);
app.use("/tag",tagRouter);
app.use("/user",userRouter);

app.listen(PORT,async() => {
    await db.sequelize.sync();
    console.log("servidor esta escuchando")
})