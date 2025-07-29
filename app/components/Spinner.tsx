'use client'

import FoodWheel from './FoodWheel'
import { useRouter, useSearchParams } from 'next/navigation'

const foods = [
  { id: 'pizza', label: 'Pizza' },
  { id: 'sushi', label: 'Sushi' },
  { id: 'tacos', label: 'Tacos' },
]

export default function Spinner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') ?? 'random'

  function handleSelect(selectedRecipeId: string) {
    router.push(`/result?recipeId=${encodeURIComponent(selectedRecipeId)}&mood=${mood}`)
  }

  return (
    <div className="text-center p-10">
      <FoodWheel items={foods} onSelect={handleSelect} />
    </div>
  )
}
