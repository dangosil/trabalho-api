import express, {Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';


export class UserController {
    userBusiness = new UserBusiness();

    public getAllUsers = (req: Request, res: Response) => {
        try {
            const result = this.userBusiness.getAllUsers();
            res.status(200).json(result);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public buscarUsuarioPeloNome = (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const result = this.userBusiness.buscarUsuarioPeloNome(name);
            res.status(200).json(result);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public buscarUsuarioPorIdade = (req: Request, res: Response) => {
        try {
            const { min, max} = req.body;
            const result = this.userBusiness.buscarUsuarioPorIdade(min, max);
            res.status(200).json(result);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public buscarUsuarioPorId = (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.id);
        }
    }

}

