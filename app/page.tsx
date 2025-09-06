'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen mt-10 bg-gradient-to-tr from-yellow-300 via-pink-300 to-purple-400 flex flex-col justify-center items-center p-6 text-center">

        <Image
          src="/logo.png"
          alt="What to Eat Today Logo"
          width={200}
          height={200}
          priority
        />

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg"
        >
          What to Eat Today?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-white mb-8 max-w-xs drop-shadow-md"
        >
          Hungry and clueless? Spin the wheel and unlock tasty meal ideas from around the globe!
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-col gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-pink-600 font-bold rounded-full px-14 py-5 shadow-lg hover:shadow-2xl transition"
            aria-label="Spin the wheel to pick a meal"
            href="/spin"
          >
            Spin the Pizza 🎉
          </motion.a>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/signup"
              className="inline-block bg-pink-600 text-white font-bold rounded-full px-14 py-5 shadow-lg hover:bg-pink-700 hover:shadow-2xl transition"
            >
              Sign Up for Personal Experience ✨
            </Link>
          </motion.div>
        </div>

        <motion.ul
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 text-white text-base space-y-2 max-w-xs"
        >
          <li>🍳 Quick and easy meal ideas</li>
          <li>🌍 Explore recipes from around the world</li>
          <li>❤️ Save your favorites soon!</li>
        </motion.ul>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 text-white text-sm opacity-80"
        >
          Made with ❤️ for hungry souls!
        </motion.footer>
      </main>
    </>
  );
}
