# Feedback del Trabajo Práctico

## Integrantes

Integrantes identificados a partir de los commits del repositorio:

- **Juan Pablo Céspedes** (`juanPabloCespedes`)
- **Osvaldo Galán** (`Osvaldo Galán` / `OsvaldoGalan7`)
- **Nair Paz** (`Nair14`)

> Se observa trabajo repartido entre los tres integrantes. 👏

---

## Resumen General

¡Muy buen trabajo! 🎉 La entrega cubre **todo el MVP** pedido en `ENUNCIADO.md`: las cinco entidades con sus relaciones, el CRUD completo de cada una, las rutas para administrar relaciones, y la regla de negocio de los comentarios. Además resolvieron **dos de los bonus** (upload de imágenes a una carpeta del servidor y el sistema de seguidores) e incorporaron **migraciones** con `sequelize-cli`, que estaban por encima de lo requerido.

La arquitectura está bien separada en capas (routers / controllers / middlewares / models / schema) y se nota el uso de **middlewares genéricos reutilizables**, algo que la cátedra valora especialmente. El punto más fuerte: la regla de los comentarios antiguos está implementada de forma correcta y configurable.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras + middlewares genéricos reutilizables. |
| Modelado        |   ✅   | 1:N, N:M y followers (self M:N) bien resueltos; `nickName` como PK. |
| Validaciones    |   ✅   | Joi aplicado en creación/edición de las entidades. |
| Middlewares     |   ✅   | `validaExiste(Modelo)` y `schemaValidator(schema)` genéricos. |
| API REST        |   ✅   | CRUD completo + endpoints de relaciones + códigos HTTP. |
| Configuración   |   ⚠️   | El `.env` no termina de estar conectado (ver Observación 1). |
| Documentación   |   ✅   | Swagger (`/api-docs`), colecciones de ejemplo, README y DER. |

---

## Fortalezas

### 1. Regla de comentarios antiguos bien implementada ⏳
**Ubicación:** `src/db/controllers/commentController.js` (`getCommentsByPost`)

La visualización de comentarios de un post filtra por fecha calculando el umbral a partir de la variable de entorno:

```js
const MONTHS_LIMIT = parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
limitDate.setMonth(limitDate.getMonth() - MONTHS_LIMIT);
// where: { postId, fecha: { [Op.gte]: limitDate }, visible: true }
```

Es exactamente lo que pedía el enunciado: el umbral es **configurable** (`COMMENT_VISIBILITY_MONTHS`) y, además, sumaron un flag `visible` con un endpoint `hideComment` para poder ocultar manualmente. Resolvieron la regla por dos vías complementarias. 👌

### 2. Middlewares genéricos y reutilizables ♻️
**Ubicación:** `src/db/middlewares/existe.middleware.js`, `src/db/middlewares/schemaValidator.js`

`validaExisteMiddleware(Modelo)` valida la existencia de un registro para **cualquier** modelo, y `schemaValidator(schema)` aplica un schema de Joi de forma genérica. Componerlos en las rutas (ver `tagRoutes.js`) deja el código declarativo y evita repetir lógica. Es la forma de trabajar que se busca en la materia.

### 3. Modelado completo, con `nickName` como clave principal 🗃️
**Ubicación:** `src/db/models/`

- Definieron `nickName` como **clave primaria** de `User` (`primaryKey: true`). Es una interpretación muy acertada de “el `nickName` funcionará como identificador principal”, y al ser PK queda único por definición.
- Están todas las relaciones: 1:N (User→Post, User→Comment, Post→PostImage, Post→Comment), N:M (Post↔Tag) y el bonus de **seguidores** como relación reflexiva muchos-a-muchos (`User.belongsToMany(User, { through: UserFollower })`), con índice único en el par para evitar duplicados.

### 4. CRUD completo y endpoints de relaciones 🔗
**Ubicación:** `src/db/routers/`, `src/db/controllers/`

Cada entidad tiene su CRUD (incluido Tag: `getAllTags`, `getTagById`, `createTag`, `updateTag`, `deleteTag`, `getPostsByTag`) y hay rutas dedicadas para administrar relaciones (asociar/quitar imágenes y etiquetas a un post, obtener las etiquetas de un post). Los códigos HTTP son adecuados (201 al crear, 204 al borrar, 404 cuando no existe).

