const { gql } = require('apollo-server-express');

const typeDefs = gql`
    Type Book{
        bookId: ID
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
  }
`;

module.exports = typeDefs;