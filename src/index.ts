import { graphql } from "graphql";
import { createSchema } from "graphql-yoga";

const typeDefs = `
  type Query {
    getBook(id: ID!): Book!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
  }
`;

const booksDb = [
  {
    id: "1",
    title: "Hello",
    authorId: "1",
  },
];

const authorDb = [{ id: "1", name: "morri" }];

const resolvers = {
  Query: {
    async getBook(parent, args, ctx) {
      //const book=await db.books.findOne({id: args.id})
      //return book

      return booksDb.find((book) => book.id === args.id);
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
      const author = authorDb.find((author) => author.id === parent.authorId);
      return author;
    },
  },

  Author: {},
};

const schema = createSchema({
  typeDefs,
  resolvers,
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
