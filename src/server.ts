// import express, {Request, Response } from 'express';
// import cors from 'cors';

// export const app = express();
// app.use(express.json());
// app.use(cors());

// // 1
// app.get("/users", (req: Request, res: Response) => {
//     res.status(200).json(users);
//     console.log(users);
// })

// app.get("/users/search", (req: Request, res: Response) => {
//     const {name} = req.query;
//     console.log("Query:", req.query);

//     let usuariosRetornados = users;
//     if(name) {
//         usuariosRetornados = users.filter((u) => u.name.toLowerCase().includes(name.toString().toLowerCase())
//         );
//     }

//     console.log(usuariosRetornados);
//     res.status(200).json(usuariosRetornados);
// })

// app.get("/users/age-range", (req: Request, res: Response) => {
//     const minAge = Number(req.query.min);
//     const maxAge = Number(req.query.max);
//     console.log("Query:", req.query);
//     if(isNaN(minAge) || isNaN(maxAge)) {
//         return res.status(400).json({message: "Parâmetros inválidos. min e max devem ser números."});
//     } 
//     const idadeFiltrada = users.filter((u) => u.age >= minAge && u.age <= maxAge);
//     console.log(idadeFiltrada);
//     res.status(200).json(idadeFiltrada);

// })

// app.get("/users/:id", (req: Request, res: Response) => {
//     const userId = Number(req.params.id);
//     const user = users.find(u => u.id === userId);

//     if(user) {
//         res.status(200).json(user);
//         console.log(user);
//     } else {
//         res.status(404).json({message: 'Usuário não encontrado.'});
//     }
// })

// 2

// app.post("/users", (req: Request, res: Response) => {
//     const {id, name, email, role, age} = req.body;
//     let novoUsuario: User = {id, name, email, role, age};
//     if(!id || !name || !email || !role || !age) {
//         return res.status(400).json({message: "Dados incompletos. Por favor, forneça todos os campos necessários."});
//     }
//     users.push(novoUsuario);
//     res.status(201).json({message: "Usuário criado com sucesso!", user: novoUsuario});
//     console.log(users);

// })

// app.post("/posts", (req: Request, res: Response) => {
//     const {id, title, content, authorId, createdAt, published} = req.body;
//     let novoPost: Post = {id, title, content, authorId, createdAt: new Date(), published: false};

//     const minimoCaracteresTitulo = 3;
//     const minimoCaracteresConteudo = 10;
//     const autorExiste = users.find((u) => u.id === authorId);
//     if(title.length < minimoCaracteresTitulo) {
//         return res.status(400).json({message: 'O título deve ter no mínimo 3 caracteres.'});
//         } else if(content.length < minimoCaracteresConteudo) {
//             return res.status(400).json({message: 'O conteúdo deve ter no mínimo 10 caracteres.'});
//         } else if (!autorExiste) {
//             return res.status(404).json({message: 'O ID do autor forneciso não existe.'});
//         }
//     posts.push(novoPost);
//     res.status(201).json({message: "Post criado com sucesso!", post: novoPost});
//     console.log(novoPost);  
// })
    
    // if (!id || !title || !content || !authorId || !createdAt || published) {
    //     return res.status(400).json({message: "Dados incompletos. Por favor, forneça todos os campos necessários."});
    // } else {
    //     posts.push(novoPost);
    //     res.status(201).json({message: "Post criado com sucesso!", post: novoPost});
    //     console.log(posts);
    // }

    // const autorExiste = users.find((u) => u.id === authorId);



