'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import FoodWheel from '../components/FoodWheel'

type FoodItem = {
  id: string
  label: string
}

export default function SpinPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') ?? 'random'

  // Changed to array of objects with id and label
  const foodMap: Record<string, FoodItem[]> = {
    healthy: [
      { id: 'salad', label: 'Salad' },
      { id: 'quinoa-bowl', label: 'Quinoa Bowl' },
      { id: 'avocado-toast', label: 'Avocado Toast' },
      { id: 'smoothie', label: 'Smoothie' },
    ],
    comfort: [
      { id: 'burger', label: 'Burger' },
      { id: 'pizza', label: 'Pizza' },
      { id: 'mac-cheese', label: 'Mac & Cheese' },
      { id: 'lasagna', label: 'Lasagna' },
    ],
    quick: [
      { id: 'tacos', label: 'Tacos' },
      { id: 'ramen', label: 'Ramen' },
      { id: 'wrap', label: 'Wrap' },
      { id: 'toast', label: 'Toast' },
    ],
    adventurous: [
      { id: 'sushi', label: 'Sushi' },
      { id: 'ethiopian', label: 'Ethiopian' },
      { id: 'korean-bbq', label: 'Korean BBQ' },
      { id: 'falafel', label: 'Falafel' },
    ],
    random: [
      { id: 'salad', label: 'Salad' },
      { id: 'pizza', label: 'Pizza' },
      { id: 'ramen', label: 'Ramen' },
      { id: 'falafel', label: 'Falafel' },
      { id: 'tacos', label: 'Tacos' },
      { id: 'burger', label: 'Burger' },
    ],
  }

  const foods = foodMap[mood] ?? foodMap.random

  // Separate handler function
  function handleSelect(selectedId: string) {
    router.push(`/result?recipeId=${encodeURIComponent(selectedId)}&mood=${mood}`)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold mb-6">Mood: {mood}</h1>
      <FoodWheel items={foods} onSelect={handleSelect} showLabels={false} />
    </div>
  )
}
