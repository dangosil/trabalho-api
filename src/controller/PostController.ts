import {Request, Response } from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { ApiResponse } from '../data/types';
import { Post } from '../data/types';

export class PostController {
    private postBusiness = new PostBusiness();

    public getAllPosts = (req: Request, res: Response) => {
        try {
            const allPosts = this.postBusiness.getAllPosts();
            
            const response: ApiResponse<Post[]> = {
                success: true,
                message: "Posts obtidos com sucesso.",
                data: allPosts
            };
            res.status(200).json(response);
        
        } catch (error: any) {
            const response: ApiResponse<null> = {
                success: false,
                message: error.message || "Erro interno do servidor.",
                data: null
            };
        res.status(500).json(response);
        }
    }

    public criarPost = (req: Request, res: Response) => {
        try {
            const input = req.body;
            const novoPost = this.postBusiness.criarPost(input);

            const response: ApiResponse<Post> = {
                success: true,
                message: "Post criado com sucesso.",
                data: novoPost
            };
            res.status(201).json(response);

        } catch (error: any) {

            console.error(error.message);

            let statusCode = 500;

            if(error.message.incluedes("autor")) {
                statusCode = 404;
            } else if(error.message.includes("obrigatório") || error.message.includes("caracteres")) {
                statusCode = 400;
            }

            const response: ApiResponse<null> = {
                success: false,
                message: error.message || "Erro interno do servidor.",
                data: null
            };
            res.status(statusCode).json(response);
        }
    }
}