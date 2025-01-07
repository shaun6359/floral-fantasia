import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="text-2xl font-playfair font-bold">Bloom</Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-primary-dark transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-primary-dark transition-colors">Shop</Link>
            <Link to="/gallery" className="hover:text-primary-dark transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-primary-dark transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary-dark transition-colors">Contact</Link>
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
              <Link to="/" className="hover:text-primary-dark transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-primary-dark transition-colors">Shop</Link>
              <Link to="/gallery" className="hover:text-primary-dark transition-colors">Gallery</Link>
              <Link to="/about" className="hover:text-primary-dark transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary-dark transition-colors">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;