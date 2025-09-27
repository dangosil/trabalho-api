import { posts } from "../bd";
import { Post } from "../data/types";
import { users } from "../bd";

export class PostBusiness {
    public getAllPosts() {
        return posts;
    }

    public criarPost(input: any) {
        const{id, title, content, authorId} = input;
        const minimoCaracteresTitulo = 3;
        const minimoCaracteresContrudo = 10;
        const autorExiste = users.find((u) => u.id ===authorId);
        
        if(title.length < minimoCaracteresTitulo) {
            throw new Error('O título deve ter no mínimo 3 caracteres.');
        } else if (content.length < minimoCaracteresContrudo) {
            throw new Error('O conteúdo deve ter no mínimo 10 caracteres.');
        } else if(!autorExiste) {
            throw new Error('O ID do autor forneciso não existe.');
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