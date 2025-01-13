import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const Shop = () => {
  const products = [
    {
      image: "/Rose Bouqet.jpg",
      title: "Rose Bouquet",
      price: "49.99"
    },
    {
      image: "/Tulip Arrangement.jpg",
      title: "Tulip Arrangement",
      price: "39.99"
    },
    {
      image: "/Sunflower Bundle.jpg",
      title: "Sunflower Bundle",
      price: "44.99"
    },
    {
      image: "/Mixed Seasonal.png",
      title: "Mixed Seasonal",
      price: "59.99"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      <Navigation />
      <div className="container pt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-playfair font-bold text-center mb-12"
        >
          Our Collection
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;