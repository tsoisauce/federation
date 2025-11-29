"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Plus, X } from "lucide-react";
import { CREATE_USER, GET_USERS } from "@/lib/graphql";

export default function AddUserForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  const [createUser] = useMutation(CREATE_USER, {
    variables: { createUserInput: formData },
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      setIsOpen(false);
      setFormData({ firstName: "", lastName: "", email: "", bio: "" });
    },
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors font-medium"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">Add User</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border dark:border-zinc-800">
            <div className="p-4 border-b dark:border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-lg">Add New User</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input
                    className="border p-2 rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input
                    className="border p-2 rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  className="border p-2 rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                <textarea
                  className="border p-2 rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => createUser()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
