'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/userStore';
import { useRecipesStore } from '@/store/recipesStore';
import Navbar from '../components/Navbar';
import ProfileRecipeCard from '../components/ProfileRecipeCard';
import LoadingPulsingPizza from '../components/LoadingPulsingPizza';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { recipes, fetchRecipes, loading } = useRecipesStore();

  const myRecipes = recipes.filter(r => r.user_id === user?.id);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const totalPages = Math.ceil(myRecipes.length / recipesPerPage);

  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = myRecipes.slice(indexOfFirst, indexOfLast);

  const handleEdit = (id: string) => {
    console.log('Edit', id);
    // navigate to edit page or open modal
  };

  const handleDelete = (id: string) => {
    console.log('Delete', id);
    // call your store action to delete recipe
  };

  useEffect(() => {
    if (recipes.length === 0) {
      fetchRecipes(); // fetch recipes if store is empty
    }
  }, [fetchRecipes, recipes.length]);

  if (loading) return <div className="min-h-screen flex items-center flex-col justify-center"><LoadingPulsingPizza /></div>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">My Recipes 🍳</h1>

        {!loading && myRecipes.length === 0 && (
          <p className="text-center">You haven't created recipes yet.</p>
        )}
        <div className="flex justify-center mb-6">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-pink-600 text-white font-bold rounded-full px-14 py-5 shadow-lg hover:shadow-2xl transition"
          aria-label="Add your own recipe to the wheel"
          href="/add-recipe"
        >
          Add Recipe 🍕
        </motion.a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">

          {currentRecipes.map(recipe => (
            <ProfileRecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2 p-5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
                  ? ' bg-pink-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  );
}