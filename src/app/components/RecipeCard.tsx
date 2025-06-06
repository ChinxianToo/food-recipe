'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.idMeal}`}>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative w-full h-48">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">{recipe.strMeal}</h2>
          <div className="mt-auto flex justify-between items-center text-sm">
            <p className="bg-gray-100 px-2 py-1 rounded">{recipe.strCategory}</p>
            <p className="text-gray-600">{recipe.strArea}</p>
          </div>
        </div>
      </div>
    </Link>
  );
} 