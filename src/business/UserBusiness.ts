import { UserData } from "../data/UserData";
import { PostData } from "../data/PostData";
import { User } from "../data/types";

export class UserBusiness {
    private userData = new UserData();
    private postData = new PostData();
    
    public criarUsuario(input: any) {
        const {id, name, email, role, age} = input;

        if(!id || !name || !email || !role || !age) {
            throw new Error('Dados incompletos. Por favor, forneça todos os campos necessários.');
        }
        if(this.userData.buscarUsuarioPorId(id)) {
            throw new Error('ID já cadastrado. Insira um ID válido.');
        }
        if(this.userData.buscarUsuarioPorEmail(email)) {
            throw new Error('Email já cadastrado. Insira um email válido.');
        }
        const novoUsuario: User = {id, name, email, role, age};
        this.userData.criarUsuario(novoUsuario);
        return novoUsuario;
    }
    
    public verify = (email: string) => {
        try {

            if (!email) {
                throw new Error("Campos faltantes")
            }

            const user = this.userData.buscarUsuarioPorEmail(email) as any;
            if (!user) {
                throw new Error("Usuario inexistente");
            }

            return user;

        } catch (error: any) {
            throw new Error(error)
        }
    }

    public getAllUsers() {
        return this.userData.getAllUsers();
    }
    
    public buscarUsuarioPeloNome(name: string) {
        let usuariosRetornados = this.userData.getAllUsers();
        if(name) {
            return usuariosRetornados.filter((u) => u.name.toLowerCase().includes(name.toString().toLowerCase()));
        }
        return usuariosRetornados;
    }

    public buscarUsuarioPorIdade(min: Number, max: Number) {
        const todosUsuarios = this.userData.getAllUsers();
        const minAge = Number(min);
        const maxAge = Number(max);
        return todosUsuarios.filter((u) => u.age >= minAge && u.age <= maxAge);
    }

    public buscarUsuarioPorId(id: number) {
        const user = this.userData.buscarUsuarioPorId(id);
        if(!user) {
            throw new Error('Usuário não encontrado.');
        }
        return user;   
    }


    public atualizarUsuario = (id: number, input: any) => {
        const { name, email, role, age } = input;

        if (name === undefined || email === undefined || role === undefined || age === undefined) {
            throw new Error("Dados incompletos. Por favor, forneça todos os campos necessários.");
        }
        const usuarioQueSeraAtualizado = this.userData.buscarUsuarioPorId(id);

        if(!usuarioQueSeraAtualizado) {
            throw new Error("Usuário não encontrado.");
        }

        const emailExiste = this.userData.buscarUsuarioPorEmail(email);

        if(emailExiste) {
            throw new Error("Email já cadastrado. Insira um email válido.");
        }

        usuarioQueSeraAtualizado.name = name;
        usuarioQueSeraAtualizado.email = email;
        usuarioQueSeraAtualizado.role = role;
        usuarioQueSeraAtualizado.age = age;

        this.userData.atualizarUsuario(id, usuarioQueSeraAtualizado);

        return usuarioQueSeraAtualizado;
    }
    public deletarUsuariosInativos() {
        const todosPosts = this.postData.getAllPosts();
        const todosUsuarios = this.userData.getAllUsers();
        const idsAutores = new Set(todosPosts.map((p) => p.authorId));
    
        const usuarioInativo = todosUsuarios.filter((u) => !idsAutores.has(u.id) && u.role !== 'admin');

        if(usuarioInativo.length === 0) {
            return [];
        }
        
        const usuariosParaManter = todosUsuarios.filter((u) => idsAutores.has(u.id) || u.role === 'admin');

        this.userData.substituirArrayDeUsuarios(usuariosParaManter);

        return usuarioInativo;
    }
}