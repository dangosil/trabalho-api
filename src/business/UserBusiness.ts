import { users} from "../bd";
import { User } from "../data/types";

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
        if(!id || !name || !email || !role || !age) {
            throw new Error('Dados incompletos. Por favor, forneça todos os campos necessários.');
    }
    const novoUsuario: User = {id, name, email, role, age};
    users.push(novoUsuario);
    return novoUsuario;
    }
}