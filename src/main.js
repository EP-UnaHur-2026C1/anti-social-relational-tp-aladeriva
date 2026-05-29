const express = require("express");
const app = express();
const db = require("./db/models");
const path = require("path");
const { fileURLToPath } = require('url');
const followRoutes = require('./routes/followRoutes.js');

const commentRouter = require("./db/routers/commentRoutes.js");
const postRouter = require("./db/routers/postRoutes");
const relationRouter = require("./db/routers/relationRoutes");
const tagRouter = require("./db/routers/tagRoutes");
const userRouter = require("./db/routers/userRoutes");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const PORT = 5000;

app.use(express.json());

app.use("/comment", commentRouter);
app.use("/post", postRouter);
app.use("/relation", relationRouter);
app.use("/tag", tagRouter);
app.use("/user", userRouter);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api', followRoutes);

const swaggerDocument = YAML.load(
  path.join(__dirname, 'swagger.yaml')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function startServer() {
  try {

    await db.sequelize.authenticate();

    console.log("✅ Base conectada");

    await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`✅ App iniciada y corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

startServer();