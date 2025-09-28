import { users } from "../bd";
import { User } from "./types";

export class UserData {
    public buscarUsuarioPorId(id: number): User | undefined {
        return users.find(u => u.id === id);
    }

    public criarUsuario(newUser: User): void {
        users.push(newUser);
    }

    public buscarUsuarioPorEmail(email: string): User | undefined {
        const userFound = users.find(u => u.email === email);
    
        return userFound;
    }

    public getAllUsers(): User[] {
        return users;
    }

    public verify(email: string): User | undefined {
        return users.find(u => u.email === email);
    }
    

    public atualizarUsuario(id: number, dadosAtualizados: User): void {
        const index = users.findIndex(u => u.id === id);
        if (index > -1) {
            users[index] = dadosAtualizados;
        }
    }

    public substituirArrayDeUsuarios(newUsers: User[]): void {
        users.length = 0;
        users.push(...newUsers);
    }
}