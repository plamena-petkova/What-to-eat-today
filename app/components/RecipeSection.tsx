'use client'

import { motion } from 'framer-motion'

type RecipeSectionProps = {
  title: string
  items: string[]
  ordered?: boolean
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export default function RecipeSection({
  title,
  items,
}: RecipeSectionProps) {
  const isIngredients = title.toLowerCase().includes('ingredient')
  const emoji = isIngredients ? '🧂' : '👨‍🍳'

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
        <span>{emoji}</span> {title}
      </motion.h2>

      {isIngredients ? (
        <motion.ul className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="bg-pink-100 text-pink-800 px-4 py-1 rounded-full text-sm font-medium shadow"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.ol className="space-y-3">
          {items.map((ingredients, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="bg-green-50 border-l-4 border-green-400 px-4 py-3 rounded-md shadow-sm"
            >
              <div className="text-gray-700">{ingredients}</div>
            </motion.li>
          ))}
        </motion.ol>
      )}
    </motion.div>
  )
}
