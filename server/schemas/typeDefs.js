const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int

}

type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String

}

# Set up an Auth type to handle returning data from a user creating or user login
type Auth {
  token: ID!
  user: User
}

# For reading data

type Query {
    user: [User]
    me: User
}

# For Creating, Updating and Deleting

type Mutation {

    # add user mutation
    addUser(username: String!, email: String!, password: String!): Auth

    # login mutation
    login(email: String!, password: String!): Auth

    # Save a Book: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type
    saveBook( bookId: String, authors: [String], description: String, title: String, image: String, link: String) : User

    # Remove a Book: Accepts a book's bookId as a parameter; returns a User type.
    removeBook(bookId: String) : User
}

` ;

module.exports = typeDefs;