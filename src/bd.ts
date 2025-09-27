import { Post, User } from "./data/types";

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



export let posts: Post[] = [];

    // exemplos de post
    // {
    //     id: 1,
    //     title: "Primeiro Post da Alice",
    //     content: "Este é o conteúdo do primeiro post criado pela administradora.",
    //     authorId: 1,
    //     createdAt: new Date,
    //     published: true
    // },