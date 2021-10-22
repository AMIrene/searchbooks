import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { GET_ME,  } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  //useQuery hook 
  const { loading, data } = useQuery(GET_ME, {fetchPolicy:"network-only"});

  //useMutation hook
  const [removeBook, { error }] = useMutation(REMOVE_BOOK, {refetchQueries:[{query:GET_ME}]});
 

//use the useQuery() Hook to execute the GET_ME
//query on load and save it to a variable named userData.
  
 
  const userData = () => data?.me || {};

  const userBooks = () => data?.me?.savedBooks || [];
  
 
  
  //useMutation() Hook to execute the REMOVE_BOOK mutation

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId } });
      
      console.log('hello');
     
    

  //Make sure you keep the removeBookId() function in place!)

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  //If the data is still loading, render a loading message  

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userBooks().length
            ? `Viewing ${userBooks().length} saved ${userBooks().length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userBooks().map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
