import Navigation from "../components/Navigation";
import FlowerModel from "../components/FlowerModel";
import ProductCard from "../components/ProductCard";

const Index = () => {
  const products = [
    { id: 1, title: "Spring Bouquet", price: "89.99", image: "/placeholder.svg" },
    { id: 2, title: "Rose Collection", price: "129.99", image: "/placeholder.svg" },
    { id: 3, title: "Wildflower Mix", price: "69.99", image: "/placeholder.svg" },
    { id: 4, title: "Luxury Peonies", price: "149.99", image: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
              Beautiful Blooms for Every Occasion
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              Discover our handcrafted bouquets and bring nature's beauty into your home.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-full transition-colors">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 h-[500px] animate-fade-in">
            <FlowerModel />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair text-center mb-12">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;