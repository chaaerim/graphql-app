const schema=gql`
type Query{
    getBook(id: ID!): Book!
}

type Book{
    id: ID!
    title: String!
    author: Author!
}

type Author{
    id: ID!
    name: String!
}

`

const resolver={
    Query: {
        async getBook(parent, args, ctx){}
    },
    Book: {
        id(parent, args, ctx){},
        title(parent, args, ctx){},
        author(parent. args. ctx){},
    }
}