### 5. Documentación y material de prueba 📚
**Ubicación:** `swagger.yaml`, `Ejemplos/`, `README.md`, `DER TP-01.png`

Incluyeron Swagger servido en `/api-docs`, archivos JSON de ejemplo por entidad en `Ejemplos/`, un README y el diagrama entidad-relación. Buena cobertura del requisito de documentación y colecciones de prueba.

---

## Observaciones

### 1. El archivo `.env` no termina de estar conectado (puerto y base de datos)

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/main.js`, `src/db/config/config.json`, `.env`

**Descripción:**
Crearon un `.env` con `PORT=3000`, `DB_DIALECT`, `DB_STORAGE` y `COMMENT_VISIBILITY_MONTHS`, pero solo esta última variable se usa. En `main.js` el puerto está fijo en el código:

```js
const PORT = 5000;            // ignora process.env.PORT
```

Y la configuración de la base de datos vive en `config/config.json` (estática), por lo que `DB_DIALECT` / `DB_STORAGE` del `.env` no se leen. El enunciado pide específicamente poder **configurar el puerto y las variables de entorno fácilmente**, así que conviene cerrar ese circuito.

**Impacto:**
Hoy cambiar el puerto en el `.env` no tiene efecto (la app siempre levanta en 5000), y la portabilidad de base de datos depende de editar el JSON a mano. Es un detalle, pero toca dos requisitos técnicos explícitos.

**Recomendación:**
Leer el puerto desde el entorno y, si quieren, alimentar la config de Sequelize con las variables del `.env`:

```js
const PORT = process.env.PORT || 3000;
```

Para la base de datos, una opción simple es que `config.json` (o un `config.js`) tome los valores de `process.env` (dialect, storage), así el `.env` queda como única fuente de configuración.

---

### 2. Rutas y controladores duplicados para imágenes de un post

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/db/routers/postRoutes.js`, `src/db/controllers/postController.js`, `src/db/controllers/relationController.js`

**Descripción:**
La acción de asociar imágenes a un post está implementada en **dos lugares**: `addImageToPost` aparece en `postController.js` (ruta `PUT /post/:id/images`) y también en `relationController.js` (ruta `POST /relation/posts/:postId/images`). Además, en `postRoutes.js` hay **dos definiciones de `PUT /:id`** (líneas 35 y 54); como Express ejecuta la primera que coincide, la segunda nunca llega a usarse.

**Impacto:**
No rompe el funcionamiento, pero genera código muerto y dos formas distintas de hacer lo mismo, lo que dificulta el mantenimiento y puede confundir a quien consuma la API (¿cuál es la ruta “oficial”?).

**Recomendación:**
Elegir una única ubicación para cada acción de relación (por ejemplo, dejar todo lo de relaciones en `relationController`/`relationRoutes`) y eliminar la ruta `PUT /:id` repetida.

---

### 3. El modelo `Follow` parece sin uso y es inconsistente con `User`

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/db/models/follow.js` (vs `src/db/models/userFollower.js`)

**Descripción:**
Conviven dos modelos para seguidores: `UserFollower` (el que realmente usa `User.belongsToMany`, con claves `followerNickName` / `followedNickName`) y `Follow`, que define `followerId` / `followingId` como **enteros**. Como la PK de `User` es `nickName` (string), las FKs enteras de `Follow` no son consistentes con el modelo, y no se ve que `Follow` se utilice en ningún controller.

**Impacto:**
Tener un modelo duplicado y sin uso (con su migración asociada) puede inducir a error sobre cuál es la relación vigente.

**Recomendación:**
Si la relación de seguidores la resuelve `UserFollower`, eliminar el modelo `Follow` (y su migración) para dejar una única fuente de verdad.

---

## Conclusión

Es una entrega muy completa y prolija, que cumple con todo el MVP y suma dos bonus y migraciones. Se nota comprensión de Sequelize (relaciones, self-referencing many-to-many, `findOrCreate`) y del patrón de middlewares genéricos. 🌟

Las observaciones son pocas y acotadas: la principal es terminar de conectar el `.env` (puerto y base de datos), y las otras dos son limpiezas de código que no afectan el funcionamiento. Son ajustes sencillos sobre una base que ya está muy bien resuelta.

¡Felicitaciones por el trabajo en equipo! Sigan así. 🚀
