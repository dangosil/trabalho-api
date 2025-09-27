import { posts } from "../bd";
import { Post } from "../data/types";
import { users } from "../bd";

export class PostBusiness {
    public getAllPosts() {
        return posts;
    }

    public criarPost(input: any) {
        const{ title, content, authorId } = input;
        const errors: string[] = [];

        if(title === undefined) {
            errors.push('O campo "tittle" é obrigatório.');
        }

        if(content === undefined) {
            errors.push('O campo "content" é obrigatório.');
        }

        if(authorId === undefined) {
            errors.push('O campo "authorId" é obrigatório.');
        }
        
        const minimoCaracteresTitulo = 3;
        const minimoCaracteresContrudo = 10;
        const autorExiste = users.find((u) => u.id === authorId);
        
        if(title.length < minimoCaracteresTitulo) {
            errors.push('O título deve ter no mínimo 3 caracteres.');
        } 

        if (content.length < minimoCaracteresContrudo) {
            errors.push('O conteúdo deve ter no mínimo 10 caracteres.');
        } 
        
        if(!autorExiste) {
            errors.push('O ID do autor fornecido não existe.');
        }

        if(errors.length > 0) {
            throw new Error(errors.join(", "));
        }

        const novoPost: Post = {
            id: posts.length > 0 && posts[posts.length - 1] ? posts[posts.length - 1]!.id + 1 : 1, 
            title, 
            content, 
            authorId, 
            createdAt: new Date(), 
            published: false
        };
        posts.push(novoPost);
        return novoPost;
    }
}