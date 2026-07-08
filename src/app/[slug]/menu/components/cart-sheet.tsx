import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCartContext } from "../contexts/cart";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useCartContext();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {products.map((product) => (
          <h1 key={product.id}>{product.name}</h1>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
