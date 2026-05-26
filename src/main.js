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

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function connectToDataBase() {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}


async function startServer() {
  await connectToDataBase(); 
  app.listen(PORT, () => { 
    console.log(`✅ App iniciada y corriendo en el puerto ${PORT}`);
  });
}

startServer();
