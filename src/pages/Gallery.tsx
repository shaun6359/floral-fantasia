import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Navigation />
      <div className="container pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-playfair font-bold text-center mb-12"
        >
          Our Gallery
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;