'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ResultCard from '../components/ResultCard';
import RecipeSection from '../components/RecipeSection';
import { useRecipesStore } from '@/store/recipesStore';
import LoadingPulsingPizza from '../components/LoadingPulsingPizza';
import AnimatedLinkButton from '../components/AnimatedLinkButton';
import Navbar from '../components/Navbar';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('recipeId');

  const { selectedRecipe: recipe, loading, error, fetchRecipeById } = useRecipesStore();

  useEffect(() => {
    if (!recipeId) return;

    fetchRecipeById(recipeId);

  }, [recipeId, fetchRecipeById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center flex-col justify-center">
        <LoadingPulsingPizza />
        <p className="mt-4 text-gray-600 font-medium text-lg">
          Cooking up your recipe...
        </p>
      </div>
    );
  }

  if (!loading && (error || !recipe)) {
    return (
      <div className="text-center mt-10 text-red-600">
        {error || 'Recipe not found.'}
      </div>
    );
  }

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(recipe!.name)}+recipe`;


  return (
    <>
      <Navbar />
      <div className="mt-20">
        <div className="flex justify-center m-3 p-3">
          <ResultCard food={recipe!.name} />
        </div>

        <div className="p-6 max-w-md mx-auto">
          <RecipeSection recipe={recipe!} />

          <AnimatedLinkButton href={searchUrl} newTab>
            Search for full recipe
          </AnimatedLinkButton>
          <AnimatedLinkButton href='/spin' newTab={false}>
            Spin again
          </AnimatedLinkButton>
        </div>
      </div>
    </>
  );
}
