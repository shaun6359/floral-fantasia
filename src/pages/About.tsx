import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/10 to-white">
      <Navigation />
      <div className="container pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-playfair font-bold mb-8">Our Story</h1>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src="/placeholder.svg"
            alt="Flower shop"
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg leading-relaxed mb-6"
          >
            Welcome to Bloom, where every flower tells a story. Our journey began with a simple passion for bringing nature's beauty into people's lives. Today, we continue to craft stunning arrangements that capture the essence of every special moment.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg leading-relaxed"
          >
            With years of experience and dedication to our craft, we pride ourselves on creating unique floral experiences that leave lasting impressions.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;