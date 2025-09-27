import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/search", userController.buscarUsuarioPeloNome);
userRouter.get("/age-range", userController.buscarUsuarioPorIdade);
userRouter.get("/:id", userController.buscarUsuarioPorId);