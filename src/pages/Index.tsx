import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import FlowerModel from "../components/FlowerModel";
import ProductCard from "../components/ProductCard";
import FallingPetals from "../components/FallingPetals";

const Index = () => {
  const navigate = useNavigate();
  const products = [
    { id: 1, title: "Spring Bouquet", price: "89.99", image: "/Spring Bouqet.png" },
    { id: 2, title: "Rose Collection", price: "129.99", image: "/Rose Collection].jpg" },
    { id: 3, title: "Wildflower Mix", price: "69.99", image: "/Wildflower Mix.jpg" },
    { id: 4, title: "Luxury Peonies", price: "149.99", image: "/Luxury Peonies.jpg" },
  ];

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.add('opacity-100');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.scroll-animate').forEach((element) => {
      element.classList.add('opacity-0');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <FallingPetals />
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-primary-dark">
              Beautiful Blooms for Every Occasion
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              Discover our handcrafted bouquets and bring nature's beauty into your home.
            </p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-full transition-colors"
            >
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 h-[500px] animate-fade-in">
            <FlowerModel />
          </div>
        </div>

        {/* Decorative floating flowers */}
        <div className="absolute -left-10 top-1/4 w-20 h-20 animate-float opacity-50">
          <img src="/placeholder.svg" alt="" className="animate-spin-slow" />
        </div>
        <div className="absolute -right-10 top-3/4 w-16 h-16 animate-float opacity-50 delay-300">
          <img src="/placeholder.svg" alt="" className="animate-spin-slow" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair text-center mb-12 text-primary-dark scroll-animate">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={product.id} className={`scroll-animate delay-${index * 100}`}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
