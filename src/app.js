import express from "express";
import * as middlewares from "./middlewares/middlewares";
import * as controllers from "./controllers/controllers";

const app = express();
app.use(express.json());

// Auth requisitions;

app.post("/users", controllers.createUserController);

app.post("/login", controllers.loginUserController);

// Admin requisitions;

app.get(
  "/users",
  middlewares.verifyAuth,
  middlewares.verifyIsAdmin,
  controllers.retrieveUsersController
);

app.delete(
  "/users/:id",
  middlewares.verifyAuth,
  middlewares.verifyIsAdmin,
  controllers.deleteUserController
);

// User logged requisitions;

app.patch(
  "/users/:id",
  middlewares.verifyAuth,
  middlewares.verifyUserExists,
  middlewares.verifyUserIsHimself,
  controllers.updateUserController
);

app.get(
  "/users/profile",
  middlewares.verifyAuth,
  middlewares.verifyUserExists,
  middlewares.verifyUserIsHimself,
  controllers.retrieveUserController
);

app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});

export default app;
