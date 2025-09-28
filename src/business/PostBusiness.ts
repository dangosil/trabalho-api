import { PostData } from '../data/PostData';
import { UserData } from '../data/userData';
import { posts } from "../bd";
import { Post } from "../data/types";

export class PostBusiness {
    private postData = new PostData();
    private userData = new UserData();

    public getAllPosts() {
        return this.postData.getAllPosts();
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
        const autorExiste = this.userData.buscarUsuarioPorId(authorId);
        
        if(title.length < minimoCaracteresTitulo) {
            errors.push('O título deve ter no mínimo 3 caracteres.');
        } 

        if (content.length < minimoCaracteresContrudo) {
            errors.push('O conteúdo deve ter no mínimo 10 caracteres.');
        } 
        
        if(authorId && !autorExiste) {
            errors.push('O ID do autor fornecido não existe.');
        }

        if(errors.length > 0) {
            throw new Error(errors.join(", "));
        }

        const allPosts = this.postData.getAllPosts();
        const novoPost: Post = {
            id: allPosts.length > 0 && allPosts[posts.length - 1] ? allPosts[allPosts.length - 1]!.id + 1 : 1, 
            title, 
            content, 
            authorId, 
            createdAt: new Date(), 
            published: false
        };
        this.postData.criarPost(novoPost);
        return novoPost;
    }

    public editarPost = (id: number, input: any) => {
        const { title, content, published } = input;

        const postEditado = this.postData.buscarPostPorId(id);

        if(!postEditado) {
            throw new Error("Post não encontrado.");
        }
        if(title !== undefined) {
            if(typeof title !== "string" || title.length < 3) {
                throw new Error("O campo 'title' deve ser uma string com no mínimo 3 caracteres.");
            }
            postEditado.title = title;
        }

        if(content !== undefined) {
            if(typeof content !== "string" || content.length <10) {
                throw new Error("O campo 'content' deve ser uma string com no mínimo 10 caracteres.");
            }
            postEditado.content = content;
        }
        if(published !== undefined) {
            if(typeof published !== "boolean") {
                throw new Error("O campo 'published' deve ser um boolean.");
            }
            postEditado.published = published;
        }
        this.postData.editarPost(id, postEditado);
        return postEditado;
    }

    public deletarPost = (postId: number, userId: number) => {
        const postQueSeraDeletado = this.postData.buscarPostPorId(postId);

        if(!postQueSeraDeletado) {
            throw new Error("Post não encontrado.");
        } 

        const usuarioRequisitante = this.userData.buscarUsuarioPorId(userId);

        if(!usuarioRequisitante) {
            throw new Error("Usuário não autenticado.");
        }

        if(postQueSeraDeletado.authorId !== userId && usuarioRequisitante.role !== "admin") {
            throw new Error("Apenas o autor do post ou um administrador podem deletar este post.");
        }
        this.postData.deletarPost(postId);
    }
}