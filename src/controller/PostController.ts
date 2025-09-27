import {Request, Response } from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { ApiResponse } from '../data/types';
import { Post } from '../data/types';

export class PostController {
    private postBusiness = new PostBusiness();

    public criarPost = (req: Request, res: Response) => {
        try {
            const {}
        }
    }
}