
export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    published: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    age: number;
}

export const users: User[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@email.com",
        role: "admin",
        age: 25
    },

    {
        id: 2,
        name: "Daniel",
        email: "daniel@email.com",
        role: "user",
        age: 25
    },

    {
        id: 3,
        name: "Yasmim",
        email: "yasmim@email.com",
        role: "user",
        age: 23
    },

    {
        id: 4,
        name: "Leo",
        email: "leo@emai.com",
        role: "user",
        age: 24,
    }
];



export const posts: Post[] = [
    {
        id: 1,
        title: "Primeiro Post da Alice",
        content: "Este é o conteúdo do primeiro post criado pela administradora.",
        authorId: 1,
        createdAt: new Date("2025-09-18T21:00:00Z"),
        published: true
    },

    {
        id: 2,
        title: "Dicas de TypeScript",
        content: "Conteúdo sobre como usar TypeScript de forma eficiente...",
        authorId: 2,
        createdAt: new Date("2025-09-18T21:30:00Z"),
        published: false
    },

    {
        id: 3,
        title: "Introdução ao Express.js",
        content: "Um guia para iniciantes no framework Express para Node.js.",
        authorId: 1,
        createdAt: new Date("2025-09-18T22:00:00Z"),
        published: true
    }
]