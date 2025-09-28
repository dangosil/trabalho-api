import { users} from "../bd";
import { User } from "../data/types";
import { posts } from "../bd";

export class UserBusiness {
    public getAllUsers() {
        return users;
    }
    
    public buscarUsuarioPeloNome(name: string) {
        let usuariosRetornados = users;
        if(name) {
            usuariosRetornados = users.filter((u) => u.name.toLowerCase().includes(name.toString().toLowerCase()));
        }
        return usuariosRetornados;
    }

    public buscarUsuarioPorIdade(min: Number, max: Number) {
        const minAge = Number(min);
        const maxAge = Number(max);
        return users.filter((u) => u.age >= minAge && u.age <= maxAge);
    }

    public buscarUsuarioPorId(id: number) {
        const userId = Number(id);
        const user = users.find(u => u.id === userId);
        if(!user) {
            throw new Error('Usuário não encontrado.');
        }
        return user;   
    }

    public criarUsuario(input: any) {
        const {id, name, email, role, age} = input;
        const idExiste = users.find((u) => u.id === id);
        const emailExiste = users.find((u) => u.email === email);

        if(idExiste) {
            throw new Error('ID já cadastrado. Insira um ID válido.');
        }

        if(emailExiste) {
            throw new Error('Email já cadastrado. Insira um email válido.');
        }

        if(!id || !name || !email || !role || !age) {
            throw new Error('Dados incompletos. Por favor, forneça todos os campos necessários.');
    }
    const novoUsuario: User = {id, name, email, role, age};
    users.push(novoUsuario);
    return novoUsuario;
    }

    public atualizarUsuario = (id: number, input: any) => {
        const { name, email, role, age } = input;

        if (name === undefined || email === undefined || role === undefined || age === undefined) {
            throw new Error("Dados incompletos. Por favor, forneça todos os campos necessários.");
        }
        const usuarioQueSeraAtualizado = users.find((u) => u.id === id);

        if(!usuarioQueSeraAtualizado) {
            throw new Error("Usuário não encontrado.");
        }

        const emailExiste = users.find((u) => u.email === email && u.id !== id);

        if(emailExiste) {
            throw new Error("Email já cadastrado. Insira um email válido.");
        }

        usuarioQueSeraAtualizado.name = name;
        usuarioQueSeraAtualizado.email = email;
        usuarioQueSeraAtualizado.role = role;
        usuarioQueSeraAtualizado.age = age;

        return usuarioQueSeraAtualizado;
    }
    public deletarUsuariosInativos() {
        const idsAutores = new Set(posts.map((p) => p.authorId));
    
        const usuarioInativo = users.filter((u) => !idsAutores.has(u.id) && u.role !== 'admin');

        if(usuarioInativo.length === 0) {
            return [];
        }
        
        const usuariosParaManter = users.filter((u) => idsAutores.has(u.id) || u.role === 'admin');

        users.length = 0;
        users.push(...usuariosParaManter);

        return usuarioInativo;
    }
}