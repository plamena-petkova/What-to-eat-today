'use client'
import { useRouter } from 'next/navigation'
import FoodWheel from '../components/FoodWheel'
import { useEffect, useState } from 'react'
import { useRecipesStore } from '@/store/recipesStore'
import LoadingPulsingPizza from '../components/LoadingPulsingPizza'
import Navbar from '../components/Navbar'

export default function SpinPage() {
  const router = useRouter()
  const { recipes, loading, error, fetchRecipes } = useRecipesStore();

  const [initialized, setInitialized] = useState(false)

  function handleSelect(selectedId: string) {
    setTimeout(() => {
      router.push(`/result?recipeId=${encodeURIComponent(selectedId)}`)
    }, 2000)
  }

  useEffect(() => {
    fetchRecipes()
    setInitialized(true)
  }, [])

  if (loading || !initialized) {
    return (
      <div className='min-h-screen flex items-center flex-col justify-center'>
        <p className="mb-4 text-gray-600 font-medium text-lg">Loading recipes...</p>
        <LoadingPulsingPizza />
      </div>
    )
  }

  if (error) return <p>Error: {error}</p>

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-10 items-center justify-center h-screen">
        <div className="border-dotted rounded-xl">
          <h1 className="text-2xl text-center font-extrabold text-white mb-8 drop-shadow-lg">
            What to Eat Today?
          </h1>
          <FoodWheel items={recipes} onSelect={handleSelect} showLabels={false} />
        </div>
      </div>
    </>
  )
}
