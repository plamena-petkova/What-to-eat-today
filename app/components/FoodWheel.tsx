'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type FoodItem = {
  id: string
  label: string
}

type FoodWheelProps = {
  items: FoodItem[]
  onSelect: (id: string) => void
  showLabels?: boolean
}

export default function FoodWheel({
  items,
  onSelect,
  showLabels = true,
}: FoodWheelProps) {
  const [rotating, setRotating] = useState(false)
  const [rotation, setRotation] = useState(0)

  const radius = 140
  const center = 150
  const total = items.length
  const angle = 360 / total

  const colors = [
    '#FBBF24',
    '#34D399',
    '#60A5FA',
    '#F472B6',
    '#A78BFA',
    '#F87171',
    '#10B981',
    '#FB923C',
  ]

  const spinWheel = () => {
    if (rotating) return

    const spins = Math.floor(Math.random() * 3) + 4 // 4-6 full spins
    const chosen = Math.floor(Math.random() * total)
    // Calculate final rotation to land on chosen slice (adjusted for pointer)
    const finalRotation = 360 * spins + (360 - chosen * angle - angle / 2)

    setRotation(finalRotation)
    setRotating(true)

    setTimeout(() => {
      setRotating(false)
      onSelect(items[chosen].id)
    }, 3000) // match animation duration
  }

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    }
  }

  const describeArc = (
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = polarToCartesian(x, y, r, endAngle)
    const end = polarToCartesian(x, y, r, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    return [
      'M',
      x,
      y,
      'L',
      start.x,
      start.y,
      'A',
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'Z',
    ].join(' ')
  }

  return (
    <div className="relative flex flex-col items-center">

      <div className="absolute top-[5px] z-10">
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-red-600"></div>
      </div>


      <motion.svg
        width={300}
        height={300}
        viewBox="0 0 300 300"
        initial={{ rotate: 0 }}
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        className="rounded-full shadow-lg"
      >
        {items.map((item, i) => {
          const startAngle = angle * i
          const endAngle = startAngle + angle
          const midAngle = startAngle + angle / 2

          const path = describeArc(center, center, radius, startAngle, endAngle)
          const fill = colors[i % colors.length]
          const labelPos = polarToCartesian(center, center, radius - 40, midAngle)

          return (
            <g key={item.id}>
              <path d={path} fill={fill} />
              {showLabels && (
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {item.label}
                </text>
              )}
            </g>
          )
        })}
      </motion.svg>

      <button
        onClick={spinWheel}
        disabled={rotating}
        className="mt-6 px-6 py-3 rounded-xl bg-amber-500 text-white font-bold text-lg shadow-md hover:bg-amber-600 disabled:opacity-50"
      >
        {rotating ? 'Spinning...' : 'Spin the Wheel!'}
      </button>
    </div>
  )
}
