import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SmartImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate the tiny blur version URL by modifying the Cloudinary path
  // Note: This assumes your URL follows Cloudinary's structure
  const blurUrl = src.replace('/upload/', '/upload/w_40,e_blur:1000,q_1/');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 1. The Low-Res Blurred Placeholder */}
      <img
        src={blurUrl}
        alt={alt}
        className="w-full h-full object-cover scale-110"
        aria-hidden="true"
      />

      {/* 2. The High-Res Main Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}