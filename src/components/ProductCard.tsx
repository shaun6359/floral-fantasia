import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ image, title, price }: ProductCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleOrder = () => {
    toast({
      title: "Order Placed!",
      description: `Thank you for ordering ${quantity} ${title}${quantity > 1 ? 's' : ''}!`,
    });
    setIsDialogOpen(false);
    setQuantity(1);
  };

  return (
    <>
      <div 
        className="product-card cursor-pointer transform transition-transform hover:scale-105"
        onClick={() => setIsDialogOpen(true)}
      >
        <img src={image} alt={title} className="w-full h-64 object-cover rounded-t-lg" />
        <div className="p-4 bg-white rounded-b-lg">
          <h3 className="font-playfair text-xl mb-2">{title}</h3>
          <p className="text-lg font-semibold text-pink-600">${price}</p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-pink-600">Order {title}</DialogTitle>
            <DialogDescription>
              Place your order for this beautiful arrangement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <img src={image} alt={title} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-pink-600">${price}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right col-span-1">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOrder} className="bg-pink-600 hover:bg-pink-700">
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;