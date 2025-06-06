'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import FeedbackForm from '../../components/FeedbackForm';
import Navbar from '../../components/Navbar';
import { Ingredient, Recipe } from '../../types/recipe';
import { useRecipeById } from '../../hooks/useRecipes';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const {
    data: recipe,
    isLoading,
    isError,
    error,
    refetch
  } = useRecipeById(id as string);

  const getIngredients = (recipe: Recipe): Ingredient[] => {
    const ingredients: Ingredient[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];
      
      if (ingredient && typeof ingredient === 'string' && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: typeof measure === 'string' ? measure : ''
        });
      }
    }
    
    return ingredients;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to recipes
        </Link>
        
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState 
            message={`Error loading recipe: ${error instanceof Error ? error.message : 'Unknown error'}`} 
            onRetry={() => refetch()}
          />
        ) : !recipe ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Recipe not found</h2>
            <p className="text-gray-600">The recipe you&apos;re looking for doesn&apos;t exist</p>
          </div>
        ) : (
          <div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
                  <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 md:w-2/3">
                  <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                      {recipe.strCategory}
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                      {recipe.strArea}
                    </span>
                    {recipe.strTags && recipe.strTags.split(',').map((tag: string) => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  
                  {recipe.strYoutube && (
                    <a 
                      href={recipe.strYoutube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors mb-4"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                      Watch Video
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6 md:p-8 border-t">
                <div className="md:flex gap-8">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                    <ul className="space-y-2">
                      {getIngredients(recipe).map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                          </svg>
                          <span>
                            <strong>{ingredient.measure}</strong> {ingredient.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                    <div className="prose max-w-none">
                      {recipe.strInstructions.split('\r\n').filter(Boolean).map((step, index) => (
                        <p key={index} className="mb-4">{step}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <FeedbackForm recipeId={recipe.idMeal} />
          </div>
        )}
      </main>
    </div>
  );
} 