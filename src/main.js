require('dotenv').config();
const express = require("express");
const app = express();
const db = require("./db/models");
const path = require("path");

const commentRouter = require("./db/routers/commentRoutes.js");
const postRouter = require("./db/routers/postRoutes");
const relationRouter = require("./db/routers/relationRoutes");
const tagRouter = require("./db/routers/tagRoutes");
const userRouter = require("./db/routers/userRoutes");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const PORT = 5000;

app.use(express.json());

app.use("/comment", commentRouter);
app.use("/post", postRouter);
app.use("/relation", relationRouter);
app.use("/tag", tagRouter);
app.use("/user", userRouter);

const swaggerDocument = YAML.load(path.join(process.cwd(), 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function startServer() {
  try {
    await db.sequelize.authenticate();

    await db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`✅ App iniciada y corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

startServer();