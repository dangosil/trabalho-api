import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/search", userController.buscarUsuarioPeloNome);
userRouter.get("/age-range", userController.buscarUsuarioPorIdade);
userRouter.get("/", userController.getAllUsers);
userRouter.delete("/cleanup-inactive", userController.deletarUsuariosInativos);
userRouter.get("/:id", userController.buscarUsuarioPorId);


userRouter.post("/", userController.criarUsuario);
userRouter.put("/:id", userController.atualizarUsuario);
