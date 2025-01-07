import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      <Navigation />
      <div className="container pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <h1 className="text-4xl font-playfair font-bold text-center mb-8">Get in Touch</h1>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <Button className="w-full">Send Message</Button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;