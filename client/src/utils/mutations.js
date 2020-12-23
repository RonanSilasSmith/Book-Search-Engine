import gql from 'graphql-tag';

//if you are reading into the code: Hello!
//You should know as a habit, I shuffle cards while I'm thinking, and at this point in my code, around 50 cards went flying on to the floor
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;
//oh this is probably where order comes in for books
//reference
// title
// bookId
// description
// authors
// image
// link
// FUN FACT! I forgot to put in link earlier for whatever reason

//also a fun fact, this feels shakey to me for a different whatever reason
export const SAVE_BOOK = gql`
    mutation saveBook($title: String!, $bookId: String!, $description: String!, $authors: [String], $image: String! $link: link!){
        saveBook(title: $title, bookId:$bookId, description: $description, authors: $authors, image:$image, link: $link){
            _id

            savedBooks {
                title
                bookId
                authors
                image
                link
            }
        }
    }
`;

//I'll revisit this, I'm unsure right now
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId = String!){
      removeBook(bookId: $bookId){
            _id

            savedBooks {
                title
                bookId
                authors
                image
                link
            }
      }

  }
`;