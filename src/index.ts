import { graphql } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { Resolvers } from "./__generated__/typeDefs";

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
];

const authorDb = [{ id: "1", name: "morri" }];

const resolvers: Resolvers = {
  Query: {
    async getBook(parent, args, ctx) {
      //const book=await db.books.findOne({id: args.id})
      //return book

      return booksDb.find((book) => book.id === args.id)!;
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
      const author = authorDb.find((author) => author.id === parent.authorId)!;
      return author;
    },
  },

  Author: {},
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(4000, () => {
  console.info("server is running");
});

(async () => {
  const res = await graphql({
    schema,
    source: `
            query{
                getBook(id: "1"){
                    id
                    title
                    author{
                        name
                    }
                }
            }
        `,
  });

  console.log(JSON.stringify(res, null, 2));
})();
