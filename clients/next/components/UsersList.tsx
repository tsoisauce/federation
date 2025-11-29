"use client";

import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/lib/graphql";
import UserCard from "./UserCard";

export default function UsersList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return (
    <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 text-red-600 rounded border border-red-200">
      Error loading users: {error.message}
    </div>
  );

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        All Users
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full dark:bg-zinc-800 dark:text-gray-400">
          {data.users.length}
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.users.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
