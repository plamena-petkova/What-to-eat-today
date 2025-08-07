'use client'
import React from 'react';
import { motion } from 'framer-motion';

const LoadingPulsingPizza = () => {
    return (
        <motion.div
            className="text-6xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        >
            🍕
        </motion.div>
    );
};

export default LoadingPulsingPizza;