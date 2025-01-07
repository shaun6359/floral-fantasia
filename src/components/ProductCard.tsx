interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ image, title, price }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4 bg-white">
        <h3 className="font-playfair text-xl mb-2">{title}</h3>
        <p className="text-lg font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;