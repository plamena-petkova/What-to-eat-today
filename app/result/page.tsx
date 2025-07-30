'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResultCard from '../components/ResultCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RecipeSection from '../components/RecipeSection';
import { Recipe } from '../types/interfaces';


export default function ResultPage() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('recipeId');

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!recipeId) {
      setRecipe(null);
      setLoading(false);
      return;
    }

    const fetchMealById = async (id: string) => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) {
          setRecipe(null);
          return;
        }

        const data: Recipe = await res.json();
        setRecipe(data)

      } catch (err) {
        console.error('Failed to fetch meal:', err);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMealById(recipeId);
    }, 1000);

    return () => clearTimeout(timer);
  }, [recipeId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <motion.div
          className="text-6xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        >
          🍕
        </motion.div>
        <p className="mt-4 text-gray-600 font-medium text-lg">
          Cooking up your recipe...
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center mt-10 text-red-600">Recipe not found.</div>
    );
  }



  return (
    <div className="m-10">
      <div className="flex justify-center m-3 p-3">
        <ResultCard food={recipe.name} />
      </div>

      <div className="p-6 max-w-md mx-auto">
        <RecipeSection name={recipe.name} ingredientsPreview={recipe.ingredients_preview} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href={`/recipes/${recipe.id}`}>
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-md hover:brightness-110 transition-all duration-200">
              View Full Recipe
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
