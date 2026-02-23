import { motion } from 'framer-motion';

export default function PhotoGrid({ photos, onPhotoClick }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative group cursor-none overflow-hidden break-inside-avoid"
          onClick={() => onPhotoClick(photo)}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle Golden Overlay */}
          <div className="absolute inset-0 bg-[#2F4538]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs tracking-widest uppercase border border-white/40 px-4 py-2 bg-black/20 backdrop-blur-sm">
              View Image
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}