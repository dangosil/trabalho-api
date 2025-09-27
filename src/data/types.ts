export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    age: number;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    published: boolean;
}