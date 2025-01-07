import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-playfair font-bold">Bloom</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-primary-dark transition-colors">Home</a>
            <a href="#" className="hover:text-primary-dark transition-colors">Shop</a>
            <a href="#" className="hover:text-primary-dark transition-colors">Gallery</a>
            <a href="#" className="hover:text-primary-dark transition-colors">About</a>
            <a href="#" className="hover:text-primary-dark transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 animate-fade-in">
            <div className="flex flex-col space-y-4 px-4">
              <a href="#" className="hover:text-primary-dark transition-colors">Home</a>
              <a href="#" className="hover:text-primary-dark transition-colors">Shop</a>
              <a href="#" className="hover:text-primary-dark transition-colors">Gallery</a>
              <a href="#" className="hover:text-primary-dark transition-colors">About</a>
              <a href="#" className="hover:text-primary-dark transition-colors">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;