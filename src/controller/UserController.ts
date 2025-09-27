import {Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { ApiResponse } from '../data/types';
import { User } from '../data/types';
import { users } from '../bd';


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
            const { name } = req.body;
            const result = this.userBusiness.buscarUsuarioPeloNome(name);
            
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
        try {
            const { min, max} = req.body;
            const result = this.userBusiness.buscarUsuarioPorIdade(min, max);

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
        try {
            const userId = Number(req.params.id);
            const user = this.userBusiness.buscarUsuarioPorId(userId);

            if(user) {
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
}