"use client";

import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Search, X } from "lucide-react";
import { GET_USER } from "@/lib/graphql";

interface SearchBarProps {
  onSearchResult: (user: any | null) => void;
  onClear: () => void;
}

export default function SearchBar({ onSearchResult, onClear }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER);

  useEffect(() => {
    if (data) {
      onSearchResult(data.user || null);
    }
  }, [data, onSearchResult]);

  useEffect(() => {
    if (error) {
      console.error("Search error:", error);
      onSearchResult(null);
    }
  }, [error, onSearchResult]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    const id = parseInt(searchTerm);
    if (!isNaN(id)) {
      getUser({ variables: { id } });
    } else {
      getUser({ variables: { email: searchTerm } });
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 relative">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full border p-3 pl-10 pr-10 rounded-lg shadow-sm dark:bg-zinc-900 dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Search by ID or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm transition-colors font-medium disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "..." : "Search"}
        </button>
      </form>
    </div>
  );
}
