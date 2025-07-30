'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-pink-600">
           What To Eat?
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-pink-500 transition">Home</Link>
          <Link href="/spin" className="hover:text-pink-500 transition">Food Wheel</Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3  bg-opacity-90">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-pink-600">Home</Link>
          <Link href="/spin" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-pink-600">Food Wheel</Link>
        </div>
      )}
    </nav>
  );
}
