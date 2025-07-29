import { motion } from 'framer-motion'

export default function ResultCard({ food }: { food: string }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="p-6 rounded-xl bg-pink-200 shadow-xl text-center"
    >
      <h1 className="text-center text-2xl font-bold mb-4">🎉</h1>
      <h1 className="text-center text-3xl font-bold mb-4"> You should eat:</h1>
      <p className="text-3xl">{food}</p>
      <p className="mt-4 italic">Trust the food gods 🍜</p>
    </motion.div>
  )
}
