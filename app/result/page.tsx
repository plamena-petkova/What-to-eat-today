'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResultCard from '../components/ResultCard'
import Link from 'next/link'
import { motion } from 'framer-motion'
import RecipeSection from '../components/RecipeSection'

type Recipe = {
    id: string
    title: string
    description: string
    ingredients: string[]
    steps: string[]
}

const mockRecipes: Record<string, Recipe> = {
    pizza: {
        id: 'pizza',
        title: 'Delicious Pizza',
        description: 'A classic pizza with tomato sauce, cheese, and your favorite toppings.',
        ingredients: ['Dough', 'Tomato Sauce', 'Cheese', 'Toppings'],
        steps: ['Prepare dough', 'Add sauce', 'Add toppings', 'Bake in oven'],
    },
    sushi: {
        id: 'sushi',
        title: 'Fresh Sushi',
        description: 'Traditional Japanese sushi with fresh fish and rice.',
        ingredients: ['Sushi Rice', 'Nori', 'Fish', 'Soy Sauce'],
        steps: ['Cook rice', 'Prepare fish', 'Roll sushi', 'Serve with soy sauce'],
    },
    tacos: {
        id: 'tacos',
        title: 'Tasty Tacos',
        description: 'Spicy and flavorful tacos with meat and veggies.',
        ingredients: ['Tortillas', 'Meat', 'Lettuce', 'Cheese', 'Salsa'],
        steps: ['Cook meat', 'Warm tortillas', 'Assemble tacos', 'Enjoy'],
    },
}

export default function ResultPage() {
    const searchParams = useSearchParams()
    const recipeId = searchParams.get('recipeId')

    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!recipeId) {
            setRecipe(null)
            setLoading(false)
            return
        }

        const timer = setTimeout(() => {
            const found = mockRecipes[recipeId]
            setRecipe(found ?? null)
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [recipeId])


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
            )
        }
        if (!recipe) return <div className="text-center mt-10 text-red-600">Recipe not found.</div>

        return (
            <div className="m-10">
                <div className="flex justify-center m-3 p-3">
                    <ResultCard food={recipe.title} />
                </div>

                <div className="p-6 max-w-md mx-auto">
                    <RecipeSection title={recipe.title} items={recipe.ingredients} />

                    {/* Action Button */}
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
        )
    }
