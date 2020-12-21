const { gql } = require('apollo-server-express');

const typeDefs = gql`
    Type Book{
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    Type User{
        username: String
        email: String
        password: Password
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    Type Query{
        me: User
    }

    Type Mutation{
        login(email: String!, password: String!):Auth
        addUser(username: String!, email: String!, password: String!):Auth
        saveBook(bookId: String!, authors: [String], description: String, image: String, description: String, title: String):User
        removeBook(bookId: String!):User
    }
  }
`;

module.exports = typeDefs;