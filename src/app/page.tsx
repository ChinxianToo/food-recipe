'use client';

import { useState } from 'react';
import RecipeCard from './components/RecipeCard';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import Navbar from './components/Navbar';
import { useRecipes, useRecipeSearch } from './hooks/useRecipes';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the appropriate hook based on whether we have a search query
  const {
    data: recipes,
    isLoading,
    isError,
    error,
    refetch
  } = searchTerm ? useRecipeSearch(searchTerm) : useRecipes();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Discover Delicious Recipes</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for recipes..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState 
            message={`Error loading recipes: ${error instanceof Error ? error.message : 'Unknown error'}`} 
            onRetry={() => refetch()}
          />
        ) : recipes?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No recipes found</h2>
            <p className="text-gray-600">Try searching for something different</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes?.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
