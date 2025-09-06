'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-tr from-yellow-300 via-pink-300 to-purple-400 flex flex-col items-center justify-center pt-20 px-6">
        
        <div className="flex flex-col items-center text-center w-full max-w-md">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="What to Eat Today Logo"
            width={120}
            height={120}
            priority
            className="mb-4"
          />

          {/* Title */}
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-white drop-shadow-lg mb-2"
          >
            Welcome Back 👋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white opacity-90 mb-6"
          >
            Log in to continue your personalized food journey!
          </motion.p>

          {/* Login Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full flex flex-col gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-pink-700 transition"
            >
              Login 🔑
            </motion.button>
          </motion.form>

          {/* Extra Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-white mt-6 space-y-2"
          >
            <p>
              Don’t have an account?{" "}
              <Link href="/signup" className="font-bold underline hover:text-yellow-200">
                Sign up here
              </Link>
            </p>
            <p>
              <Link href="/forgot-password" className="underline hover:text-yellow-200">
                Forgot your password?
              </Link>
            </p>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 text-white text-sm opacity-80"
          >
            🔐 Secure login, tasty adventures ahead!
          </motion.footer>
        </div>
      </main>
    </>
  );
}
