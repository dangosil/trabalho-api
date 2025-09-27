import {Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { ApiResponse } from '../data/types';
import { User } from '../data/types';
export class UserController {
    private userBusiness = new UserBusiness();

    public getAllUsers = (req: Request, res: Response) => {
        try {
            const users = this.userBusiness.getAllUsers();

            const response: ApiResponse<User[]> = {
                success: true,
                message: "Usuários obtidos com sucesso.",
                data: users
            };
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
        try {
            const { name } = req.query;
            const result = this.userBusiness.buscarUsuarioPeloNome(name as string);
            
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

            const response: ApiResponse<User[]> = {
                success: true,
                message: "Busca por idade realizada com sucesso.",
                data: result
            };
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
        console.log(req.params.id);
        try {
            const userId = Number(req.params.id);
            const user = this.userBusiness.buscarUsuarioPorId(userId);

            if(user) {
                console.log(user);
                const response: ApiResponse<User> = {
                    success: true,
                    message: "Usuário encontrado com sucesso.",
                    data: user
                };
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
        console.log(req.body);
        try {
            const input = req.body;
            const novoUsuario = this.userBusiness.criarUsuario(input);

            console.log(novoUsuario);

            const response: ApiResponse<User> = {
                success: true,
                message: "Usuário criado com sucesso.",
                data: novoUsuario
            };
            res.status(201).json(response);
        } catch (error: any) {
            const response: ApiResponse<null> = {
                success: false,
                message: error.message,
                data: null
            };
            res.status(400).json(response);
        }
    }
}