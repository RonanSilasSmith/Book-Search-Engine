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
        login():Auth
        addUser():Auth
        saveBook():User
        removeBook():User
    }
  }
`;

module.exports = typeDefs;