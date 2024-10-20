import { graphql } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { Resolvers } from "./__generated__/typeDefs";
import DataLoader from "dataloader";
import { Author } from "./Author";

const typeDefs = fs.readFileSync(
  path.resolve("./src/typeDefs.graphql"),
  "utf8"
);

const booksDb = [
  {
    id: "1",
    title: "Hello",
    authorId: "1",
  },
  {
    id: "2",
    title: "Hello",
    authorId: "2",
  },
  {
    id: "3",
    title: "Hello",
    authorId: "3",
  },
];

const authorDb = [
  { id: "1", name: "morri" },
  { id: "2", name: "sonny" },
  { id: "3", name: "tonny" },
];

const resolvers: Resolvers = {
  Query: {
    async getBook(parent, args, ctx) {
      //const book=await db.books.findOne({id: args.id})
      //return book

      return booksDb.find((book) => book.id === args.id)!;
    },
    async allBooks(parent, args, ctx) {
      return booksDb;
    },
  },
  Book: {
    id(parent, args, ctx) {
      //return book
      return parent.id;
    },
    title(parent, args, ctx) {
      return parent.title;
    },
    author(parent, args, ctx) {
      console.log(ctx);
      console.log(parent);
      return ctx.authorLoader.load(parent.authorId);
    },
  },

  Author: {},
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context() {
    return {
      authorLoader: new DataLoader<string, Author>(async (ids) => {
        const author = ids.map((id) => {
          return authorDb.find((author) => author.id === id)!;
        });
        // console.log(author);
        return author;
      }),
    };
  },
});
const server = createServer(yoga);

server.listen(4000, () => {
  console.info("server is running");
});

// (async () => {
//   const res = await graphql({
//     schema,
//     source: `
//             query{
//                 getBook(id: "1"){
//                     id
//                     title
//                     author{
//                         name
//                     }
//                 }
//             }
//         `,
//   });

//   console.log(JSON.stringify(res, null, 2));
// })();
