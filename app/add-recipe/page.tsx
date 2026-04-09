'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '../types/interfaces';
import { useAuthStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { notify } from '@/lib/toast';

const TAG_OPTIONS: { [key: string]: string } = {
  main: '🥘',
  dessert: '🍰',
  soup: '🍲',
  spread: '🧈',
  salad: '🥗',
  snack: '🥨',
  bakery: '🥐',
};

export default function CreateRecipePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [recipe, setRecipe] = useState<Recipe>({
    id: uuidv4(),
    name: '',
    region: '',
    ingredients_preview: [],
    full_ingredients: '',
    instructions: '',
    image_url: '',
    tags: [],
    created_at: new Date().toISOString(),
    is_full: false,
    user_id: '',
  });

  useEffect(() => {
    setImagePreview(recipe.image_url || null);
  }, [recipe.image_url]);

  const handleInputChange = (field: keyof Recipe, value: any) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleTagChange = (value: string) => {
    setRecipe({ ...recipe, tags: [value] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipe.name.trim()) {
      notify.error('Recipe name is required');
      return;
    }

    const recipeWithUser = { ...recipe, user_id: user?.id || '' };

    await notify.promise(
      fetch('/api/recipes/add-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeWithUser),
      }).then(async (res) => {
        let data: any = null;
        try {
          data = await res.json();
        } catch {}

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to add recipe');
        }

        return data;
      }),
      {
        loading: 'Creating recipe...',
        success: 'Recipe added successfully! 🍽️',
        error: 'Failed to add recipe',
      }
    );

    setRecipe({
      id: uuidv4(),
      name: '',
      region: '',
      ingredients_preview: [],
      full_ingredients: '',
      instructions: '',
      image_url: '',
      tags: [],
      created_at: new Date().toISOString(),
      is_full: false,
      user_id: '',
    });

    setImagePreview(null);
    router.push('/spin');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-tr from-yellow-300 via-pink-300 to-purple-400 flex flex-col items-center justify-center pt-20 px-6">
        <div className="flex flex-col items-center text-center w-full max-w-md">
          <Image src="/logo.png" alt="Logo" width={120} height={120} priority className="mb-4" />

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-white drop-shadow-lg mb-2"
          >
            Create New Recipe 🍳
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white opacity-90 mb-6"
          >
            Fill out the details below to add your tasty recipe!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Recipe Name"
              value={recipe.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />

            <input
              type="text"
              placeholder="Region"
              value={recipe.region}
              onChange={e => handleInputChange('region', e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            {/* Ingredients Preview */}
            {recipe.ingredients_preview.map((ing, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ing}
                  onChange={e => {
                    const newIngs = [...recipe.ingredients_preview];
                    newIngs[idx] = e.target.value;
                    setRecipe({ ...recipe, ingredients_preview: newIngs });
                  }}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newIngs = recipe.ingredients_preview.filter((_, i) => i !== idx);
                    setRecipe({ ...recipe, ingredients_preview: newIngs });
                  }}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setRecipe({ ...recipe, ingredients_preview: [...recipe.ingredients_preview, ''] })
              }
              className="text-blue-500 font-semibold text-left"
            >
              Add Ingredient
            </button>

            <textarea
              placeholder="Full Ingredients"
              value={recipe.full_ingredients || ''}
              onChange={e => handleInputChange('full_ingredients', e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <textarea
              placeholder="Instructions"
              value={recipe.instructions || ''}
              onChange={e => handleInputChange('instructions', e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={recipe.image_url || ''}
              onChange={e => handleInputChange('image_url', e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 w-full max-h-64 object-cover rounded" />
            )}

            <select
              value={recipe.tags?.[0] || ''}
              onChange={e => handleTagChange(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">Select a tag</option>
              {Object.entries(TAG_OPTIONS).map(([key, emoji]) => (
                <option key={key} value={key}>
                  {emoji} {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-pink-700 transition"
            >
              Create Recipe ✅
            </motion.button>
          </motion.form>
        </div>
      </main>
    </>
  );
}