'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import FoodWheel from '../components/FoodWheel'
import { useEffect, useState } from 'react'
import { Recipe } from '../types/interfaces'


export default function SpinPage() {
  const router = useRouter()

  const [meals, setMeals] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  function handleSelect(selectedId: string) {
    router.push(`/result?recipeId=${encodeURIComponent(selectedId)}`)
  }

      const fetchMeals = async () => {
      try {
        const res = await fetch('/api/recipes');
        const recipes = await res.json() as Recipe[];
         console.log('Res', recipes);
        setMeals(recipes);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMeals(); 
  }, []); 


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FoodWheel items={meals} onSelect={handleSelect} showLabels={false} />
    </div>
  )
}
