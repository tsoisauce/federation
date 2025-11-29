"use client";

import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
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

export default function UsersList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid gap-4">
        {data.users.map((user: any) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.bio}</p>
            <p className="text-xs text-gray-400">ID: {user.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
