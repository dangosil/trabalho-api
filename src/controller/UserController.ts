import {Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { ApiResponse } from '../data/types';
import { User } from '../data/types';
export class UserController {
    private userBusiness = new UserBusiness();

    public getAllUsers = (req: Request, res: Response) => {
        console.log("Rota: GET /users - Buscando todos os usuários...");

        try {
            const users = this.userBusiness.getAllUsers();
            console.log("Usuários encontrados:", users);

            const response: ApiResponse<User[]> = {
                success: true,
                message: "Usuários obtidos com sucesso.",
                data: users
            };
            console.log("Resposta enviada:", response);
            res.status(200).json(response);
        
        } catch (error: any) {
            const response : ApiResponse<null> = {
                success: false,
                message: error.message || "Erro interno do servidor.",
                data: null
            };
            res.status(500).json(response);
        }
    }

    public buscarUsuarioPeloNome = (req: Request, res: Response) => {
        console.log("Rota: GET /users/search - Buscando usuário pelo nome...");

        try {
            const { name } = req.query;
            console.log("Nome recebido:", name);
            const result = this.userBusiness.buscarUsuarioPeloNome(name as string);
            console.log("Resultado da busca:", result);

            const response: ApiResponse<User[]> = {
                success: true,
                message: "Busca por nome realizada com sucesso.",
                data: result
            };
            res.status(200).json(result);
        } catch (error: any) {
            const response: ApiResponse<null> = {
                success: false,
                message: error.message || "Erro interno do servidor.",
                data: null
            };
            res.status(500).json(response);
        }
    }

    public buscarUsuarioPorIdade = (req: Request, res: Response) => {
        console.log("Rota: GET /users/age - Buscando usuários por faixa etária...");
        console.log("Query recebida:", req.query);
        console.log(req.query);

        try {
            const { min, max } = req.query;

            const minAge = Number(min);
            const maxAge = Number(max);

            if(isNaN(minAge) || isNaN(maxAge)) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: "Parâmetros 'min' e 'max' devem ser números.",
                    data: null
                }
                return res.status(400).json(response);
            }

            const result = this.userBusiness.buscarUsuarioPorIdade(minAge, maxAge);
            console.log("Resultado da busca:", result);

            const response: ApiResponse<User[]> = {
                success: true,
                message: "Busca por idade realizada com sucesso.",
                data: result
            };
            console.log("Resposta enviada:", response);
            res.status(200).json(result);
        } catch (error: any) {
            if (error.message.includes("inválidos")) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: error.message,
                    data: null
                };
                res.status(400).json(response);
            } else {
                const response: ApiResponse<null> = {
                    success: false,
                    message: error.message || "Erro interno do servidor.",
                    data: null
                };
                res.status(500).json(response);
            }
        }
    }

    public buscarUsuarioPorId = (req: Request, res: Response) => {
        console.log("Rota: GET /users/:id - Buscando usuário por ID...");
        console.log(req.params.id);
        try {
            const userId = Number(req.params.id);
            const user = this.userBusiness.buscarUsuarioPorId(userId);

            if(user) {
                console.log("Usuário encontrado:", user);
                const response: ApiResponse<User> = {
                    success: true,
                    message: "Usuário encontrado com sucesso.",
                    data: user
                };
                console.log("Resposta enviada:", response);
                res.status(200).json(response);
            } else {
                const response: ApiResponse<null> = {
                    success: false,
                    message: "Usuário não encontrado.",
                    data: null
                };
                res.status(404).json(response);
            }
        } catch (error: any) {
            const response: ApiResponse<null> = {
                success: false,
                message: error.message || "Erro interno do servidor.",
                data: null
            };
            res.status(500).json(response);
        }
    }

    public criarUsuario = (req: Request, res: Response) => {
        console.log("Rota: POST /users - Criando novo usuário...");
        console.log(req.body);

        try {
            const input = req.body;
            const novoUsuario = this.userBusiness.criarUsuario(input);

            console.log("Usuário criado:", novoUsuario);

            const response: ApiResponse<User> = {
                success: true,
                message: "Usuário criado com sucesso.",
                data: novoUsuario
            };
            console.log("Resposta enviada:", response);
            res.status(201).json(response);

        } catch (error: any) {

            let statusCode = 500;

            if(error.message.includes("cadastrado")) {
                statusCode = 409;
            } else if(error.message.includes("incompletos")) {
                statusCode = 400;
            }

            const response: ApiResponse<null> = {
                success: false,
                message: error.message,
                data: null
            };
            res.status(statusCode).json(response);
        }
    }

    public atualizarUsuario = (req: Request, res: Response) => {
        console.log("Atualizando usuário...");
        console.log("ID recebido:", req.params.id);
        console.log("Dados recebidos:", req.body);

        try {
            const idAtualizado = Number(req.params.id);
            const input = req.body;

            const usuarioQueSeraAtualizado = this.userBusiness.atualizarUsuario(idAtualizado, input);
            console.log("Usuário atualizado:", usuarioQueSeraAtualizado);

            const response: ApiResponse<User> = {
                success: true,
                message: "Usuário atualizado com sucesso.",
                data: usuarioQueSeraAtualizado
            };
            console.log("Resposta enviada:", response);
            res.status(200).json(response);
        } catch (error: any) {
            let statusCode = 500;
            if(error.message.includes("não encontrado")) {
                statusCode = 404;
            } else if(error.message.includes("cadastrado")) {
                statusCode = 409;
            } else if(error.message.includes("incompletos")) {
                statusCode = 400;
            }

            const response: ApiResponse<null> = {
                success: false,
                message: error.message,
                data: null
            }
            res.status(statusCode).json(response);
        }
    }
}