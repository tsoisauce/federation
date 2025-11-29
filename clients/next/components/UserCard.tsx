"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Trash2, Edit2, Save, X } from "lucide-react";
import { DELETE_USER, UPDATE_USER, GET_USERS } from "@/lib/graphql";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
}

export default function UserCard({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    bio: user.bio || "",
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: user.id },
    refetchQueries: [{ query: GET_USERS }],
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => setIsEditing(false),
  });

  const handleSave = () => {
    updateUser({
      variables: {
        id: user.id,
        updateUserInput: formData,
      },
    });
  };

  if (isEditing) {
    return (
      <div className="border p-4 rounded shadow bg-white dark:bg-zinc-900 dark:border-zinc-800 flex flex-col gap-2">
        <input
          className="border p-1 rounded dark:bg-zinc-800 dark:text-white"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          placeholder="First Name"
        />
        <input
          className="border p-1 rounded dark:bg-zinc-800 dark:text-white"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          placeholder="Last Name"
        />
        <input
          className="border p-1 rounded dark:bg-zinc-800 dark:text-white"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <textarea
          className="border p-1 rounded dark:bg-zinc-800 dark:text-white"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Bio"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => setIsEditing(false)} className="p-2 text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
          <button onClick={handleSave} className="p-2 text-green-500 hover:text-green-700">
            <Save size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded shadow bg-white dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-between h-full transition-shadow hover:shadow-lg">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg truncate" title={`${user.firstName} ${user.lastName}`}>
            {user.firstName} {user.lastName}
          </h3>
          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
            ID: {user.id}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate" title={user.email}>
          {user.email}
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-300 line-clamp-3">
          {user.bio || <span className="italic text-gray-400">No bio provided</span>}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-4 border-t pt-3 dark:border-zinc-800">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
          title="Edit"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => deleteUser()}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
