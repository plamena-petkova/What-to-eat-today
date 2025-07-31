'use client'

import { motion } from 'framer-motion'
import { Recipe } from '../types/interfaces'
import CountryFlag from './CountryFlag'

type RecipeSectionProps = {
  recipe: Recipe
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export default function RecipeSection({
  recipe
}: RecipeSectionProps) {
  const isIngredients = recipe.ingredients_preview.includes('ingredient');

  const tagEmojis: Record<string, string> = {
    main: "🥘",
    dessert: "🍰",
    soup: "🍲",
    spread: "🧈",
    salad: "🥗"
  };


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-10"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4"
      >
        <span>👨‍🍳</span> {recipe.name}   <CountryFlag region={recipe.region} />

      </motion.h2>
      <motion.h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <span>{recipe.tags && tagEmojis[recipe.tags[0]]} {recipe.tags}</span>
      </motion.h2>



      {isIngredients ? (
        <motion.ul className="flex flex-wrap gap-2">
          {recipe.ingredients_preview.map((item, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="bg-fuchsia-500 text-gray-800 px-4 py-1 rounded-full text-sm font-medium shadow hover:bg-yellow-100 transition"
            >
              🧂{item}
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.ol className="space-y-2">
          {recipe.ingredients_preview.map((step, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="bg-white text-gray-800 px-4 py-2 rounded-md shadow hover:bg-green-50 transition"
            >
              🧂{step}
            </motion.li>
          ))}
        </motion.ol>
      )}
    </motion.div>
  )
}
