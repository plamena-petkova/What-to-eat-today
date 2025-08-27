'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Recipe } from '../types/interfaces';

type FoodWheelProps = {
  items: Recipe[];
  onSelect: (id: string) => void;
  showLabels?: boolean;
};


export default function FoodWheel({ items, onSelect }: FoodWheelProps) {
  const [rotating, setRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Recipe | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const spinWheel = () => {
    if (rotating || items.length === 0) return;

    const spins = Math.floor(Math.random() * 3) + 4;
    const finalRotation = 360 * spins + Math.random() * 360;

    setRotation(finalRotation);
    setRotating(true);

    setTimeout(() => {
      setRotating(false);

      // Exclude recipes from recent history
      let availableItems = items.filter(item => !history.includes(item.id));

      if (availableItems.length === 0) {
        // All recipes have been seen recently, so reset the history
        setHistory([]);
        availableItems = [...items];
      }

      const chosenIndex = Math.floor(Math.random() * availableItems.length);
      const selected = availableItems[chosenIndex];

      setSelectedItem(selected);

      // Update recent history
      setHistory(prev => {
        const newHistory = [selected.id, ...prev];
        return newHistory.slice(0, 10); // Keep the last 10
      });

      onSelect(selected.id);
    }, 3000);
  };


  return (
    <div className="relative flex flex-col items-center">

      {/* Pizza Wheel */}
      <motion.img
        src={'/pizzaSvg.svg'}
        alt="Pizza wheel"
        width={300}
        height={300}
        initial={{ rotate: 0 }}
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        className="rounded-full shadow-lg"
        draggable={false}
      />

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={rotating}
        className="mt-6 px-6 py-3 rounded-xl bg-amber-500 text-white font-bold text-lg shadow-md hover:bg-amber-600 disabled:opacity-50"
      >
        {rotating ? 'Spinning...' : 'Spin the Pizza!'}
      </button>

      {/* Selected Result */}
      {selectedItem && !rotating && (
        <div className="mt-4 text-center">
          <p className="text-gray-600">Selected Recipe:</p>
          <p className="text-xl font-semibold text-amber-700">{selectedItem.name}</p>
        </div>
      )}
    </div>
  );
}

