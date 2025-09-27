import {Request, Response } from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { ApiResponse } from '../data/types';
import { Post } from '../data/types';

export class PostController {
    private postBusiness = new PostBusiness();

    public getAllPosts = (req: Request, res: Response) => {
        console.log("Rota: GET /posts - Buscando todos os posts...");

        try {
            const allPosts = this.postBusiness.getAllPosts();
            console.log("Posts encontrados:", allPosts);
            
            const response: ApiResponse<Post[]> = {
                success: true,
                message: "Posts obtidos com sucesso.",
                data: allPosts
            };
            console.log("Resposta enviada:", response);
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
        console.log("Rota: POST /posts - Criando novo post...");
        console.log("Dados recebidos:", req.body);

        try {
            const input = req.body;
            const novoPost = this.postBusiness.criarPost(input);
            console.log("Post criado:", novoPost);

            const response: ApiResponse<Post> = {
                success: true,
                message: "Post criado com sucesso.",
                data: novoPost
            };
            console.log("Resposta enviada:", response);
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