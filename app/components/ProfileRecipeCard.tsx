'use client';

import { motion } from 'framer-motion';
import CountryFlag from './CountryFlag';
import { Recipe } from '../types/interfaces';

export default function ProfileRecipeCard({ recipe, onEdit, onDelete }: { recipe: Recipe; onEdit: (id: string) => void; onDelete: (id: string) => void }) {
  const tagToEmoji: Record<string, string> = {
    main: '🥘',
    dessert: '🍰',
    soup: '🍲',
    spread: '🧈',
    salad: '🥗',
    snack: '🥨',
    bakery: '🥐',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-300 transition-transform"
    >
      {/* Recipe Image */}
      {recipe.image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Name + main tag emoji */}
        <h2 className="text-xl font-bold flex items-center gap-2 text-pink-600">
          {recipe.name} {recipe.tags?.[0] && tagToEmoji[recipe.tags[0].toLowerCase()]}
        </h2>

        {/* Tags as pill badges */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center gap-1"
              >
                {tagToEmoji[tag.toLowerCase()] || ''} {tag}
              </span>
            ))}
          </div>
        )}

        {/* Region with flag */}
        {recipe.region && (
          <p className="flex items-center gap-2 text-gray-700 mt-2 font-medium">
            <CountryFlag region={recipe.region} /> {recipe.region}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(recipe.id)}
            className="px-4 py-1 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="px-4 py-1 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}