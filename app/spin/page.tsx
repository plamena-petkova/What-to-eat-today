'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import FoodWheel from '../components/FoodWheel'
import { useEffect } from 'react'
import { useRecipesStore } from '@/store/recipesStore'
import LoadingPulsingPizza from '../components/LoadingPulsingPizza'
import Image from 'next/image'
import Navbar from '../components/Navbar'


export default function SpinPage() {
  const router = useRouter()

  const { recipes, loading, error, fetchRecipes } = useRecipesStore();


  function handleSelect(selectedId: string) {
    setTimeout(() => (router.push(`/result?recipeId=${encodeURIComponent(selectedId)}`)), 2000)
  }



  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) return <div className='min-h-screen flex items-center flex-col justify-center'><p className="mt-4 text-gray-600 font-medium text-lg">Loading recipes...</p><LoadingPulsingPizza /></div>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-dotted rounded-xl">
          <h1
            className="text-2xl text-center font-extrabold text-white mb-8 drop-shadow-lg"
          >
            What to Eat Today?
          </h1>
          <FoodWheel items={recipes} onSelect={handleSelect} showLabels={false} />
        </div>
      </div>
    </>
  )
}
