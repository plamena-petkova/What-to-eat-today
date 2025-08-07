'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRecipesStore } from '@/store/recipesStore';
import LoadingPulsingPizza from './LoadingPulsingPizza';
import ResultPageComponent from './ResultPageComponent';

export default function ResultPageClient() {
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


    return (
        <ResultPageComponent recipe={recipe!} />
    );
}
