import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "/placeholder.svg",
      title: "Spring Bouquet",
      description: "A vibrant arrangement featuring fresh spring flowers in full bloom. This stunning collection includes tulips, daffodils, and cherry blossoms."
    },
    {
      src: "/placeholder.svg",
      title: "Summer Garden",
      description: "A bright and cheerful mix of summer favorites including sunflowers, daisies, and wildflowers. Perfect for bringing the warmth of summer indoors."
    },
    {
      src: "/placeholder.svg",
      title: "Romantic Rose Collection",
      description: "An elegant arrangement of premium roses in various shades of pink and red. Ideal for expressing love and appreciation."
    },
    {
      src: "/placeholder.svg",
      title: "Tropical Paradise",
      description: "An exotic blend of tropical flowers including birds of paradise, orchids, and hibiscus. Brings a touch of paradise to any space."
    },
    {
      src: "/placeholder.svg",
      title: "Winter Wonderland",
      description: "A magical arrangement featuring white roses, silver-dusted eucalyptus, and winter berries. Perfect for winter celebrations."
    },
    {
      src: "/placeholder.svg",
      title: "Rustic Charm",
      description: "A charming mix of wildflowers and rustic elements, perfect for creating a cozy, country-inspired atmosphere."
    }
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
              className="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedImage !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="font-playfair text-2xl text-pink-600">
                  {images[selectedImage].title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {images[selectedImage].description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;