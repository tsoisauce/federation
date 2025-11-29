import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      bio
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: Int, $email: String) {
    user(id: $id, email: $email) {
      id
      firstName
      lastName
      email
      bio
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      firstName
      lastName
      email
      bio
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      id
      firstName
      lastName
      email
      bio
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
