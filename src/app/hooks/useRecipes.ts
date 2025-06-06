'use client';

import { useQuery } from '@tanstack/react-query';
import { Recipe, RecipeList, RecipeDetail } from '../types/recipe';
import { API_BASE_URL } from '../lib/constants';

// Hook for fetching all recipes
export function useRecipes() {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: async (): Promise<Recipe[]> => {
      try {
        const response = await fetch(`${API_BASE_URL}/search.php?f=b`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: RecipeList = await response.json();
        return data.meals || [];
      } catch (error) {
        console.error('Error fetching recipes:', error);
        throw new Error('Failed to fetch recipes');
      }
    }
  });
}

// Hook for fetching a recipe by ID
export function useRecipeById(id: string) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: async (): Promise<Recipe | null> => {
      try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: RecipeDetail = await response.json();
        return data.meals?.[0] || null;
      } catch (error) {
        console.error(`Error fetching recipe ${id}:`, error);
        throw new Error('Failed to fetch recipe details');
      }
    },
    enabled: !!id
  });
}

// Hook for searching recipes by name
export function useRecipeSearch(query: string) {
  return useQuery({
    queryKey: ['recipes', 'search', query],
    queryFn: async (): Promise<Recipe[]> => {
      try {
        // If no query, fetch default recipes
        const endpoint = query.trim() 
          ? `${API_BASE_URL}/search.php?s=${query}`
          : `${API_BASE_URL}/search.php?f=b`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: RecipeList = await response.json();
        return data.meals || [];
      } catch (error) {
        console.error('Error searching recipes:', error);
        throw new Error('Failed to search recipes');
      }
    }
  });
}

// Hook for fetching recipes by category
export function useRecipesByCategory(category: string) {
  return useQuery({
    queryKey: ['recipes', 'category', category],
    queryFn: async (): Promise<Recipe[]> => {
      try {
        const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: RecipeList = await response.json();
        return data.meals || [];
      } catch (error) {
        console.error(`Error fetching recipes in category ${category}:`, error);
        throw new Error('Failed to fetch recipes by category');
      }
    },
    enabled: !!category
  });
} 