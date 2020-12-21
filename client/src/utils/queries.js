import gql from 'graphql-tag';

//I didn't realize it until now, call it tunnel vision, but not just being able to define the book schema in savedBooks feels kind of old fasioned. Manually inputting what you want included isn't without benefit I suppose
// also hoping order isn't a problem, because I define a saved book's properties differently than I do in the book schema I'm pretty sure
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount

      savedBooks{
        title
        bookId
        description
        authors
        image
        link
      }
    }
  }
`;