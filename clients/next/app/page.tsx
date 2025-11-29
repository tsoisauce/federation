"use client";

import { useState, useCallback } from "react";
import UsersList from "@/components/UsersList";
import AddUserForm from "@/components/AddUserForm";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import UserCard from "@/components/UserCard";

export default function Home() {
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResult = useCallback((user: any | null) => {
    setIsSearching(true);
    setSearchResult(user);
  }, []);

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchResult(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">Federation Demo</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Manage users across the federated graph.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AddUserForm />
            <div className="w-px h-8 bg-gray-200 dark:bg-zinc-800 mx-1"></div>
            <ThemeToggle />
          </div>
        </header>

        {/* Search Section */}
        <section className="mb-12">
          <SearchBar onSearchResult={handleSearchResult} onClear={handleClearSearch} />
        </section>

        {/* Content Section */}
        <section>
          {isSearching ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Search Result</h2>
                <button
                  onClick={handleClearSearch}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Back to All Users
                </button>
              </div>

              {searchResult ? (
                <div className="max-w-sm mx-auto">
                  <UserCard user={searchResult} />
                </div>
              ) : (
                <div className="text-center p-12 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No user found matching your search.</p>
                  <button
                    onClick={handleClearSearch}
                    className="mt-4 text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          ) : (
            <UsersList />
          )}
        </section>
      </main>
    </div>
  );
}
